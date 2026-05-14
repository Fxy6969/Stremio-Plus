import {
    readFileSync,
    writeFileSync,
    readdirSync,
    statSync,
    existsSync,
    mkdirSync,
    unlinkSync,
} from 'fs';
import { createHash } from 'crypto';
import { shell } from 'electron';
import { basename, join } from 'path';
import { spawn } from 'child_process';
import Properties from './Properties';
import { MetaData, PluginSetting } from '../interfaces/MetaData';
import { getLogger } from '../utils/logger';
import { FILE_EXTENSIONS, URLS } from '../constants';
import ExtractMetaData from '../utils/ExtractMetaData';
import RegistryMetaData from '../interfaces/RegistryMetaData';
import Helpers from '../utils/Helpers';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MpvPrefs {
    /** Path to a GLSL upscale shader (e.g. Anime4K, FSRCNNX). */
    upscaleShader?: string;
    /** Extra raw MPV flags appended to every launch (space-separated). */
    extraFlags?: string;
}

export interface PluginListEntry {
    name: string;
    file: string;
    version: string;
    author?: string;
    description?: string;
    enabled: boolean;
    applied: boolean; // themes only
    kind: 'Plugin' | 'Theme';
    requires: string[];
    settings: PluginSetting[];
    updateUrl?: string;
    github?: string;
    permissions: string[];
}

// ── ModManager ────────────────────────────────────────────────────────────────

class ModManager {
    private static logger = getLogger('ModManager');

    // ── File helpers ──────────────────────────────────────────────────────────

    public static getPluginContent(pluginName: string): string | null {
        const pluginPath = join(Properties.pluginsPath, pluginName);
        if (!existsSync(pluginPath)) return null;
        return readFileSync(pluginPath, 'utf-8');
    }

    public static getInstalledThemes(): string[] {
        const dirPath = Properties.themesPath;
        if (!existsSync(dirPath)) return [];
        return readdirSync(dirPath).filter(f => statSync(join(dirPath, f)).isFile());
    }

    public static getInstalledPlugins(): string[] {
        const dirPath = Properties.pluginsPath;
        if (!existsSync(dirPath)) return [];
        return readdirSync(dirPath).filter(f => statSync(join(dirPath, f)).isFile());
    }

    public static isThemeInstalled(fileName: string): boolean {
        return this.getInstalledThemes().includes(fileName);
    }

    public static isPluginInstalled(fileName: string): boolean {
        return this.getInstalledPlugins().includes(fileName);
    }

    public static openFolder(folderPath: string): void {
        shell.openPath(folderPath).then(error => {
            if (error) this.logger.error(`Failed to open folder ${folderPath}: ${error}`);
        });
    }

    // ── Registry / marketplace ────────────────────────────────────────────────

    public static async fetchMods(): Promise<{ plugins: unknown[]; themes: unknown[] }> {
        const response = await fetch(URLS.REGISTRY);
        return response.json();
    }

    public static async downloadMod(modLink: string, type: 'plugin' | 'theme'): Promise<string> {
        this.logger.info(`Downloading ${type} from: ${modLink}`);
        const response = await fetch(modLink);
        if (!response.ok) throw new Error(`Failed to download: ${response.status}`);

        const saveDir = type === 'plugin' ? Properties.pluginsPath : Properties.themesPath;
        if (!existsSync(saveDir)) mkdirSync(saveDir, { recursive: true });

        const filename = basename(new URL(modLink).pathname) || `${type}-${Date.now()}`;
        const filePath = join(saveDir, filename);

        const buffer = Buffer.from(await response.arrayBuffer());
        writeFileSync(filePath, buffer);

        this.logger.info(`Downloaded ${type} saved to: ${filePath}`);
        return filePath;
    }

