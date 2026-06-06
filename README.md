# AI Linux Webapp Wrapper

A small AI-friendly Electron wrapper template for frameless Linux webapps.
TradingView is the default example.

It opens a configured website in a dedicated app window without browser chrome,
keeps allowed navigation inside the app, and opens external HTTPS links in your
default browser. Out of the box it opens TradingView.

## Features

- Frameless webapp window.
- Default URL: `https://www.tradingview.com/chart/`.
- Custom start URL by editing one line in `main.js`.
- Optional runtime override through `WEBAPP_URL`.
- Hidden page scrollbars.
- Electron menu disabled.
- Renderer permissions denied by default.
- `nodeIntegration` disabled, `contextIsolation` enabled, sandbox enabled.
- App state stored in `~/.config/ai-linux-webapp-wrapper`.

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
git clone https://github.com/YOUR_USERNAME/ai-linux-webapp-wrapper.git
cd ai-linux-webapp-wrapper
npm install
npm start
```

## Set Your Webapp URL

Open `main.js` and change this line near the top:

```js
const userWebappUrl = defaultWebappUrl;
```

For a custom TradingView chart:

```js
const userWebappUrl = "https://www.tradingview.com/chart/YOUR_CHART_ID/";
```

Then run normally:

```bash
npm start
```

You can also use a temporary URL without editing the file:

```bash
WEBAPP_URL="https://ru.tradingview.com/chart/YOUR_CHART_ID/" npm start
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
    match app-id=r#"TradingView|ai-linux-webapp-wrapper"#
    open-maximized true
}

binds {
    Mod+Shift+T hotkey-overlay-title="TradingView" {
        spawn-sh "cd ~/ai-linux-webapp-wrapper && npm start"
    }
}
```

## Desktop Entry Example

Create `~/.local/share/applications/ai-linux-webapp-wrapper.desktop`:

```ini
[Desktop Entry]
Name=TradingView
Comment=Frameless TradingView app using AI Linux Webapp Wrapper
Exec=sh -c 'cd "$HOME/ai-linux-webapp-wrapper" && npm start'
Icon=ai-linux-webapp-wrapper
Terminal=false
Type=Application
Categories=Network;Office;
StartupWMClass=ai-linux-webapp-wrapper
```

Install the icon:

```bash
mkdir -p ~/.local/share/icons/hicolor/scalable/apps
cp assets/ai-linux-webapp-wrapper.svg ~/.local/share/icons/hicolor/scalable/apps/
gtk-update-icon-cache ~/.local/share/icons/hicolor || true
```

## Security Model

This wrapper intentionally keeps the Electron surface small:

- The default config allows TradingView hosts inside the app.
- Non-allowed HTTPS links are opened externally.
- Non-HTTPS external links are ignored.
- Renderer permission requests are denied.
- Node.js integration is disabled in the renderer.

This is still an Electron wrapper around a website. Treat it like a browser
session and keep Electron updated.

## License

MIT
