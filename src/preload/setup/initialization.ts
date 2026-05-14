import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import properties from "../../core/Properties";
import Helpers from "../../utils/Helpers";
import logger from "../../utils/logger";
import { STORAGE_KEYS, FILE_EXTENSIONS, TIMEOUTS } from "../../constants";
import { modController } from "../ui/mod/modController";
import ModManager from "../../core/ModManager";
import ExtractMetaData from "../../utils/ExtractMetaData";

export function initializeUserSettings(): void {
    const defaults: Record<string, string> = {
        [STORAGE_KEYS.ENABLED_PLUGINS]: "[]",
        [STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP]: "true",
        [STORAGE_KEYS.DISCORD_RPC]: "false",
    };
    
    for (const [key, defaultValue] of Object.entries(defaults)) {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, defaultValue);
        }
    }
}

export function reloadServer(): void {
    setTimeout(() => {
        Helpers._eval(`core.transport.dispatch({ action: 'StreamingServer', args: { action: 'Reload' } });`);
        logger.info("Stremio streaming server reloaded.");
    }, TIMEOUTS.SERVER_RELOAD_DELAY);
}

export function applyUserTheme(): void {
    const currentTheme = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
    
    if (!currentTheme || currentTheme === "Default") {
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
        return;
    }
    
    const themePath = join(properties.themesPath, currentTheme);
    
    if (!existsSync(themePath)) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
        return;
    }
    
    document.getElementById("activeTheme")?.remove();
    const themeElement = document.createElement('link');
    themeElement.setAttribute("id", "activeTheme");
    themeElement.setAttribute("rel", "stylesheet");
    themeElement.setAttribute("href", pathToFileURL(themePath).toString());
    document.head.appendChild(themeElement);
}

export function loadEnabledPlugins(): void {
    if (!existsSync(properties.pluginsPath)) return;

    const allPluginFiles = readdirSync(properties.pluginsPath)
        .filter(fileName => fileName.endsWith(FILE_EXTENSIONS.PLUGIN));

    if (allPluginFiles.length === 0) return;

    // Use the file-based enabled state (written by the menu) as the source of truth.
    // null means no enabled_plugins.json exists → treat all plugins as enabled.
    const enabledState = ModManager.readEnabledPlugins();

    const toLoad: string[] = [];
    for (const fileName of allPluginFiles) {
        let shouldLoad: boolean;
        if (enabledState === null) {
            shouldLoad = true;
        } else {
            const meta = ExtractMetaData.extractMetadataFromFile(
                join(properties.pluginsPath, fileName)
            );
            shouldLoad = meta !== null && enabledState.has(meta.name);
        }
        if (shouldLoad) toLoad.push(fileName);
    }

    // Keep localStorage in sync so the settings-page toggle UI shows correct state.
    localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, JSON.stringify(toLoad));

    for (const fileName of toLoad) {
        modController.loadPlugin(fileName);
    }
}