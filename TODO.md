# TODO

## In-code fixes (can be done now)

- [x] **Window title** — BrowserWindow has no `title` set and doesn't prevent `page-title-updated`, so the tab/taskbar shows Stremio's own title. Fix: set `title: 'Stremio Plus'` in BrowserWindow options and call `e.preventDefault()` on the `page-title-updated` event.

- [x] **App icon (cross-platform)** — icon is hardcoded to `'./images/icon.ico'` (Windows only, relative path). Fix: use a platform-aware absolute path — `.ico` on Windows, `.icns` on macOS, `.png` on Linux.

- [ ] **Update notifier** — `RELEASES_API` and `VERSION_CHECK` now point to `Fxy6969/stremio-plus`. Needs a live release on that repo before it works end-to-end. Verify the `version` file and the GitHub release tag match the format `Updater.ts` expects.

## Requires creating a new GitHub repo

- [ ] **Own plugin/theme registry** — currently the marketplace fetches from `REVENGE977/stremio-enhanced-registry`. Create `Fxy6969/stremio-plus-registry` with the same JSON format, then update `URLS.REGISTRY` in `constants.ts` and the link in `marketplace-tab.html`. Submit the Glass Theme and its plugins as the first entries.

## Requires running the app

- [ ] **README screenshots/GIFs** — capture and replace:
  - Hero banner (main app window, home screen)
  - Settings panel open on the Enhanced section
  - Community marketplace browsing
  - A plugin being toggled on
  - Discord Rich Presence showing in Discord

- [ ] **Marketplace preview images** — each registry entry supports a preview image URL. For every plugin and theme you submit, add a screenshot hosted in the registry repo (or a CDN) so users can preview before installing.

- [ ] **Give Credit to Revenge in Stremio Settings, and Hide the Plugin/Theme section from stremio settings** - We only want to keep the About section.