    /**
     * Install a plugin or theme from a URL.
     * Mirrors Rust's install_from_url command.
     * Only HTTPS URLs are accepted. Returns the plugin name on success.
     */
    public static async installFromUrl(url: string): Promise<string> {
        if (!url) throw new Error('URL is empty');
        if (!url.startsWith('https://')) throw new Error('Only HTTPS URLs are allowed');

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const source = await response.text();

        const isTheme = url.endsWith('.css');
        const metaData = ExtractMetaData.extractMetadataFromText(source, isTheme);
        if (!metaData) throw new Error('Could not parse plugin manifest');

        const type: 'plugin' | 'theme' = isTheme ? 'theme' : 'plugin';
        const saveDir = type === 'plugin' ? Properties.pluginsPath : Properties.themesPath;
        if (!existsSync(saveDir)) mkdirSync(saveDir, { recursive: true });

        // Sanitise filename exactly like the Rust implementation
        const safe = metaData.name.replace(/[^a-zA-Z0-9\-_]/g, '-');
        const ext  = isTheme ? 'css' : 'js';
        const filePath = join(saveDir, `${safe}.${ext}`);
        writeFileSync(filePath, source, 'utf-8');

        this.logger.info(`Installed ${type} "${metaData.name}" to ${filePath}`);
        return metaData.name;
    }

    public static deleteModFile(fileName: string, type: 'plugin' | 'theme'): void {
        const targetPath = join(
            type === 'plugin' ? Properties.pluginsPath : Properties.themesPath,
            fileName,
        );
        if (existsSync(targetPath)) {
            unlinkSync(targetPath);
            this.logger.info(`Deleted ${type} file: ${fileName}`);
        }
    }

    public static saveModFile(fileName: string, type: 'plugin' | 'theme', content: string): void {
        const targetPath = join(
            type === 'plugin' ? Properties.pluginsPath : Properties.themesPath,
            fileName,
        );
        writeFileSync(targetPath, content, 'utf-8');
    }

    // ── Enabled-state persistence (ported from Rust commands.rs) ─────────────

    private static get enabledStatePath(): string {
        return join(Properties.enhancedPath, 'enabled_plugins.json');
    }

    public static readEnabledPlugins(): Set<string> | null {
        const path = this.enabledStatePath;
        if (!existsSync(path)) return null; // null = "all enabled" (default)
        try {
            const raw = readFileSync(path, 'utf-8').trim();
            if (!raw) return new Set();
            const arr: string[] = JSON.parse(raw);
            return new Set(arr);
        } catch {
            return null;
        }
    }

    public static writeEnabledPlugins(enabled: Set<string>): void {
        const sorted = [...enabled].sort();
        writeFileSync(this.enabledStatePath, JSON.stringify(sorted, null, 2), 'utf-8');
    }

    public static setPluginEnabled(name: string, enabled: boolean): void {
        const allPlugins  = [...this.getInstalledPlugins(), ...this.getInstalledThemes()];
        const allNames    = new Set(allPlugins.map(f => {
            const meta = ExtractMetaData.extractMetadataFromFile(
                join(f.endsWith('.css') ? Properties.themesPath : Properties.pluginsPath, f)
            );
            return meta?.name ?? f;
        }));

        let current = this.readEnabledPlugins() ?? new Set(allNames);
        if (enabled) {
            current.add(name);
        } else {
            current.delete(name);
        }
        // Prune names that no longer exist
        for (const n of current) {
            if (!allNames.has(n)) current.delete(n);
        }
        this.writeEnabledPlugins(current);
    }

    // ── Applied theme persistence ─────────────────────────────────────────────

    private static get appliedThemePath(): string {
        return join(Properties.enhancedPath, 'applied_theme.txt');
    }

    public static readAppliedTheme(): string | null {
        const path = this.appliedThemePath;
        if (!existsSync(path)) return null;
        const val = readFileSync(path, 'utf-8').trim();
        return val || null;
    }

    public static writeAppliedTheme(name: string | null): void {
        writeFileSync(this.appliedThemePath, name ?? '', 'utf-8');
    }

    // ── Plugin settings ───────────────────────────────────────────────────────
    // Mirrors Rust get_settings / save_settings commands.

    private static settingsPath(pluginName: string): string {
        const dir = join(Properties.enhancedPath, 'settings');
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        const safe = pluginName.replace(/[^a-zA-Z0-9\-_]/g, '-');
        return join(dir, `${safe}.json`);
    }

    public static getSettings(pluginName: string): Record<string, unknown> {
        const path = this.settingsPath(pluginName);
        if (!existsSync(path)) return {};
        try {
            return JSON.parse(readFileSync(path, 'utf-8'));
        } catch {
            return {};
        }
    }

