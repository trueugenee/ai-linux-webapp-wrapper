const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { checkExampleConfigs } = require("../src/doctor-examples");

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

test("checkExampleConfigs passes valid example configs", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "wrapper-examples-"));

  writeJson(path.join(directory, "valid.config.json"), {
    appId: "valid-wrapper",
    appName: "Valid",
    startUrl: "https://example.com/",
    allowedHosts: ["example.com"],
  });

  const result = checkExampleConfigs(directory);

  assert.equal(result.ok, true);
  assert.equal(result.checked, 1);
  assert.deepEqual(result.failures, []);
});

test("checkExampleConfigs reports invalid example configs", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "wrapper-examples-"));

  writeJson(path.join(directory, "invalid.config.json"), {
    appId: "invalid-wrapper",
    appName: "Invalid",
    startUrl: "https://example.com/",
    allowedHosts: ["www.example.com"],
  });

  const result = checkExampleConfigs(directory);

  assert.equal(result.ok, false);
  assert.equal(result.checked, 1);
  assert.deepEqual(result.failures, [
    {
      file: "invalid.config.json",
      errors: ['startUrl host "example.com" is not listed in allowedHosts.'],
    },
  ]);
});
