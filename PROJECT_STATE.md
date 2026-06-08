# Project State

## What This Is

A small Linux Electron wrapper template for frameless webapps.
TradingView is the default app configuration.

## Run

```bash
npm install
npm start
```

## Verify

```bash
npm run doctor
npm run verify
```

## Architecture

- `main.js` is the Electron entrypoint.
- `app.config.json` contains user-facing app settings.
- `src/config.js` loads and validates config.
- `src/url-policy.js` owns navigation policy.
- `src/create-window.js` owns Electron window/session setup.
- `src/doctor.js` owns `app.config.json` diagnostics.
- `scripts/install-desktop-entry.sh` installs a local `.desktop` file and icon from `app.config.json`.

## Current Decisions

- Current package version is `0.1.1`.
- CommonJS is used to keep the app simple for Node/Electron beginners.
- Renderer security defaults stay strict: no Node integration, context isolation on, sandbox on.
- TradingView remains the default use case, but the repository is documented as a generic wrapper template.
- AI customization should happen through config and documented prompts first.
- Desktop integration is optional and local-user scoped.
- Community docs should guide small, focused contributions without expanding scope into a full app generator.

## Active Risks

- Electron wrappers inherit browser-session risk from the wrapped website.
- Over-broad allowed hosts would weaken the security model.
