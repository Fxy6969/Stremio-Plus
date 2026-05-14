import { join } from 'path';
import { mkdirSync, existsSync, writeFileSync, readFileSync } from 'fs';
import Updater from './core/Updater';
import Properties from './core/Properties';
import ModManager from './core/ModManager';
import logger from './utils/logger';
import { IPC_CHANNELS, URLS, SERVER_JS_URL } from './constants';

// Fix GTK 2/3 and GTK 4 conflict on Linux
import { app, ipcMain } from 'electron';
if (process.platform === 'linux') app.commandLine.appendSwitch('gtk-version', '3');

// Menu JS inlined from src/menu.js — patched to use Electron IPC instead of Tauri invoke
const MENU_JS = readFileSync(join(__dirname, 'ui/panel.js'), 'utf-8');

import { BrowserWindow, shell } from 'electron';
import StreamingServer from './utils/StreamingServer';
import Helpers from './utils/Helpers';
import StremioService from './utils/StremioService';
import { setupPluginSettingsAPI } from './controllers/api/SettingsApiController';
import { setupPluginAlertAPI } from './controllers/api/AlertApiController';
import { setupWindowControls } from './controllers/windowController';
import { setupUpdater } from './controllers/updaterController';
import { setupWindowTransparency } from './controllers/transparencyController';
import { gpuController } from './controllers/gpuController';
import { externalPlayerController } from './controllers/externalPlayerController';


export function setupMenuInjection(mainWindow: BrowserWindow) {
    // Inject on every navigation / reload — mirrors Tauri's on_page_load
    mainWindow.webContents.on('did-finish-load', async () => {
      try {
        // Expose app metadata so menu.js About tab shows correct version
        const meta = { version: '26.0.0', author: 'Fxy6969', github_url: 'https://github.com/Fxy6969/Stremio-Plus' };
        await mainWindow.webContents.executeJavaScript(
          `window.__ST_META__ = ${JSON.stringify(meta)};`
        );
        await mainWindow.webContents.executeJavaScript(MENU_JS);
      } catch (e) {
        console.error('[Stremio+] menu injection failed:', e);
      }
    });
  }

app.setName('stremio-plus');
const userDataPath = app.getPath('userData');

export let mainWindow: BrowserWindow | null;
const gotLock = app.requestSingleInstanceLock();
const transparencyFlagPath      = join(app.getPath('userData'), 'transparency');
const useStremioServiceFlagPath = join(app.getPath('userData'), 'use_stremio_service_for_streaming');
const useServerJSFlagPath       = join(app.getPath('userData'), 'use_server_js_for_streaming');
const transparencyEnabled       = existsSync(transparencyFlagPath);

app.commandLine.appendSwitch('disable-features', 'BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights');
app.commandLine.appendSwitch('ignore-connections-limit', 'localhost,127.0.0.1');
app.commandLine.appendSwitch('proxy-bypass-list', '127.0.0.1,localhost,::1');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('enable-quic');
app.commandLine.appendSwitch('enable-async-dns');

gpuController.setup(userDataPath);

