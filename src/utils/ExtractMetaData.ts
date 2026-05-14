import { readFileSync, existsSync } from 'fs';
import {
    MetaData,
    PluginSetting,
    RequiredPlugin,
    SettingKind,
} from '../interfaces/MetaData';

/**
 * ExtractMetaData
 *
 * Parses userscript-style block comments from plugin (.js) and theme (.css)
 * source files. Ported and extended from the Rust plugin_manifest parser to
 * add support for: @permission, @github, @require (with >=), @setting
 * (toggle / color / range / text / select), and @min_app_version.
 *
 * Plugin block format:
 *   // ==Plugin==
 *   // @name        My Plugin
 *   // @version     1.0.0
 *   // @author      Someone
 *   // @description Does stuff
 *   // @updateUrl   https://...
 *   // @require     OtherPlugin >= 2.0.0
 *   // @permission  network
 *   // @github      owner/repo
 *   // @setting     myKey | toggle | Enable feature | true | Optional hint
 *   // @setting     myRange | range | Opacity | 0.8 | | 0 | 1 | 0.05
 *   // @setting     mySelect | select | Theme | dark | light,dark,system
 *   // ==/Plugin==
 *
 * Theme block format uses block comments:
 *   /* ==Theme==
 *    * @name    My Theme
 *    * ...
 *    * ==/Theme== *\/
 */
class ExtractMetaData {
    // ── Public API ────────────────────────────────────────────────────────────

    public static extractMetadataFromFile(filePath: string): MetaData | null {
        if (!existsSync(filePath)) return null;
        try {
            const source = readFileSync(filePath, 'utf-8');
            const isTheme = filePath.endsWith('.css');
            return this.extractMetadataFromText(source, isTheme);
        } catch {
            return null;
        }
    }

    public static extractMetadataFromText(
        source: string,
        isTheme = false,
    ): MetaData | null {
        const [open, close] = isTheme
            ? ['/* ==Theme==', '==/Theme== */']
            : ['// ==Plugin==', '// ==/Plugin=='];

        let header: string | null = null;

        // Try UserScript-style header first (// ==Plugin== ... ==/Plugin==)
        const start = source.indexOf(open);
        const end   = source.indexOf(close);
        if (start !== -1 && end !== -1 && end > start) {
            header = source.slice(start + open.length, end);
        } else {
            // Fallback: JSDoc-style block comment (/** @name ... */ or /* @name ... */)
            const bStart = source.indexOf('/*');
            const bEnd   = source.indexOf('*/', bStart + 2);
            if (bStart !== -1 && bEnd !== -1) {
                const candidate = source.slice(bStart + 2, bEnd);
                if (candidate.includes('@name')) header = candidate;
            }
        }

        if (header === null) return null;

        const fields = this.parseFields(header);

        const get  = (k: string): string | undefined => fields[k]?.[0];
        const getAll = (k: string): string[]          => fields[k] ?? [];

        const requires: RequiredPlugin[] = getAll('require').map(v => {
            const idx = v.indexOf('>=');
            if (idx !== -1) {
                return {
                    name: v.slice(0, idx).trim(),
                    minVersion: v.slice(idx + 2).trim(),
                };
            }
            return { name: v.trim() };
        });

        const settings: PluginSetting[] = getAll('setting')
            .map(v => this.parseSetting(v))
            .filter((s): s is PluginSetting => s !== null);

        const permissions: string[] = getAll('permission').map(p => p.toLowerCase());

        return {
            name:           get('name')        ?? 'Unnamed',
            version:        get('version')     ?? '0.0.0',
            description:    get('description') ?? '',
            author:         get('author')      ?? '',
            updateUrl:      get('updateUrl') ?? get('update_url'),
            preview:        get('preview'),
            download:       get('download'),
            repo:           get('repo'),
            github:         get('github'),
            minAppVersion:  get('minAppVersion') ?? get('min_app_version'),
            permissions,
            requires,
            settings,
        };
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /** Parse the raw header block into a map of key → [values] */
    private static parseFields(header: string): Record<string, string[]> {
        const fields: Record<string, string[]> = {};
        for (const rawLine of header.split('\n')) {
            const line = rawLine
                .trim()
                .replace(/^\/\//, '')
                .replace(/^\*/, '')
                .trim();
            if (!line.startsWith('@')) continue;
            const rest = line.slice(1);
            const spaceIdx = rest.search(/\s/);
            if (spaceIdx === -1) continue;
            const key = rest.slice(0, spaceIdx).trim();
            const val = rest.slice(spaceIdx).trim();
            if (!fields[key]) fields[key] = [];
            fields[key].push(val);
        }
        return fields;
    }

    /**
     * Parse a @setting directive.
     *
     * Format: key | kind | label | default [| hint] [| min | max [| step]]
     *                                       [| opt1,opt2,...] (for select)
     */
    private static parseSetting(raw: string): PluginSetting | null {
        const parts = raw.split('|').map(s => s.trim());
        if (parts.length < 4) return null;

        const [key, kindRaw, label, defaultVal] = parts;

        const VALID_KINDS: SettingKind[] = ['toggle', 'color', 'range', 'text', 'select'];
        if (!VALID_KINDS.includes(kindRaw as SettingKind)) return null;
        const kind = kindRaw as SettingKind;

        let hint: string | undefined;
        let min: number | undefined;
        let max: number | undefined;
        let step: number | undefined;
        let options: string[] = [];

        if (kind === 'range' && parts.length >= 7) {
            // key | range | label | default | hint_or_empty | min | max [| step]
            hint = parts[4] || undefined;
            min  = parseFloat(parts[5]);
            max  = parseFloat(parts[6]);
            if (parts[7] !== undefined) step = parseFloat(parts[7]);
        } else if (kind === 'select' && parts.length >= 5) {
            // key | select | label | default | opt1,opt2,...
            options = parts[4].split(',').map(s => s.trim());
        } else if (parts.length >= 5 && kind !== 'range' && kind !== 'select') {
            hint = parts[4] || undefined;
        }

        return {
            key,
            kind,
            label,
            default: defaultVal,
            hint,
            min: isNaN(min as number) ? undefined : min,
            max: isNaN(max as number) ? undefined : max,
            step: isNaN(step as number) ? undefined : step,
            options,
        };
    }
}

export default ExtractMetaData;