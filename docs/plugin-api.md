# Plugin API Reference

Stremio Plus plugins are plain JavaScript files (`.plugin.js`) with a userscript-style manifest header. Each plugin runs in an isolated function scope and communicates with the host app through the `StremioEnhancedAPI` object, which is injected automatically.

---

## Table of Contents

- [Plugin Manifest](#plugin-manifest)
- [Theme Manifest](#theme-manifest)
- [StremioEnhancedAPI](#stremioenhancedapi)
  - [Settings](#settings)
  - [Dialogs](#dialogs)
  - [Logger](#logger)
- [StremioSettings (Legacy Helper)](#stremiosettings-legacy-helper)
- [Dependency System](#dependency-system)
- [Permissions](#permissions)
- [Full Plugin Example](#full-plugin-example)
- [Full Theme Example](#full-theme-example)

---

## Plugin Manifest

Every plugin must start with a manifest block. The parser looks for `// ==Plugin==` … `// ==/Plugin==`.

```js
// ==Plugin==
// @name            My Plugin
// @version         1.0.0
// @author          YourName
// @description     A short description of what this plugin does.
// @updateUrl       https://raw.githubusercontent.com/you/repo/main/myplugin.plugin.js
// @github          you/repo
// @require         OtherPlugin >= 2.0.0
// @permission      network
// @setting         myToggle   | toggle | Enable feature       | true  | Turns the main feature on or off
// @setting         myText     | text   | API endpoint         | https://example.com
// @setting         myRange    | range  | Opacity              | 0.8   | | 0 | 1 | 0.05
// @setting         myColor    | color  | Accent color         | #ff0000
// @setting         mySelect   | select | Quality              | auto  | auto,1080p,720p,480p
// @min_app_version 1.2.0
// ==/Plugin==
```

### Manifest Fields

| Field | Required | Description |
|---|---|---|
| `@name` | Yes | Display name. Used as the plugin's identifier everywhere. |
| `@version` | Yes | Semver version string (e.g. `1.0.0`). Used to detect available updates. |
| `@author` | No | Author name shown in the settings UI. |
| `@description` | No | Short description shown under the plugin name. |
| `@updateUrl` | No | HTTPS URL pointing to the raw plugin source. Used for update checks. Set to `none` to disable update checking. |
| `@github` | No | `owner/repo` shorthand. Shown as a link in the settings UI. |
| `@require` | No | Declares a dependency on another plugin. Repeatable. See [Dependency System](#dependency-system). |
| `@permission` | No | Declares a capability the plugin uses. Repeatable. See [Permissions](#permissions). |
| `@setting` | No | Declares a setting entry rendered in the plugin's settings panel. Repeatable. See setting format below. |
| `@min_app_version` | No | Minimum Stremio Plus version required to run this plugin. |

### `@setting` Format

```
// @setting   key | kind | label | default [| hint] [| min | max [| step]]
//                                          [| option1,option2,...] (select only)
```

| Kind | Extra fields | Description |
|---|---|---|
| `toggle` | `hint` (optional) | Boolean on/off switch |
| `text` | `hint` (optional) | Single-line text input |
| `color` | `hint` (optional) | Color picker, value is a CSS hex string (e.g. `#ff0000`) |
| `range` | `hint`, `min`, `max`, `step` | Numeric slider |
| `select` | comma-separated options | Dropdown selector |

Examples:

```js
// @setting  darkMode   | toggle | Dark mode          | true  | Enables dark styling
// @setting  apiUrl     | text   | Server URL         | https://api.example.com
// @setting  accent     | color  | Accent color       | #6c5ce7
// @setting  volume     | range  | Default volume     | 1.0   | | 0 | 1 | 0.05
// @setting  quality    | select | Default quality    | auto  | auto,1080p,720p,480p
```

---

## Theme Manifest

Themes use a CSS block comment for the manifest. Fields are the same as plugins minus `@setting`, `@require`, and `@permission`.

```css
/* ==Theme==
 * @name        Modern Glass
 * @version     1.2.0
 * @author      YourName
 * @description A frosted glass theme for Stremio.
 * @updateUrl   https://raw.githubusercontent.com/you/repo/main/theme.theme.css
 * @require     SomePlugin >= 1.0.0
 * ==/Theme== */

:root {
    --primary-accent-color: #6c5ce7;
}
```

When a theme declares `@require`, Stremio Plus will warn the user to install the required plugin before applying the theme.

---

## StremioEnhancedAPI

Inside every plugin, `StremioEnhancedAPI` is a pre-scoped object — you don't need to pass your plugin name anywhere, it's handled automatically.

### Settings

#### `registerSettings(schema)`

Registers a settings panel for your plugin. Call this once at plugin load time. The settings button on your plugin's card will become visible.

```js
StremioEnhancedAPI.registerSettings([
    {
        key: 'enabled',
        type: 'toggle',
        label: 'Enable feature',
        description: 'Turns the main behaviour on or off',
        defaultValue: true
    },
    {
        key: 'endpoint',
        type: 'input',
        label: 'API endpoint',
        defaultValue: 'https://api.example.com'
    },
    {
        key: 'quality',
        type: 'select',
        label: 'Quality',
        defaultValue: 'auto',
        options: [
            { label: 'Auto',  value: 'auto'  },
            { label: '1080p', value: '1080p' },
            { label: '720p',  value: '720p'  },
        ]
    }
]);
```

**Schema field reference:**

| Field | Type | Required | Description |
|---|---|---|---|
| `key` | `string` | Yes | Unique key used to read/write this setting. |
| `type` | `'toggle' \| 'input' \| 'select'` | Yes | UI control type. |
| `label` | `string` | Yes | Label shown next to the control. |
| `description` | `string` | No | Subtext shown below the label. |
| `defaultValue` | `any` | No | Fallback value when no saved value exists. |
| `options` | `{ label: string, value: any }[]` | For `select` | Dropdown options. |

---

#### `getSetting(key)` → `Promise<any>`

Reads a single saved setting value for your plugin.

```js
StremioEnhancedAPI.getSetting('enabled').then(val => {
    if (val !== false) startFeature();
});
```

Returns the saved value, or `undefined` if the key has never been saved. Falls back to the `defaultValue` declared in `registerSettings` only when the settings modal is shown — not at read time. Guard against `undefined` yourself.

---

#### `saveSetting(key, value)` → `Promise<void>`

Saves a single setting value for your plugin.

```js
StremioEnhancedAPI.saveSetting('lastRun', Date.now());
```

---

#### `onSettingsSaved(callback)`

Registers a listener that fires every time the user saves your plugin's settings panel. The callback receives the full new settings object.

```js
StremioEnhancedAPI.onSettingsSaved(newSettings => {
    applySettings(newSettings.enabled, newSettings.endpoint);
});
```

Only one listener is active at a time — calling this again replaces the previous one.

---

### Dialogs

#### `showAlert(type, title, message, buttons)` → `Promise<number>`

Shows a native Electron dialog. Returns the zero-based index of the button the user clicked.

```js
const result = await StremioEnhancedAPI.showAlert(
    'warning',
    'Confirm action',
    'Are you sure you want to do this?',
    ['Yes', 'No']
);

if (result === 0) {
    // user clicked Yes
}
```

| Parameter | Type | Description |
|---|---|---|
| `type` | `'info' \| 'warning' \| 'error' \| 'question'` | Dialog icon type |
| `title` | `string` | Dialog window title |
| `message` | `string` | Body text |
| `buttons` | `string[]` | Button labels. The index of the clicked button is returned. |

---

#### `showPrompt(title, message, defaultValue?)` → `Promise<string | null>`

Shows an in-app text input prompt. Returns the entered string, or `null` if the user cancelled.

```js
const name = await StremioEnhancedAPI.showPrompt(
    'Enter name',
    'What should we call this?',
    'Default value'
);

if (name !== null) {
    StremioEnhancedAPI.logger.info(`User entered: ${name}`);
}
```

Press <kbd>Enter</kbd> to confirm or <kbd>Escape</kbd> to cancel.

---

### Logger

```js
StremioEnhancedAPI.logger.info('Plugin started');
StremioEnhancedAPI.logger.warn('Something looks off');
StremioEnhancedAPI.logger.error('Something broke');
```

Logs are written to the Stremio Plus log file (via Winston) and tagged with your plugin name. Useful for debugging without flooding the browser console.

---

## StremioSettings (Legacy Helper)

`StremioSettings` is a synchronous helper injected alongside `StremioEnhancedAPI`. It reads saved settings at plugin load time (before any async calls resolve) and returns getter functions. It exists primarily for compatibility with older plugin patterns.

```js
const settings = StremioSettings.for('My Plugin');

const isEnabled = settings.toggle('enabled', 'Enable feature', true);
const opacity   = settings.slider('opacity', 'Opacity', 0.8, { min: 0, max: 1, step: 0.05 });
const color     = settings.color('accent', 'Accent', '#ff0000');
const label     = settings.text('label', 'Label', 'default');
const mode      = settings.enum('mode', 'Mode', 'auto', ['auto', '1080p', '720p']);

// Each returns a getter — call it to get the current value:
console.log(isEnabled()); // true or false
console.log(opacity());   // 0.8
```

**For new plugins, prefer `StremioEnhancedAPI.getSetting()` + `onSettingsSaved()` instead.** `StremioSettings` reads the snapshot from load time and won't reflect changes made while the plugin is running.

---

## Dependency System

Plugins can declare dependencies on other plugins using `@require`. Stremio Plus resolves load order automatically so dependencies are always initialized before the plugins that need them.

```js
// ==Plugin==
// @name     Child Plugin
// @version  1.0.0
// @require  Base Plugin >= 2.0.0
// ==/Plugin==
```

- If the version constraint isn't met, the app will warn but still attempt to load
- Circular dependencies are detected and logged; the involved plugins are skipped
- The `name` in `@require` must match the `@name` of the dependency exactly

---

## Permissions

The `@permission` field is informational — it appears in the plugin's card so users know what the plugin accesses. No enforcement happens at runtime, but it's good practice to declare what your plugin does.

Common values:

| Permission | Meaning |
|---|---|
| `network` | Makes fetch/XHR requests to external URLs |
| `storage` | Reads or writes to localStorage beyond plugin settings |
| `dom` | Modifies Stremio's page DOM |
| `player` | Interacts with the video player |

---

## Full Plugin Example

```js
// ==Plugin==
// @name         Dark Border
// @version      1.0.0
// @author       YourName
// @description  Adds a customisable colored border around the app window.
// @updateUrl    https://raw.githubusercontent.com/you/repo/main/dark-border.plugin.js
// @permission   dom
// @setting      enabled     | toggle | Show border        | true
// @setting      color       | color  | Border color       | #6c5ce7
// @setting      thickness   | range  | Border thickness   | 3 | | 1 | 20 | 1
// ==/Plugin==

(async () => {
    const [enabled, color, thickness] = await Promise.all([
        StremioEnhancedAPI.getSetting('enabled'),
        StremioEnhancedAPI.getSetting('color'),
        StremioEnhancedAPI.getSetting('thickness'),
    ]);

    const style = document.createElement('style');
    style.id = 'dark-border-style';

    function apply(on, col, px) {
        style.textContent = on === false ? '' :
            `body { box-shadow: inset 0 0 0 ${px ?? 3}px ${col ?? '#6c5ce7'}; }`;
    }

    apply(enabled, color, thickness);
    document.head.appendChild(style);

    StremioEnhancedAPI.registerSettings([
        { key: 'enabled',   type: 'toggle', label: 'Show border',      defaultValue: true },
        { key: 'color',     type: 'input',  label: 'Border color',     defaultValue: '#6c5ce7' },
        { key: 'thickness', type: 'input',  label: 'Thickness (px)',   defaultValue: '3' },
    ]);

    StremioEnhancedAPI.onSettingsSaved(s => {
        apply(s.enabled, s.color, s.thickness);
    });
})();
```

---

## Full Theme Example

```css
/* ==Theme==
 * @name        Clean Dark
 * @version     1.0.0
 * @author      YourName
 * @description A minimal dark theme with a purple accent.
 * @updateUrl   https://raw.githubusercontent.com/you/repo/main/clean-dark.theme.css
 * ==/Theme== */

:root {
    --primary-accent-color: #6c5ce7;
    --secondary-accent-color: #a29bfe;
    --background-color: #0d0d0d;
}

body {
    background: var(--background-color) !important;
}
```
