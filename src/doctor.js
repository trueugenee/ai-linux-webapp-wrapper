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
  const invalidHostValues = new Set();

  for (const host of config.allowedHosts) {
    const parsedHost = parseUrl(host);

    if (parsedHost !== null) {
      invalidHostValues.add(host);
      errors.push(
        `allowedHosts must contain hostnames only; use "${parsedHost.hostname}" instead of "${host}".`
      );
    }
  }

  if (
    startUrl !== null &&
    !config.allowedHosts.includes(startUrl.hostname.toLowerCase()) &&
    invalidHostValues.size === 0
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

  if (config.allowedHosts.length === 1) {
    warnings.push(
      "Some webapps use separate login or OAuth hosts. If login opens externally, add the exact login host intentionally."
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