    public static saveSettings(pluginName: string, settings: Record<string, unknown>): void {
        writeFileSync(this.settingsPath(pluginName), JSON.stringify(settings, null, 2), 'utf-8');
    }

    // ── Topological dependency sort (ported from Rust plugin_loader.rs) ───────

    /**
     * Sort installed plugins so that @require dependencies are loaded first.
     * Cycles are detected and logged, and the involved plugins are skipped
     * to avoid infinite loops (mirrors Rust cycle detection).
     */
    public static topologicalSort(
        plugins: Array<{ file: string; metaData: MetaData }>,
    ): Array<{ file: string; metaData: MetaData }> {
        const nameToIdx = new Map<string, number>();
        plugins.forEach((p, i) => nameToIdx.set(p.metaData.name, i));

        const visited  = new Set<number>();
        const visiting = new Set<number>(); // DFS stack for cycle detection
        const order:   number[] = [];

        const visit = (idx: number) => {
            if (visited.has(idx))  return;
            if (visiting.has(idx)) {
                this.logger.warn(
                    `Dependency cycle detected involving plugin "${plugins[idx].metaData.name}"`,
                );
                return;
            }
            visiting.add(idx);
            for (const req of plugins[idx].metaData.requires ?? []) {
                const depIdx = nameToIdx.get(req.name);
                if (depIdx !== undefined) visit(depIdx);
            }
            visiting.delete(idx);
            visited.add(idx);
            order.push(idx);
        };

        for (let i = 0; i < plugins.length; i++) visit(i);
        return order.map(i => plugins[i]);
    }

    // ── SHA-256 source caching (ported from Rust plugin_loader.cached_source) ─

    private static get cacheDir(): string {
        const dir = join(Properties.enhancedPath, 'cache');
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        return dir;
    }

    /**
     * Write source to a content-addressed cache and return the cached copy.
     * This is used so that repeated restarts don't re-parse unchanged files.
     */
    public static cachedSource(source: string): string {
        const hash      = createHash('sha256').update(source).digest('hex');
        const cachePath = join(this.cacheDir, hash);
        if (existsSync(cachePath)) {
            try { return readFileSync(cachePath, 'utf-8'); } catch { /* fall through */ }
        }
        try { writeFileSync(cachePath, source, 'utf-8'); } catch { /* non-fatal */ }
        return source;
    }

    // ── Full plugin list with enabled/applied state ───────────────────────────
    // Mirrors Rust list_plugins command.

    public static listPlugins(): PluginListEntry[] {
        const enabledState  = this.readEnabledPlugins();
        const appliedTheme  = this.readAppliedTheme();

        const pluginFiles = this.getInstalledPlugins();
        const themeFiles  = this.getInstalledThemes();

        const rawPlugins = pluginFiles.map(f => ({
            file: f,
            metaData: ExtractMetaData.extractMetadataFromFile(join(Properties.pluginsPath, f)),
            kind: 'Plugin' as const,
        })).filter(p => p.metaData !== null) as Array<{
            file: string; metaData: MetaData; kind: 'Plugin';
        }>;

        const rawThemes = themeFiles.map(f => ({
            file: f,
            metaData: ExtractMetaData.extractMetadataFromFile(join(Properties.themesPath, f)),
            kind: 'Theme' as const,
        })).filter(p => p.metaData !== null) as Array<{
            file: string; metaData: MetaData; kind: 'Theme';
        }>;

        // Apply topological sort to plugins only (themes don't have @require)
        const sortedPlugins = this.topologicalSort(
            rawPlugins.map(p => ({ file: p.file, metaData: p.metaData })),
        ).map(p => ({ ...p, kind: 'Plugin' as const }));

        return [...sortedPlugins, ...rawThemes].map(({ file, metaData, kind }) => ({
            name:        metaData.name,
            file,
            version:     metaData.version,
            author:      metaData.author,
            description: metaData.description,
            enabled:     enabledState === null || enabledState.has(metaData.name),
            applied:     kind === 'Theme' && appliedTheme === metaData.name,
            kind,
            requires:    (metaData.requires ?? []).map(r => r.name),
            settings:    metaData.settings ?? [],
            updateUrl:   metaData.updateUrl,
            github:      metaData.github,
            permissions: metaData.permissions ?? [],
        }));
    }

