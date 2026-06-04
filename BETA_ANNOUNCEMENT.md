# [BETA] Stremio Plus — testing release, looking for feedback!

Hey r/StremioMods,

I've been working on a desktop Stremio client called **Stremio Plus** — a fork of [stremio-enhanced-community](https://github.com/REVENGE977/stremio-enhanced-community) by REVENGE977, which I've heavily extended with my own plugin/theme system, marketplace, and a bunch of extra features. I'm dropping a public **testing beta** today and would love early testers to poke at it and report issues.

---

![Preview](images/preview.gif)

---

## What is it?

A native Electron desktop app that wraps [Stremio Web](https://web.stremio.com/) and adds a full plugin/theme system, Discord Rich Presence, external player routing, and more.

---

## 🎨 Theme System

Swap Stremio's entire look with `.theme.css` files. Community-submitted themes available in one click.

<!-- PLACEHOLDER: Modern Glass theme screenshots (main page + player) -->
![Theme Main Page](images/modern-glass/MainPage.png)
![Theme Video Player](images/modern-glass/VideoPlayer.png)

---

## 🔌 Plugin System

Extend Stremio with `.plugin.js` scripts. Plugins run in isolated scopes, declare permissions for transparency, have per-plugin crash tracking, and can register their own settings panels. Toggle on/off without restarting.

<!-- PLACEHOLDER: Screenshot of plugin panel / settings UI -->
![Settings](images/settings_screenshot.png)

---

## 🛍️ Community Marketplace

Browse and install themes and plugins directly inside the app. Update notifications per item, URL-based installs with `stremio-plus://install?url=...`

<!-- PLACEHOLDER: GIF of marketplace browsing -->
![Marketplace](images/marketplace_loop.gif)

---

## 🔧 Built-in Features

| Feature | Description |
|---|---|
| **Discord Rich Presence** | Shows title, episode, and progress — toggleable |
| **External Player** | Route streams to VLC or MPV with configurable GLSL shaders and MPV flags |
| **`stremio://` protocol** | Install addons from links without copy-pasting manifest URLs |
| **Embedded subtitle fix** | Injects embedded subs when the native implementation fails |
| **Audio track fallback** | Surfaces audio tracks the native UI misses |
| **ANGLE renderer picker** | DX11/9, OpenGL, Vulkan, or Software (Windows/Linux) |
| **Window transparency** | Enables transparent-background themes |
| **Auto-updater** | Checks for new releases on startup and installs automatically |

---

## 📥 Download

Grab the beta from the **[Releases page](https://github.com/Fxy6969/stremio-plus/releases/latest)**.

<!-- PLACEHOLDER: Screenshot or video of the install/download flow -->
https://github.com/user-attachments/assets/b01e1ef0-b266-41fd-8c6e-5e797b617d3f

> **macOS:** The app is unsigned. Right-click → **Open** on first launch, or run:
> ```sh
> xattr -cr "/path/to/Stremio Plus.app"
> ```

---

## 🧪 What I'm Looking For

- Crashes or anything that doesn't load
- Plugin/theme installs that silently fail
- Discord RPC not connecting
- External player routing issues (especially MPV flags)
- Any UI weirdness on different OS/screen sizes
- General feedback on the panel UX (open with **Shift+Space**)

---

## 🔗 Links

- **GitHub:** https://github.com/Fxy6969/stremio-plus
- **Plugin API docs:** [`docs/plugin-api.md`](docs/plugin-api.md)
- **Support:** [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B41ZQZ7T)

---

*Not affiliated with Stremio. Forked from REVENGE977's stremio-enhanced-community — big thanks to them for the foundation.*
