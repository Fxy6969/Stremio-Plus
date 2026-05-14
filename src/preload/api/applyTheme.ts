import { ipcRenderer } from "electron";
import Properties from "../../core/Properties";
import { getLogger } from "../../utils/logger";
import { STORAGE_KEYS, IPC_CHANNELS } from "../../constants";
import { alertAPI } from "./alert";
import ExtractMetaData from "../../utils/ExtractMetaData";
import { join } from "path";
import { pathToFileURL } from "url";

const logger = getLogger("applyThemeAPI");

export const applyThemeAPI = {
    applyTheme: async (theme: string) => {
        logger.info("Attempting to apply " + theme);

        if (theme !== "Default") {
            const themePath = join(Properties.themesPath, theme);
            const themeMetaData = ExtractMetaData.extractMetadataFromFile(themePath);

            if (themeMetaData && themeMetaData.requires && themeMetaData.requires.length > 0) {
                // enabledPlugins stores filenames; resolve each to its metadata name for comparison
                const enabledPluginFiles: string[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]");
                const enabledPluginNames = enabledPluginFiles.map(f => {
                    const m = ExtractMetaData.extractMetadataFromFile(join(Properties.pluginsPath, f));
                    return m?.name ?? f;
                });
                const missingPlugins = themeMetaData.requires.filter(req => !enabledPluginNames.includes(req.name));

                if (missingPlugins.length > 0) {
                    const formattedList = missingPlugins.map(p => `• ${p.name}`).join("\n");

                    await alertAPI.showAlert(
                        "warning",
                        "Missing Required Plugins",
                        `The theme "${themeMetaData.name || theme}" requires the following plugins to be installed and enabled first:\n\n${formattedList}`,
                        ["OK"]
                    );

                    logger.warn(`Aborted applying ${theme}. Missing: ${missingPlugins.map(r => r.name).join(", ")}`);
                    return;
                }
            }
        }
        
        const activeThemeElement = document.getElementById("activeTheme");
        if (activeThemeElement) {
            activeThemeElement.remove();
        }

        if (theme !== "Default") {      
            const themeElement = document.createElement("link");
            themeElement.id = "activeTheme";
            themeElement.rel = "stylesheet";
            themeElement.href = pathToFileURL(join(Properties.themesPath, theme)).toString();

            document.head.appendChild(themeElement);
        }

        const currentTheme = localStorage.getItem("currentTheme");
        if (currentTheme) {
            logger.info("Disabling " + currentTheme + " as an active theme");

            const currentThemeElement = document.getElementById(currentTheme);
            if (currentThemeElement) {
                currentThemeElement.classList.remove("disabled");

                if (currentTheme !== "Default") {
                    currentThemeElement.classList.remove("uninstall-button-container-oV4Yo");
                    currentThemeElement.classList.add("install-button-container-yfcq5");   
                } else {
                    currentThemeElement.style.backgroundColor = "var(--secondary-accent-color)";
                }

                currentThemeElement.innerText = "Apply";
            }
        }

        localStorage.setItem("currentTheme", theme);

        // Sync to enabled_plugins.json: disable old theme, enable new one
        try {
            const prevTheme = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
            if (prevTheme && prevTheme !== 'Default' && prevTheme !== theme) {
                const prevMeta = ExtractMetaData.extractMetadataFromFile(join(Properties.themesPath, prevTheme));
                if (prevMeta) ipcRenderer.invoke(IPC_CHANNELS.SET_PLUGIN_ENABLED, { name: prevMeta.name, enabled: false });
            }
            if (theme !== 'Default') {
                const newMeta = ExtractMetaData.extractMetadataFromFile(join(Properties.themesPath, theme));
                if (newMeta) ipcRenderer.invoke(IPC_CHANNELS.SET_PLUGIN_ENABLED, { name: newMeta.name, enabled: true });
            }
        } catch(_) {}

        const newThemeElement = document.getElementById(theme);
        if (newThemeElement) {
            newThemeElement.classList.add("disabled");

            if (theme !== "Default") {
                newThemeElement.classList.remove("install-button-container-yfcq5");
                newThemeElement.classList.add("uninstall-button-container-oV4Yo");
            } else {
                newThemeElement.style.backgroundColor = "var(--overlay-color)";
            }

            newThemeElement.innerText = "Applied";
        }

        logger.info(`${theme} applied!`);
    },
};