    // ── Update checking ───────────────────────────────────────────────────────

    public static async checkUpdateData(itemFile: string): Promise<{
        hasUpdate: boolean;
        newContent?: string;
        newMetaData?: MetaData;
        installedMetaData?: MetaData;
        registryVersion?: string | null;
        updateUrl?: string;
    } | null> {
        const type = itemFile.endsWith(FILE_EXTENSIONS.THEME) ? 'theme' : 'plugin';
        const itemPath = join(
            type === 'theme' ? Properties.themesPath : Properties.pluginsPath,
            itemFile,
        );

        const installedMetaData = ExtractMetaData.extractMetadataFromFile(itemPath) as MetaData | null;
        if (!installedMetaData?.updateUrl || installedMetaData.updateUrl === 'none') return null;

        // Validate URL is HTTPS before fetching (mirrors Rust check_updates)
        if (!installedMetaData.updateUrl.startsWith('https://')) return null;

        try {
            const request = await fetch(installedMetaData.updateUrl);
            if (request.status !== 200) return null;

            const responseText  = await request.text();
            const extractedMetaData = ExtractMetaData.extractMetadataFromText(
                responseText, type === 'theme',
            ) as MetaData | null;

            if (!extractedMetaData) {
                this.logger.warn(
                    `Failed to check updates for ${type} ${installedMetaData.name}: invalid metadata`,
                );
                return null;
            }

            if (Helpers.isNewerVersion(extractedMetaData.version, installedMetaData.version)) {
                this.logger.info(
                    `Update found for ${installedMetaData.name} (v${installedMetaData.version} → v${extractedMetaData.version})`,
                );

                let registryVersion: string | null = null;
                if (type === 'plugin') {
                    registryVersion = await this.getRegistryPluginVersion(itemFile);
                }

                return {
                    hasUpdate: true,
                    newContent: responseText,
                    newMetaData: extractedMetaData,
                    installedMetaData,
                    registryVersion,
                    updateUrl: installedMetaData.updateUrl,
                };
            }
            return { hasUpdate: false, installedMetaData };
        } catch (error) {
            this.logger.error(`Error checking updates for ${itemFile}: ${(error as Error).message}`);
            return null;
        }
    }

    /**
     * Return the names of all installed plugins/themes that have a newer
     * version available. Mirrors Rust check_updates command.
     */
    public static async checkAllUpdates(): Promise<string[]> {
        const allFiles = [
            ...this.getInstalledPlugins().map(f => ({ file: f, type: 'plugin' as const })),
            ...this.getInstalledThemes().map(f => ({ file: f, type: 'theme' as const })),
        ];
        const updated: string[] = [];
        for (const { file } of allFiles) {
            const result = await this.checkUpdateData(file);
            if (result?.hasUpdate && result.installedMetaData?.name) {
                updated.push(result.installedMetaData.name);
            }
        }
        return updated;
    }

    private static async getRegistryPluginVersion(itemFile: string): Promise<string | null> {
        const registryData   = await this.fetchMods();
        const registryPlugins = (registryData.plugins as RegistryMetaData[]) ?? [];
        const found = registryPlugins.find(p => p.download?.endsWith(itemFile));
        return found ? found.version ?? null : null;
    }

    // ── Stremio Service health check (mirrors Rust check_stremio_service) ─────

    public static async checkStremioService(): Promise<boolean> {
        try {
            const resp = await fetch('http://localhost:11470/', { signal: AbortSignal.timeout(2000) });
            return resp.status < 600;
        } catch {
            return false;
        }
    }

