# TradingView Electron Wrapper

A small frameless Electron wrapper for TradingView on Linux.

It opens TradingView in a dedicated app window without browser chrome, keeps
TradingView navigation inside the app, and opens external HTTPS links in your
default browser.

## Features

- Frameless TradingView window.
- Default URL: `https://www.tradingview.com/chart/`.
- Custom start URL by editing one line in `main.js`.
- Optional runtime override through `TRADINGVIEW_URL`.
- Hidden page scrollbars.
- Electron menu disabled.
- Renderer permissions denied by default.
- `nodeIntegration` disabled, `contextIsolation` enabled, sandbox enabled.
- App state stored in `~/.config/tradingview-electron-wrapper`.

## Requirements

- Linux
- Node.js
- npm

On Arch Linux:

```bash
sudo pacman -S nodejs npm
```

## Run

```bash
git clone https://github.com/YOUR_USERNAME/tradingview-electron-wrapper.git
cd tradingview-electron-wrapper
npm install
npm start
```

## Set Your TradingView URL

Open `main.js` and change this line near the top:

```js
const userTradingViewUrl = defaultTradingViewUrl;
```

For example:

```js
const userTradingViewUrl = "https://www.tradingview.com/chart/YOUR_CHART_ID/";
```

Then run normally:

```bash
npm start
```

You can also use a temporary URL without editing the file:

```bash
TRADINGVIEW_URL="https://ru.tradingview.com/chart/YOUR_CHART_ID/" npm start
```

## Wayland Notes

If your Electron version does not select Wayland automatically, try:

```bash
ELECTRON_OZONE_PLATFORM_HINT=auto npm start
```

or:

```bash
npm start -- --ozone-platform=wayland
```

## Niri Example

```kdl
window-rule {
    match app-id=r#"TradingView|tradingview-electron-wrapper"#
    open-maximized true
}

binds {
    Mod+Shift+T hotkey-overlay-title="TradingView" {
        spawn-sh "cd ~/tradingview-electron-wrapper && npm start"
    }
}
```

## Desktop Entry Example

Create `~/.local/share/applications/tradingview-electron-wrapper.desktop`:

```ini
[Desktop Entry]
Name=TradingView
Comment=Frameless TradingView Electron wrapper
Exec=sh -c 'cd "$HOME/tradingview-electron-wrapper" && npm start'
Icon=tradingview-electron-wrapper
Terminal=false
Type=Application
Categories=Network;Office;
StartupWMClass=tradingview-electron-wrapper
```

Install the icon:

```bash
mkdir -p ~/.local/share/icons/hicolor/scalable/apps
cp assets/tradingview-electron-wrapper.svg ~/.local/share/icons/hicolor/scalable/apps/
gtk-update-icon-cache ~/.local/share/icons/hicolor || true
```

## Security Model

This wrapper intentionally keeps the Electron surface small:

- TradingView hosts are allowed inside the app.
- Non-TradingView HTTPS links are opened externally.
- Non-HTTPS external links are ignored.
- Renderer permission requests are denied.
- Node.js integration is disabled in the renderer.

This is still an Electron wrapper around a website. Treat it like a browser
session and keep Electron updated.

## License

MIT
