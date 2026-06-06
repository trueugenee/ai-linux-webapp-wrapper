const assert = require("node:assert/strict");
const test = require("node:test");
const {
  createUrlPolicy,
  parseUrl,
  shouldOpenExternally,
} = require("../src/url-policy");

test("parseUrl returns URL for valid input", () => {
  const parsed = parseUrl("https://www.tradingview.com/chart/");

  assert.equal(parsed.hostname, "www.tradingview.com");
});

test("parseUrl returns null for invalid input", () => {
  assert.equal(parseUrl("not a url"), null);
});

test("createUrlPolicy allows configured HTTPS hosts", () => {
  const policy = createUrlPolicy(["www.tradingview.com"]);

  assert.equal(
    policy.isAllowedInternalUrl("https://www.tradingview.com/chart/"),
    true
  );
});

test("createUrlPolicy rejects unconfigured HTTPS hosts", () => {
  const policy = createUrlPolicy(["www.tradingview.com"]);

  assert.equal(policy.isAllowedInternalUrl("https://evil.example/chart/"), false);
});

test("createUrlPolicy rejects non-HTTPS internal URLs", () => {
  const policy = createUrlPolicy(["www.tradingview.com"]);

  assert.equal(
    policy.isAllowedInternalUrl("http://www.tradingview.com/chart/"),
    false
  );
});

test("shouldOpenExternally only allows HTTPS URLs", () => {
  assert.equal(shouldOpenExternally("https://example.com"), true);
  assert.equal(shouldOpenExternally("http://example.com"), false);
  assert.equal(shouldOpenExternally("file:///etc/passwd"), false);
});
