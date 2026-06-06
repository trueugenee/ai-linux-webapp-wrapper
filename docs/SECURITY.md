# Security Notes

This project is an Electron wrapper around a website.
It should be treated like a small browser profile.

## Defaults

- Renderer `nodeIntegration` is disabled.
- Renderer `contextIsolation` is enabled.
- Renderer `sandbox` is enabled.
- Electron menu is disabled.
- Permission requests are denied by default.
- Internal navigation is limited to configured HTTPS hosts.
- External HTTPS links open in the default browser.
- Non-HTTPS external links are ignored.

## Config Rules

Use exact hosts:

```json
"allowedHosts": [
  "example.com",
  "www.example.com"
]
```

Do not use wildcard-style values:

```json
"allowedHosts": [
  "*",
  "*.example.com"
]
```

## Secrets

Do not commit:

- cookies
- tokens
- passwords
- private chart URLs
- local profile directories
- browser cache

## Review Checklist

Before publishing changes:

```bash
npm run verify
rg -n "token|password|cookie|secret|/home/|gmail|BEGIN .*KEY" . -g '!/.git/**'
```
