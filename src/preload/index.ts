import { contextBridge, ipcRenderer } from "electron";
import Updater from "../core/Updater";
import DiscordPresence from "../core/DiscordPresence";
import { discordTracker } from "./ui/discordTracker";
import EmbeddedSubtitles from "../utils/EmbeddedSubtitles";
import AudioTracks from "../utils/AudioTracks";
import { STORAGE_KEYS } from "../constants";

// plugin API bridges
import { alertAPI } from './api/alert';
import { settingsAPI } from './api/settings';

// controllers
import { initializeUserSettings, reloadServer, applyUserTheme, loadEnabledPlugins } from "./setup/initialization";
import { addTitleBar, getTransparencyStatus } from "./ui/titleBar";
import { checkSettings } from "./ui/settings/settingsInjector";
import { checkExternalPlayer } from "./ui/externalPlayerInterceptor";
import { applyThemeAPI } from "./api/applyTheme";
import { gpuRendererAPI } from "./api/gpuRenderer";
import { externalPlayerAPI } from "./api/externalPlayer";
import { pluginLogger } from "./api/pluginLogger";
import Helpers from "../utils/Helpers";

export const stremioEnhancedAPI = {
    ...alertAPI,
    ...settingsAPI,
    ...pluginLogger,
    ...applyThemeAPI,
    ...gpuRendererAPI,
    ...externalPlayerAPI,
};

contextBridge.exposeInMainWorld('StremioEnhancedAPI', stremioEnhancedAPI);

// ── Stremio+ menu IPC bridge ────────────────────────────────────────────────────
// menu.js was written for Tauri's invoke(command, args) API using snake_case
// command names. We map those to the Electron IPC_CHANNELS strings and normalise
// any arg key differences (pluginName → name, upscaleShader → upscale_shader).
const TAURI_TO_ELECTRON: Record<string, string> = {
    'list_plugins':          'list-plugins',
    'set_plugin_enabled':    'set-plugin-enabled',
    'install_from_url':      'install-from-url',
    'get_settings':          'get-settings',
    'save_settings':         'save-settings',
    'check_updates':         'check-updates',
    'get_data_dir':          'get-data-dir',
    'get_plugin_source':     'get-plugin-source',
    'open_folder':           'open-folder',
    'check_stremio_service': 'check-stremio-service',
    'proxy_service':         'proxy-service',
    'get_playback_backend':  'get-playback-backend',
    'set_playback_backend':  'set-playback-backend',
    'get_mpv_prefs':         'get-mpv-prefs',
    'save_mpv_prefs':        'save-mpv-prefs',
    'launch_mpv':            'launch-mpv',
    'reload_app':            'reload-app',
};

contextBridge.exposeInMainWorld('__stElectronIPC__', async (command: string, args: Record<string, unknown> = {}) => {
    const channel = TAURI_TO_ELECTRON[command] ?? command;

    // Normalise arg key names (Tauri used different names in some places)
    const norm: Record<string, unknown> = { ...args };
    // get_settings / save_settings: Tauri used `pluginName`, handler uses `name`
    if ('pluginName' in norm) { norm.name = norm.pluginName; delete norm.pluginName; }
    // save_mpv_prefs: Tauri used camelCase, handler uses snake_case
    if ('upscaleShader' in norm) { norm.upscale_shader = norm.upscaleShader; delete norm.upscaleShader; }
    if ('extraFlags'   in norm) { norm.extra_flags    = norm.extraFlags;    delete norm.extraFlags;    }

    return ipcRenderer.invoke(channel, norm);
});


window.addEventListener("load", () => {
    Helpers.patchReactDom();
    initializeUserSettings();
    reloadServer();
    applyUserTheme();
    loadEnabledPlugins();

    let isTransparencyEnabled = false;

    if(location.href.includes("#/settings")) 
        checkSettings();

    window.addEventListener("hashchange", () => {
        if (isTransparencyEnabled) addTitleBar();
        checkSettings();
        checkExternalPlayer();
        EmbeddedSubtitles.checkWatching();
        AudioTracks.checkWatching();
    });
    
    // Auto update check
    if (localStorage.getItem(STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP) === "true") {
        Updater.checkForUpdates(false).catch(console.error);
    }

    // Discord RPC
    if (localStorage.getItem(STORAGE_KEYS.DISCORD_RPC) === "true") {
        DiscordPresence.start();
        discordTracker.init();
    }

    // UI Hooks (Transparency)
    getTransparencyStatus().then((status) => {
        isTransparencyEnabled = status;
        
        if (isTransparencyEnabled) {
            const observer = new MutationObserver(() => addTitleBar());
            observer.observe(document.body, { childList: true, subtree: true });
            addTitleBar();
        }
    }).catch(console.error);
});