if (!gotLock) {
    app.quit();
} else {
    app.on('second-instance', (_, argv) => {
        const url = argv.find(arg => arg.startsWith('stremio://'));
        if (url) handleStremioURL(url);
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

// ── IPC handlers (ported from Rust commands.rs) ───────────────────────────────

function setupModManagerIPC() {
    // Plugin/theme list with enabled + applied state
    ipcMain.handle(IPC_CHANNELS.LIST_PLUGINS, async () => {
        return ModManager.listPlugins(); // should return same shape as Tauri list_plugins
      });
     
      ipcMain.handle(IPC_CHANNELS.SET_PLUGIN_ENABLED, async (_e, { name, enabled }) => {
        ModManager.setPluginEnabled(name, enabled);
      });
     
      ipcMain.handle(IPC_CHANNELS.INSTALL_FROM_URL, async (_e, { url }) => {
        return ModManager.installFromUrl(url); // returns plugin name string
      });
     
      ipcMain.handle(IPC_CHANNELS.GET_SETTINGS, async (_e, { name }) => {
        return ModManager.getSettings(name);
      });
     
      ipcMain.handle(IPC_CHANNELS.SAVE_SETTINGS, async (_e, { name, settings }) => {
        ModManager.saveSettings(name, settings);
      });
     
      ipcMain.handle(IPC_CHANNELS.CHECK_UPDATES, async () => {
        return ModManager.checkAllUpdates(); // returns string[]
      });
     
      ipcMain.handle(IPC_CHANNELS.GET_DATA_DIR, async () => {
        return Properties.enhancedPath;
      });
     
      ipcMain.handle(IPC_CHANNELS.GET_PLUGIN_SOURCE, async (_e, { name, kind, file }) => {
        const dir = kind === 'Theme' ? Properties.themesPath : Properties.pluginsPath;
        const { existsSync, readFileSync, readdirSync } = await import('fs');
        // Use the actual on-disk filename when provided (avoids name→filename mismatch)
        if (file) {
          const direct = join(dir, file);
          if (existsSync(direct)) return readFileSync(direct, 'utf-8');
        }
        // Fallback: scan directory for a file whose metadata name matches
        const ext  = kind === 'Theme' ? 'css' : 'js';
        const safe = name.replace(/[^a-zA-Z0-9\-_]/g, '-');
        const guessed = join(dir, `${safe}.${ext}`);
        if (existsSync(guessed)) return readFileSync(guessed, 'utf-8');
        // Last resort: find by scanning (handles url-based filenames like liquid-glass.theme.css)
        try {
          for (const f of readdirSync(dir)) {
            if (!f.endsWith(`.${ext}`)) continue;
            const content = readFileSync(join(dir, f), 'utf-8');
            const nameMatch = content.match(/^(?:\/\/|\/\*)\s*@name\s+(.+)/m);
            if (nameMatch && nameMatch[1].trim() === name) return content;
          }
        } catch (_) {}
        throw new Error(`File not found: ${join(dir, `${safe}.${ext}`)}`);
      });
     
      ipcMain.handle(IPC_CHANNELS.OPEN_FOLDER, async (_e, { kind }) => {
        const folder = kind === 'plugins' ? Properties.pluginsPath : Properties.themesPath;
        ModManager.openFolder(folder);
      });
     
      // ── Streaming service ──────────────────────────────────────────────────────
     
      ipcMain.handle(IPC_CHANNELS.CHECK_STREMIO_SERVICE, async () => {
        return ModManager.checkStremioService();
      });
     
      ipcMain.handle(IPC_CHANNELS.PROXY_SERVICE, async (_e, { method, path, body, port }) => {
        return ModManager.proxyService(method, path, body, port);
      });
     
      // ── Playback backend ───────────────────────────────────────────────────────
     
      ipcMain.handle(IPC_CHANNELS.GET_PLAYBACK_BACKEND, async () => {
        return ModManager.readBackend();
      });
     
      ipcMain.handle(IPC_CHANNELS.SET_PLAYBACK_BACKEND, async (_e, { backend }) => {
        if (!['service', 'mpv', 'server', 'native'].includes(backend))
          throw new Error(`Unknown backend: ${backend}`);
        ModManager.writeBackend(backend);
      });
     
      ipcMain.handle(IPC_CHANNELS.GET_MPV_PREFS, async () => {
        return ModManager.readMpvPrefs();
      });
     
      ipcMain.handle(IPC_CHANNELS.SAVE_MPV_PREFS, async (_e, { upscale_shader, extra_flags }) => {
        ModManager.writeMpvPrefs({ upscaleShader: upscale_shader, extraFlags: extra_flags });
      });
     
      ipcMain.handle(IPC_CHANNELS.LAUNCH_MPV, async (_e, { url }) => {
        ModManager.launchMpv(url);
      });
     
      // ── App ────────────────────────────────────────────────────────────────────
     
      ipcMain.handle(IPC_CHANNELS.RELOAD_APP, async () => {
        mainWindow?.webContents.reload();
      });
}

// ── Window creation ───────────────────────────────────────────────────────────

async function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: join(__dirname, '//preload/index.js'),
            // Security Note: These settings are required for the plugin/theme system
            // to work properly. The app loads web.stremio.com and needs to:
            // 1. Make cross-origin requests to local streaming server (webSecurity: false)
            // 2. Access Node.js APIs for file operations (nodeIntegration: true)
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: true,
            allowRunningInsecureContent: false,
            experimentalFeatures: false,
            spellcheck: false,
            backgroundThrottling: false,
            // Inject URL-rewrite + IPC-ready script before any page script runs
            additionalArguments: [],
        },
        width: 1500,
        height: 850,
        resizable: true,
        maximizable: true,
        fullscreenable: true,
        useContentSize: true,
        icon: process.platform === 'win32'
            ? join(__dirname, '../images/icon.ico')
            : join(__dirname, '../images/icon.png'),
        title: 'Stremio Plus',
        frame: transparencyEnabled ? false : true,
        transparent: transparencyEnabled,
        hasShadow: false,
        visualEffectState: transparencyEnabled ? 'active' : 'followWindow',
        backgroundColor: '#00000000',
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL(URLS.STREMIO_WEB);
    mainWindow.on('page-title-updated', (e) => e.preventDefault());

    if (transparencyEnabled) {
        mainWindow.on('enter-full-screen', () => {
            mainWindow?.webContents.send(IPC_CHANNELS.FULLSCREEN_CHANGED, true);
        });
        mainWindow.on('leave-full-screen', () => {
            mainWindow?.webContents.send(IPC_CHANNELS.FULLSCREEN_CHANGED, false);
        });
    }

    mainWindow.webContents.setWindowOpenHandler((edata: any) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

    if (process.argv.includes('--devtools')) {
        logger.info('Developer tools flag detected. Opening DevTools in detached mode...');
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
}

// ── Streaming server helpers ──────────────────────────────────────────────────

async function useStremioService() {
    if (await StremioService.isServiceInstalled()) {
        logger.info('Found installation of Stremio Service.');
        await StremioService.start();
    } else {
        const result = await Helpers.showAlert(
            'warning',
            'Stremio Service not found',
            `Stremio Service is required for streaming features. Do you want to download it now? ${process.platform === 'linux' ? 'This will install the service via Flatpak (if available).' : ''}`,
            ['YES', 'NO'],
        );
        if (result === 0) {
            await StremioService.downloadAndInstallService();
        } else {
            logger.info('User declined to download Stremio Service.');
        }
    }
}

// ── App lifecycle ─────────────────────────────────────────────────────────────

app.on('ready', async () => {
    if (process.platform === 'darwin' && app.dock) {
        app.dock.setIcon(join(__dirname, '../images/icon.png'));
    }
    logger.info('Enhanced version: v' + Updater.getCurrentVersion());
    logger.info('Running on NodeJS version: ' + process.version);
    logger.info('Running on Electron version: v' + process.versions.electron);
    logger.info('Running on Chromium version: v' + process.versions.chrome);
    logger.info('User data path: ' + app.getPath('userData'));
    logger.info('Themes path: '    + Properties.themesPath);
    logger.info('Plugins path: '   + Properties.pluginsPath);

    try {
        for (const dir of [Properties.enhancedPath, Properties.themesPath, Properties.pluginsPath]) {
            if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        }
    } catch (err) {
        logger.error('Failed to create necessary directories: ' + err);
    }

    if (!process.argv.includes('--no-stremio-server')) {
        if (!await StremioService.isProcessRunning()) {
            const platform = process.platform;
            if (platform === 'win32') {
                if (existsSync(useStremioServiceFlagPath)) {
                    await useStremioService();
                } else if (existsSync(useServerJSFlagPath)) {
                    await useServerJS();
                } else {
                    await chooseStreamingServer();
                }
            } else if (platform === 'darwin' || platform === 'linux') {
                useServerJS();
            }
        } else {
            logger.info('Stremio Service is already running.');
        }
    } else {
        logger.info('Launching without Stremio streaming server.');
    }

    // Wire all IPC handlers before creating the window
    setupModManagerIPC();
    setupPluginSettingsAPI();
    setupPluginAlertAPI();
    createWindow();
    if (mainWindow) setupMenuInjection(mainWindow);
    if (transparencyEnabled) setupWindowControls();
    setupUpdater();
    setupWindowTransparency(transparencyFlagPath);
    gpuController.initIPC(userDataPath);
    externalPlayerController.initIPC();

    app.on('open-url', (event, url) => {
        event.preventDefault();
        handleStremioURL(url);
    });

    if (!app.isDefaultProtocolClient('stremio')) {
        app.setAsDefaultProtocolClient('stremio');
    }

    const launchUrl = process.argv.find(arg => arg.startsWith('stremio://'));
    if (launchUrl) handleStremioURL(launchUrl);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

async function chooseStreamingServer() {
    const result = await Helpers.showAlert(
        'info',
        'Stremio Streaming Server',
        'Stremio Enhanced requires a Stremio Streaming Server for playback to function properly. You can either use the Stremio Service or set up a local streaming server manually.\n' +
        'This is a one-time setup. The option you choose will be saved for future app launches.\n\n' +
        "Would you like to use the Stremio Service for streaming?\n\n" +
        "Click 'No' to attempt using server.js directly",
        ['Yes, use Stremio Service (recommended on Windows)', 'No, use server.js directly (manual setup required)'],
    );

    if (result === 0) {
        logger.info("User chose Stremio Service.");
        await useStremioService();
        writeFileSync(useStremioServiceFlagPath, '1');
    } else if (result === 1) {
        logger.info("User chose server.js.");
        useServerJS();
        writeFileSync(useServerJSFlagPath, '1');
    } else {
        logger.info("User closed streaming server dialog. Closing app...");
        app.quit();
    }
}

async function useServerJS() {
    logger.info('Checking for streaming server files...');
    const filesStatus = await StreamingServer.ensureStreamingServerFiles();

    if (filesStatus === 'ready') {
        logger.info('Running server.js directly...');
        StreamingServer.start();
    } else if (filesStatus === 'missing_server_js') {
        logger.info('server.js not found. Showing download instructions...');
        const serverDir  = StreamingServer.getStreamingServerDir();
        const downloadUrl = SERVER_JS_URL;

        let serverJsFound = false;
        while (!serverJsFound) {
            const result = await Helpers.showAlert(
                'info',
                'Streaming Server Setup Required',
                `To enable video playback, you need to download the Stremio streaming server file (server.js).\n\n` +
                `1. Download server.js from:\n${downloadUrl}\n\n` +
                `2. Right click the page and select "Save As" and save it as "server.js".\n\n` +
                `3. Place it in:\n${serverDir}\n\n` +
                `Click "Open Folder" to open the destination folder, or "Download" to open the download link in your browser.`,
                ['Open Folder', 'Download', 'Close'],
            );

            if (result === 0) {
                StreamingServer.openStreamingServerDir();
            } else if (result === 1) {
                shell.openExternal(downloadUrl);
            } else {
                if (StreamingServer.serverJsExists()) {
                    serverJsFound = true;
                    const retryStatus = await StreamingServer.ensureStreamingServerFiles();
                    if (retryStatus === 'ready') {
                        await Helpers.showAlert('info', 'Streaming Server Setup Complete',
                            'The streaming server has been set up successfully and will now start.', ['OK']);
                        StreamingServer.start();
                    } else {
                        await Helpers.showAlert('error', 'Failed to download FFmpeg',
                            'FFmpeg is required for the streaming server. Falling back to Stremio Service.', ['OK']);
                        await useStremioService();
                    }
                } else {
                    await Helpers.showAlert('warning', 'File Not Found',
                        `server.js was not found in:\n${serverDir}\n\nPlease download and place it in the correct location.`, ['OK']);
                }
            }
        }
    } else {
        logger.info('FFmpeg not available. Falling back to Stremio Service...');
        await useStremioService();
    }
}

app.on('window-all-closed', () => {
    logger.info('Closing app...');
    if (process.platform !== 'darwin') app.quit();
});

app.on('browser-window-created', (_, window) => {
    window.webContents.on('before-input-event', (event: any, input: any) => {
        switch (true) {
            case input.control && input.shift && input.key === 'I':
                window.webContents.toggleDevTools();
                event.preventDefault();
                break;
            case input.key === 'F11':
                window.setFullScreen(!window.isFullScreen());
                event.preventDefault();
                break;
            case input.control && input.key === '=':
                if (mainWindow) mainWindow.webContents.zoomFactor += 0.1;
                event.preventDefault();
                break;
            case input.control && input.key === '-':
                if (mainWindow) mainWindow.webContents.zoomFactor -= 0.1;
                event.preventDefault();
                break;
            case input.control && input.key === 'r':
                mainWindow?.reload();
                event.preventDefault();
                break;

                case input.shift && input.key === ' ':
                    mainWindow?.webContents.executeJavaScript(
                        'if(window.__st_toggle) window.__st_toggle();'
                    ).catch(() => {});
                    event.preventDefault();
                break;
        }
    });
});

function handleStremioURL(url: string) {
    try {
        console.log('Received stremio:// URL:', url);
        if (mainWindow && url.endsWith('/manifest.json')) {
            mainWindow.loadURL(URLS.STREMIO_WEB_ADD_ADDON + encodeURIComponent(url));
        }
    } catch (err) {
        console.error('Invalid stremio:// URL', err);
    }
}