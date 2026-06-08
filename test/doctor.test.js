const assert = require("node:assert/strict");
const test = require("node:test");
const { runDoctor } = require("../src/doctor");

test("runDoctor passes for a valid config", () => {
  const result = runDoctor({
    appId: "example-wrapper",
    appName: "Example",
    startUrl: "https://example.com/app",
    allowedHosts: ["example.com"],
    window: {
      width: 1280,
      height: 800,
      frame: false,
      backgroundColor: "#111111",
    },
    hideScrollbars: true,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
});

test("runDoctor reports when startUrl host is not allowed", () => {
  const result = runDoctor({
    appId: "example-wrapper",
    appName: "Example",
    startUrl: "https://example.com/app",
    allowedHosts: ["www.example.com"],
  });

  assert.equal(result.ok, false);
  assert.deepEqual(result.errors, [
    "startUrl host \"example.com\" is not listed in allowedHosts.",
  ]);
});

test("runDoctor reports wildcard hosts", () => {
  const result = runDoctor({
    appId: "example-wrapper",
    appName: "Example",
    startUrl: "https://example.com/app",
    allowedHosts: ["example.com", "*.example.com"],
  });

  assert.equal(result.ok, false);
  assert.deepEqual(result.errors, [
    "allowedHosts must use exact hosts; wildcard host \"*.example.com\" is not allowed.",
  ]);
});

test("runDoctor warns about invalid appId characters", () => {
  const result = runDoctor({
    appId: "Example Wrapper",
    appName: "Example",
    startUrl: "https://example.com/app",
    allowedHosts: ["example.com"],
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.warnings, [
    "appId should use lowercase letters, numbers, and hyphens for desktop integration.",
  ]);
});
