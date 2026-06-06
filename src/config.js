const fs = require("node:fs");
const path = require("node:path");

function parseHttpsUrl(value, fieldName) {
  let parsed;

  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${fieldName} must be a valid URL`);
  }

  if (parsed.protocol !== "https:") {
    throw new Error(`${fieldName} must be an HTTPS URL`);
  }

  return parsed.toString();
}

function normalizeConfig(rawConfig) {
  const appId =
    typeof rawConfig.appId === "string" && rawConfig.appId.trim() !== ""
      ? rawConfig.appId.trim()
      : "ai-linux-webapp-wrapper";

  const appName =
    typeof rawConfig.appName === "string" && rawConfig.appName.trim() !== ""
      ? rawConfig.appName.trim()
      : "Webapp";

  const startUrl = parseHttpsUrl(rawConfig.startUrl, "startUrl");

  const allowedHosts = Array.isArray(rawConfig.allowedHosts)
    ? rawConfig.allowedHosts
        .filter((host) => typeof host === "string")
        .map((host) => host.trim().toLowerCase())
        .filter((host) => host !== "")
    : [];

  if (allowedHosts.length === 0) {
    throw new Error("allowedHosts must contain at least one host");
  }

  const windowConfig = rawConfig.window || {};

  return {
    appId,
    appName,
    startUrl,
    allowedHosts: [...new Set(allowedHosts)],
    window: {
      width: Number.isInteger(windowConfig.width) ? windowConfig.width : 1280,
      height: Number.isInteger(windowConfig.height) ? windowConfig.height : 800,
      frame:
        typeof windowConfig.frame === "boolean" ? windowConfig.frame : false,
      backgroundColor:
        typeof windowConfig.backgroundColor === "string"
          ? windowConfig.backgroundColor
          : "#131722",
    },
    hideScrollbars:
      typeof rawConfig.hideScrollbars === "boolean"
        ? rawConfig.hideScrollbars
        : true,
  };
}

function loadConfig(configPath = path.join(process.cwd(), "app.config.json")) {
  const rawConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const config = normalizeConfig(rawConfig);

  if (process.env.WEBAPP_URL) {
    return {
      ...config,
      startUrl: parseHttpsUrl(process.env.WEBAPP_URL, "WEBAPP_URL"),
    };
  }

  return config;
}

module.exports = {
  loadConfig,
  normalizeConfig,
};
