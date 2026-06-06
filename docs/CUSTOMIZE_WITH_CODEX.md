# Customize With Codex

This project is intentionally small so a coding agent can safely adapt it.
Prefer changing `app.config.json` before touching Electron logic.

## Safe Prompt: Change The Wrapped Website

```text
Update this Electron wrapper to open https://example.com/ by default.
Only edit app.config.json.
Set allowedHosts to example.com and www.example.com.
Do not change Electron security settings.
Run npm run verify after the change.
```

## Safe Prompt: Rename The App

```text
Rename this wrapper to My Dashboard.
Only edit app.config.json and README.md if needed.
Keep appId lowercase with hyphens.
Run npm run verify after the change.
```

## Safe Prompt: Add A Host

```text
Add docs.example.com as an allowed internal navigation host.
Only edit app.config.json.
Do not allow wildcard hosts.
Run npm run verify after the change.
```

## Unsafe Requests To Avoid

- Enabling Node.js in the renderer.
- Disabling sandbox.
- Allowing all hosts.
- Storing login cookies, tokens, or passwords in the repository.
- Committing a personal app URL if you do not want it public.

## Manual Customization

Edit `app.config.json`:

```json
"startUrl": "https://www.tradingview.com/chart/"
```

and:

```json
"allowedHosts": [
  "tradingview.com",
  "www.tradingview.com"
]
```

Then run:

```bash
npm run verify
npm start
```
