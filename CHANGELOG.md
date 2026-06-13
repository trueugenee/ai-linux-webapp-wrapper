# Changelog

## 0.1.5 - 2026-06-13

- Improved config doctor errors when `allowedHosts` contains full URLs instead of hostnames.
- Added regression coverage for hostname-only `allowedHosts` diagnostics.

## 0.1.4 - 2026-06-12

- Added `npm run doctor:examples` to validate every config in `examples/`.
- Included example config diagnostics in `npm run verify`.
- Added tests for example config diagnostics.

## 0.1.3 - 2026-06-09

- Added a config doctor warning for webapps that may need separate login or OAuth hosts.
- Documented the warning in README.

## 0.1.2 - 2026-06-08

- Added more real-world example configs.
- Added examples for ChatGPT, GitHub, docs, and a self-hosted dashboard.
- Documented that login/OAuth hosts should be added explicitly.

## 0.1.1 - 2026-06-08

- Added `npm run doctor` for `app.config.json` diagnostics.
- Added checks for `startUrl` host coverage, wildcard hosts, and desktop-friendly `appId` values.
- Added doctor tests.

## 0.1.0 - 2026-06-06

Initial public template release.

- Added config-driven Electron wrapper for Linux webapps.
- Added TradingView as the default example configuration.
- Added strict renderer security defaults.
- Added navigation policy tests and config validation tests.
- Added Codex customization guide and security notes.
- Added local desktop entry installer.
