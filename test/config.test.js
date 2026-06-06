const assert = require("node:assert/strict");
const test = require("node:test");
const { normalizeConfig } = require("../src/config");

test("normalizeConfig accepts a valid HTTPS app config", () => {
  const config = normalizeConfig({
    appId: "example-wrapper",
    appName: "Example",
    startUrl: "https://example.com/app",
    allowedHosts: ["example.com"],
    window: {
      width: 1000,
      height: 700,
      frame: false,
      backgroundColor: "#000000",
    },
    hideScrollbars: true,
  });

  assert.equal(config.appId, "example-wrapper");
  assert.equal(config.appName, "Example");
  assert.equal(config.startUrl, "https://example.com/app");
  assert.deepEqual(config.allowedHosts, ["example.com"]);
  assert.deepEqual(config.window, {
    width: 1000,
    height: 700,
    frame: false,
    backgroundColor: "#000000",
  });
  assert.equal(config.hideScrollbars, true);
});

test("normalizeConfig rejects non-HTTPS start URLs", () => {
  assert.throws(
    () =>
      normalizeConfig({
        appId: "bad-wrapper",
        appName: "Bad",
        startUrl: "http://example.com",
        allowedHosts: ["example.com"],
      }),
    /startUrl must be an HTTPS URL/
  );
});

test("normalizeConfig rejects missing allowed hosts", () => {
  assert.throws(
    () =>
      normalizeConfig({
        appId: "bad-wrapper",
        appName: "Bad",
        startUrl: "https://example.com",
        allowedHosts: [],
      }),
    /allowedHosts must contain at least one host/
  );
});

test("normalizeConfig deduplicates and lowercases allowed hosts", () => {
  const config = normalizeConfig({
    appId: "example-wrapper",
    appName: "Example",
    startUrl: "https://example.com",
    allowedHosts: ["Example.com", " example.com ", "www.example.com"],
  });

  assert.deepEqual(config.allowedHosts, ["example.com", "www.example.com"]);
});
