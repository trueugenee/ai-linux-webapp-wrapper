const { normalizeConfig } = require("./config");
const { parseUrl } = require("./url-policy");

const appIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function runDoctor(rawConfig) {
  const errors = [];
  const warnings = [];
  let config;

  try {
    config = normalizeConfig(rawConfig);
  } catch (error) {
    return {
      ok: false,
      errors: [error.message],
      warnings,
    };
  }

  const startUrl = parseUrl(config.startUrl);

  if (
    startUrl !== null &&
    !config.allowedHosts.includes(startUrl.hostname.toLowerCase())
  ) {
    errors.push(
      `startUrl host "${startUrl.hostname}" is not listed in allowedHosts.`
    );
  }

  for (const host of config.allowedHosts) {
    if (host.includes("*")) {
      errors.push(
        `allowedHosts must use exact hosts; wildcard host "${host}" is not allowed.`
      );
    }
  }

  if (!appIdPattern.test(config.appId)) {
    warnings.push(
      "appId should use lowercase letters, numbers, and hyphens for desktop integration."
    );
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
  };
}

module.exports = {
  runDoctor,
};
