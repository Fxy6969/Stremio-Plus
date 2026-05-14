import TemplateCache from '../../../utils/templateCache';
import { PluginSetting } from '../../../interfaces/MetaData';
import { FILE_EXTENSIONS } from '../../../constants';

export const pluginOptionsModal = {

    getTemplate: (
        pluginName: string,
        schema: PluginSetting[],
        currentValues: Record<string, any>,
    ): string => {
        let template = TemplateCache.load(__dirname, 'plugin-settings-modal');
        const modalId = `${pluginName.replace(/[^a-zA-Z0-9]/g, '')}-settings-modal`;

        let settingsHtml = '';
        for (const setting of schema) {
            const currentValue = currentValues[setting.key] ?? setting.default ?? '';
            switch (setting.kind) {
                case 'toggle': settingsHtml += pluginOptionsModal._buildToggle(setting, currentValue); break;
                case 'text':   settingsHtml += pluginOptionsModal._buildInput(setting, currentValue);  break;
                case 'select': settingsHtml += pluginOptionsModal._buildSelect(setting, currentValue); break;
                case 'color':  settingsHtml += pluginOptionsModal._buildColor(setting, currentValue);  break;
                case 'range':  settingsHtml += pluginOptionsModal._buildRange(setting, currentValue);  break;
            }
        }

        return template
            .replace(/\{\{\s*modalId\s*\}\}/g, modalId)
            .replace(/\{\{\s*pluginName\s*\}\}/g, pluginName.replace(FILE_EXTENSIONS.PLUGIN, ''))
            .replace(/\{\{\s*settingsHtml\s*\}\}/g, settingsHtml);
    },

    // ── Shared wrapper ────────────────────────────────────────────────────────

    _wrap: (setting: PluginSetting, controlHtml: string): string => `
    <div class="option-vFOAS" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <div class="heading-dYMDt" style="flex:1;padding-right:20px;min-width:0;">
            <div class="label-qI6Vh" style="font-size:1.1em;white-space:normal;overflow:visible;text-overflow:clip;line-height:1.4;">${setting.label}</div>
            ${setting.hint ? `<div style="font-size:0.85em;color:#a0a0a0;margin-top:4px;white-space:normal;line-height:1.4;">${setting.hint}</div>` : ''}
        </div>
        <div class="content-P2T0i" style="flex-shrink:0;">${controlHtml}</div>
    </div>`,

    // ── Toggle ────────────────────────────────────────────────────────────────

    _buildToggle: (setting: PluginSetting, currentValue: any): string => {
        const isChecked  = currentValue === true || currentValue === 'true';
        const checkedCls = isChecked ? 'checked' : '';
        return pluginOptionsModal._wrap(setting, `
            <div tabindex="0" class="toggle-container-lZfHP button-container-zVLH6 plugin-setting-toggle ${checkedCls}"
                 data-key="${setting.key}" style="outline:none;">
                <div class="toggle-toOWM"></div>
            </div>`);
    },

    // ── Text input ────────────────────────────────────────────────────────────

    _buildInput: (setting: PluginSetting, currentValue: any): string =>
        pluginOptionsModal._wrap(setting, `
            <div style="width:200px;max-width:300px;">
                <label class="search-bar-k7MXd search-bar-container-p4tSt" style="width:100%;padding:0;margin:0;display:block;">
                    <input data-key="${setting.key}" size="1"
                           autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false"
                           tabindex="0" class="search-input-bAgAh text-input-hnLiz plugin-setting-input"
                           type="text" placeholder="${setting.label}" value="${currentValue}"
                           style="width:100%;box-sizing:border-box;height:42px;padding:0 15px;">
                </label>
            </div>`),

    // ── Select ────────────────────────────────────────────────────────────────

    _buildSelect: (setting: PluginSetting, currentValue: any): string => {
        const optionsHtml = (setting.options ?? []).map(opt => {
            // Options may be plain strings (label=value) or "label:value" pairs
            const [optLabel, optValue = optLabel] = opt.includes(':')
                ? opt.split(':', 2)
                : [opt, opt];
            const sel = optValue === String(currentValue) ? 'selected' : '';
            return `<option value="${optValue}" ${sel} style="background-color:#1a1a1a;color:white;">${optLabel}</option>`;
        }).join('');

        return pluginOptionsModal._wrap(setting, `
            <div style="width:200px;max-width:300px;">
                <select data-key="${setting.key}"
                        class="search-input-bAgAh text-input-hnLiz plugin-setting-select"
                        style="width:100%;padding:0 15px;cursor:pointer;background-color:rgba(255,255,255,0.08);
                               color:white;border:1px solid transparent;border-radius:20px;outline:none;
                               appearance:auto;box-sizing:border-box;height:42px;">
                    ${optionsHtml}
                </select>
            </div>`);
    },

    // ── Color picker (new — from Rust SettingKind::Color) ────────────────────

    _buildColor: (setting: PluginSetting, currentValue: any): string => {
        const val = currentValue || setting.default || '#ffffff';
        return pluginOptionsModal._wrap(setting, `
            <div style="display:flex;align-items:center;gap:10px;">
                <input data-key="${setting.key}" type="color" value="${val}"
                       class="plugin-setting-color"
                       style="width:42px;height:42px;border:none;border-radius:10px;
                              cursor:pointer;background:none;padding:2px;">
                <span class="plugin-setting-color-hex"
                      style="font-size:0.9em;color:#ccc;font-family:monospace;">${val}</span>
            </div>`);
    },

    // ── Range slider (new — from Rust SettingKind::Range) ────────────────────

    _buildRange: (setting: PluginSetting, currentValue: any): string => {
        const min  = setting.min  ?? 0;
        const max  = setting.max  ?? 1;
        const step = setting.step ?? 0.01;
        const val  = currentValue !== '' ? currentValue : (setting.default ?? min);

        return pluginOptionsModal._wrap(setting, `
            <div style="width:200px;max-width:300px;display:flex;align-items:center;gap:10px;">
                <input data-key="${setting.key}" type="range"
                       min="${min}" max="${max}" step="${step}" value="${val}"
                       class="plugin-setting-range"
                       style="flex:1;accent-color:#7b5ea7;cursor:pointer;">
                <span class="plugin-setting-range-val"
                      style="min-width:36px;text-align:right;font-size:0.9em;
                             color:#ccc;font-family:monospace;">${val}</span>
            </div>`);
    },
};