function parseUrl(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function createUrlPolicy(allowedHosts) {
  const normalizedHosts = new Set(
    allowedHosts.map((host) => host.trim().toLowerCase())
  );

  function isAllowedInternalUrl(url) {
    const parsed = parseUrl(url);

    return (
      parsed !== null &&
      parsed.protocol === "https:" &&
      normalizedHosts.has(parsed.hostname.toLowerCase())
    );
  }

  return {
    isAllowedInternalUrl,
  };
}

function shouldOpenExternally(url) {
  const parsed = parseUrl(url);

  return parsed !== null && parsed.protocol === "https:";
}

module.exports = {
  createUrlPolicy,
  parseUrl,
  shouldOpenExternally,
};
