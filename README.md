# AI Linux Webapp Wrapper

A small AI-friendly Electron wrapper template for frameless Linux webapps.
TradingView is the default example.

It opens a configured website in a dedicated app window without browser chrome,
keeps allowed navigation inside the app, and opens external HTTPS links in your
default browser. Out of the box it opens TradingView.

## Features

- Frameless webapp window.
- Default URL: `https://www.tradingview.com/chart/`.
- Custom start URL through `app.config.json`.
- Optional runtime override through `WEBAPP_URL`.
- Hidden page scrollbars.
- Electron menu disabled.
- Renderer permissions denied by default.
- `nodeIntegration` disabled, `contextIsolation` enabled, sandbox enabled.
- App state stored in `~/.config/ai-linux-webapp-wrapper`.
- Small test suite for config and navigation policy.

## How Is This Different?

This project is not trying to replace larger tools like Nativefier, Pake, or
Linux Mint Webapp Manager.

- Nativefier and Pake are stronger if you want a full app generator or packaged
  builds for many platforms.
- Linux Mint Webapp Manager is stronger if you want a graphical desktop tool for
  creating and managing webapps.
- This project is smaller on purpose: it is a readable Electron template with a
  config file, strict security defaults, tests, and agent-friendly docs.

Use this when you want a tiny Linux-focused webapp wrapper that you can inspect,
fork, and customize with Codex or another coding agent.

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

Open `app.config.json` and change:

```json
"startUrl": "https://www.tradingview.com/chart/"
```

For a custom TradingView chart:

```json
"startUrl": "https://www.tradingview.com/chart/YOUR_CHART_ID/"
```

Make sure the host is listed in `allowedHosts`:

```json
"allowedHosts": [
  "tradingview.com",
  "www.tradingview.com"
]
```

Then verify and run:

```bash
npm run verify
npm start
```

You can also use a temporary URL without editing the file:

```bash
WEBAPP_URL="https://www.tradingview.com/chart/YOUR_CHART_ID/" npm start
```

## AI-Assisted Customization

This project includes agent rules and safe prompt examples for changing the
wrapper with Codex or another coding agent:

- [AGENTS.md](AGENTS.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [ROADMAP.md](ROADMAP.md)
- [docs/CUSTOMIZE_WITH_CODEX.md](docs/CUSTOMIZE_WITH_CODEX.md)
- [docs/SECURITY.md](docs/SECURITY.md)

Useful examples:

- [examples/tradingview.config.json](examples/tradingview.config.json)
- [examples/generic-dashboard.config.json](examples/generic-dashboard.config.json)

## Verify

```bash
npm run verify
```

## Project Structure

```text
.
├── app.config.json
├── main.js
├── src/
│   ├── config.js
│   ├── create-window.js
│   └── url-policy.js
├── test/
│   ├── config.test.js
│   └── url-policy.test.js
├── examples/
├── docs/
└── scripts/
```

## Publish Checklist

Before publishing your fork:

```bash
npm install
npm run verify
git status --short
rg -n "token|password|cookie|secret|/home/|gmail|BEGIN .*KEY" . -g '!/.git/**'
```

Create a GitHub repository and push:

```bash
git remote add origin git@github.com:YOUR_USERNAME/ai-linux-webapp-wrapper.git
git push -u origin main
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

## Desktop Entry

Install a local desktop entry and icon:

```bash
./scripts/install-desktop-entry.sh
```

The script reads `appId` and `appName` from `app.config.json`, then creates:

- `~/.local/share/applications/<appId>.desktop`
- `~/.local/share/icons/hicolor/scalable/apps/<appId>.svg`

If you change `appId` or `appName`, run the script again.

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
