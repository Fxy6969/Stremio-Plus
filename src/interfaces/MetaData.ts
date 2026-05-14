export type SettingKind = 'toggle' | 'color' | 'range' | 'text' | 'select';

export interface PluginSetting {
    key: string;
    kind: SettingKind;
    label: string;
    hint?: string;
    default: string;
    min?: number;
    max?: number;
    step?: number;
    options: string[]; // for 'select'
}

export interface RequiredPlugin {
    name: string;
    minVersion?: string;
}

export interface MetaData {
    name: string;
    description: string;
    author: string;
    version: string;
    updateUrl?: string;
    preview?: string;
    download?: string;
    repo?: string;

    // --- fields ported from Rust plugin_manifest ---
    /** GitHub repo in "owner/repo" format, used for star counts in marketplace */
    github?: string;
    /** Declared network permissions. Empty = locked-down (no fetch/XHR). Add "network" to allow. */
    permissions: string[];
    /** Semver floor for the host app */
    minAppVersion?: string;
    /** @require dependencies with optional ">=" version constraint */
    requires: RequiredPlugin[];
    /** Typed settings schema */
    settings: PluginSetting[];
}