    // ── Streaming server proxy (mirrors Rust proxy_service command) ───────────
    /**
     * Forward a request to the local Stremio streaming server.
     * Only ports 11470 and 11471 are permitted. Path traversal is blocked.
     */
    public static async proxyService(
        method: string,
        path: string,
        body?: string,
        port: 11470 | 11471 = 11470,
    ): Promise<string> {
        if (![11470, 11471].includes(port)) throw new Error(`Port ${port} not allowed`);
        const safePath = path.startsWith('/') ? path : `/${path}`;
        if (safePath.includes('..')) throw new Error('Path traversal not allowed');

        const url = `http://127.0.0.1:${port}${safePath}`;
        const init: RequestInit = {
            method: method.toUpperCase(),
            signal: AbortSignal.timeout(10_000),
        };
        if (body && ['POST', 'PUT'].includes(method.toUpperCase())) {
            init.body = body;
            init.headers = { 'Content-Type': 'application/json' };
        }

        const resp = await fetch(url, init);
        const text = await resp.text();
        if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${text}`);
        return text;
    }

    // ── MPV playback backend (ported from Rust player_backend.rs) ────────────

    private static get backendPrefPath(): string {
        return join(Properties.enhancedPath, 'playback_backend.txt');
    }

    private static get mpvPrefsPath(): string {
        return join(Properties.enhancedPath, 'mpv_prefs.json');
    }

    public static readBackend(): 'service' | 'mpv' | 'server' | 'native' {
        try {
            if (existsSync(this.backendPrefPath)) {
                const val = readFileSync(this.backendPrefPath, 'utf-8').trim();
                if (['service', 'mpv', 'server', 'native'].includes(val)) {
                    return val as 'service' | 'mpv' | 'server' | 'native';
                }
            }
        } catch { /* fall through */ }
        return 'service';
    }

    public static writeBackend(backend: 'service' | 'mpv' | 'server' | 'native'): void {
        writeFileSync(this.backendPrefPath, backend, 'utf-8');
    }

    public static readMpvPrefs(): MpvPrefs {
        try {
            if (existsSync(this.mpvPrefsPath)) {
                return JSON.parse(readFileSync(this.mpvPrefsPath, 'utf-8'));
            }
        } catch { /* fall through */ }
        return {};
    }

    public static writeMpvPrefs(prefs: MpvPrefs): void {
        writeFileSync(this.mpvPrefsPath, JSON.stringify(prefs, null, 2), 'utf-8');
    }

    /**
     * Build the MPV argument list from saved prefs.
     * Mirrors Rust build_mpv_args.
     */
    public static buildMpvArgs(streamUrl: string): string[] {
        const prefs = this.readMpvPrefs();
        const args = [
            '--force-window=yes',
            '--keep-open=yes',
            '--ontop=yes',
            '--osc=yes',
            '--osd-bar=yes',
            '--script-opts=thumbfast-network=yes,thumbfast-spawn_first=yes',
            '--hwdec=auto-safe',
            '--audio-channels=auto',
        ];

        if (prefs.upscaleShader) {
            args.push(`--glsl-shaders=${prefs.upscaleShader}`);
            args.push('--scale=ewa_lanczos');
        }

        if (prefs.extraFlags) {
            for (const flag of prefs.extraFlags.split(/\s+/)) {
                if (flag) args.push(flag);
            }
        }

        args.push('--');
        args.push(streamUrl);
        return args;
    }

    /**
     * Launch MPV with the given stream URL.
     * Tries common install locations (mirrors Rust launch_mpv).
     */
    public static launchMpv(streamUrl: string): void {
        if (!streamUrl) throw new Error('Stream URL is empty');
        if (!streamUrl.startsWith('http://') && !streamUrl.startsWith('https://')) {
            throw new Error('Only HTTP(S) stream URLs are accepted');
        }

        const args = this.buildMpvArgs(streamUrl);
        const candidates = [
            'mpv',
            '/usr/local/bin/mpv',
            '/opt/homebrew/bin/mpv',
            '/Applications/mpv.app/Contents/MacOS/mpv',
            'C:\\Program Files\\mpv\\mpv.exe',
        ];

        let launched = false;
        for (const candidate of candidates) {
            try {
                spawn(candidate, args, { detached: true, stdio: 'ignore' }).unref();
                launched = true;
                this.logger.info(`Launched MPV: ${candidate}`);
                break;
            } catch (e: any) {
                if (e.code !== 'ENOENT') {
                    this.logger.error(`Failed to launch ${candidate}: ${e.message}`);
                    break;
                }
            }
        }

        if (!launched) throw new Error('mpv not found. Install mpv and ensure it is in your PATH.');
    }
}

export default ModManager;