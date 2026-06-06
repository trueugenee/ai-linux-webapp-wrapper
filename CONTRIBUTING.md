# Contributing

Contributions are welcome, especially small focused improvements.

## Good First Contributions

- Add a new example config in `examples/`.
- Improve README wording or Linux desktop notes.
- Add tests for config validation or URL policy behavior.
- Improve error messages without changing security defaults.
- Add documentation for a common webapp login edge case.

## Development Setup

```bash
npm install
npm run verify
```

Run the app:

```bash
npm start
```

## Rules

- Keep changes small and focused.
- Do not commit secrets, cookies, tokens, local paths, or personal app URLs.
- Do not enable renderer `nodeIntegration`.
- Do not disable `contextIsolation`.
- Do not disable `sandbox`.
- Do not add wildcard allowed hosts.
- Prefer config/docs changes before changing Electron logic.

## Pull Request Checklist

Before opening a PR:

```bash
npm run verify
git status --short
```

Also check that no private data was added:

```bash
rg -n "token|password|cookie|secret|/home/|gmail|BEGIN .*KEY" . -g '!/.git/**'
```

## Commit Style

Use short conventional-style messages when possible:

- `docs: add example config`
- `fix: improve config validation error`
- `test: cover external URL policy`
- `chore: update metadata`
