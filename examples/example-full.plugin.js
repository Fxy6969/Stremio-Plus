// ==Plugin==
// @name            Example Full Plugin
// @version         1.0.0
// @author          YourName
// @description     A reference plugin that exercises every API feature: settings, dialogs, and logging.
// @updateUrl       none
// @github          you/repo
// @permission      dom
// @permission      storage
// @setting         enabled      | toggle | Show status bar       | true  | Toggle the bar on or off
// @setting         barColor     | text   | Bar color             | #6c5ce7 | Any valid CSS color
// @setting         position     | select | Bar position          | top   | top,bottom
// @setting         opacity      | range  | Bar opacity           | 0.9   | | 0 | 1 | 0.05
// @min_app_version 1.0.0
// ==/Plugin==

// ──────────────────────────────────────────────────────────────────────────────
// How @require works (commented out here so the plugin loads standalone):
//
//   // @require  Some Other Plugin >= 1.2.0
//
// Stremio Plus will load "Some Other Plugin" before this one. The name must
// match the @name of the dependency exactly.
// ──────────────────────────────────────────────────────────────────────────────

(async () => {
    // ── 1. Logger ─────────────────────────────────────────────────────────────
    StremioEnhancedAPI.logger.info('Plugin starting up');

    // ── 2. Register the settings panel ───────────────────────────────────────
    // Types supported by registerSettings: 'toggle', 'input', 'select'
    StremioEnhancedAPI.registerSettings([
        {
            key: 'enabled',
            type: 'toggle',
            label: 'Show status bar',
            description: 'Toggle the bar on or off',
            defaultValue: true,
        },
        {
            key: 'barColor',
            type: 'input',
            label: 'Bar color',
            description: 'Any valid CSS color (e.g. #6c5ce7, red, rgba(0,0,0,0.5))',
            defaultValue: '#6c5ce7',
        },
        {
            key: 'position',
            type: 'select',
            label: 'Bar position',
            defaultValue: 'top',
            options: [
                { label: 'Top',    value: 'top'    },
                { label: 'Bottom', value: 'bottom' },
            ],
        },
    ]);

    // ── 3. Read initial settings ──────────────────────────────────────────────
    // getSetting returns null when no value has been saved yet — fall back manually.
    const [rawEnabled, rawColor, rawPosition] = await Promise.all([
        StremioEnhancedAPI.getSetting('enabled'),
        StremioEnhancedAPI.getSetting('barColor'),
        StremioEnhancedAPI.getSetting('position'),
    ]);

    let enabled  = rawEnabled  !== null ? rawEnabled  : true;
    let barColor = rawColor    !== null ? rawColor    : '#6c5ce7';
    let position = rawPosition !== null ? rawPosition : 'top';

    StremioEnhancedAPI.logger.info(`Initial settings — enabled:${enabled} color:${barColor} position:${position}`);

    // ── 4. Build the DOM element ──────────────────────────────────────────────
    const BAR_ID = 'example-full-plugin-bar';

    function buildBar(color, pos) {
        let bar = document.getElementById(BAR_ID);
        if (!bar) {
            bar = document.createElement('div');
            bar.id = BAR_ID;
            bar.style.cssText = `
                position: fixed;
                left: 0; right: 0;
                height: 4px;
                z-index: 99999;
                cursor: pointer;
                transition: opacity 0.2s;
            `;
            document.body.appendChild(bar);

            // ── 5. showAlert ─────────────────────────────────────────────────
            bar.addEventListener('click', async () => {
                const choice = await StremioEnhancedAPI.showAlert(
                    'info',
                    'Example Full Plugin',
                    'What would you like to do?',
                    ['Rename bar label', 'Nothing']
                );

                if (choice === 0) {
                    // ── 6. showPrompt ────────────────────────────────────────
                    const label = await StremioEnhancedAPI.showPrompt(
                        'Rename bar',
                        'Enter a new label for the status bar:',
                        bar.title || 'Status Bar'
                    );

                    if (label !== null) {
                        bar.title = label;
                        // ── 7. saveSetting ───────────────────────────────────
                        await StremioEnhancedAPI.saveSetting('barLabel', label);
                        StremioEnhancedAPI.logger.info(`Bar renamed to: ${label}`);
                    } else {
                        StremioEnhancedAPI.logger.warn('Prompt cancelled — bar label unchanged');
                    }
                }
            });
        }

        bar.style.backgroundColor = color;
        bar.style[pos === 'bottom' ? 'bottom' : 'top'] = '0';
        bar.style[pos === 'bottom' ? 'top' : 'bottom'] = '';
        bar.style.display = enabled ? 'block' : 'none';
    }

    if (enabled) buildBar(barColor, position);

    // ── 8. React to settings changes ─────────────────────────────────────────
    // onSettingsSaved fires every time a setting is written (receives full config).
    StremioEnhancedAPI.onSettingsSaved(newSettings => {
        enabled  = newSettings.enabled  !== undefined ? newSettings.enabled  : enabled;
        barColor = newSettings.barColor !== undefined ? newSettings.barColor : barColor;
        position = newSettings.position !== undefined ? newSettings.position : position;

        const bar = document.getElementById(BAR_ID);
        if (!enabled) {
            if (bar) bar.style.display = 'none';
            return;
        }

        buildBar(barColor, position);
        StremioEnhancedAPI.logger.info(`Settings updated — color:${barColor} position:${position}`);
    });

    // ── 9. StremioSettings (legacy) — synchronous, load-time snapshot ─────────
    // Prefer getSetting/onSettingsSaved for new plugins. Shown here for reference.
    //
    //   const s        = StremioSettings.for('Example Full Plugin');
    //   const isOn     = s.toggle('enabled',  'Show bar',  true);
    //   const color    = s.color ('barColor', 'Color',     '#6c5ce7');
    //   const opacity  = s.slider('opacity',  'Opacity',   0.9, { min: 0, max: 1, step: 0.05 });
    //   const pos      = s.enum  ('position', 'Position',  'top', ['top', 'bottom']);
    //   const endpoint = s.text  ('endpoint', 'Endpoint',  'https://example.com');
    //
    //   console.log(isOn(), color(), opacity(), pos(), endpoint());

    StremioEnhancedAPI.logger.info('Plugin ready');
})();
