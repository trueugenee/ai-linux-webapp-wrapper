const fs = require("node:fs");
const path = require("node:path");
const { runDoctor } = require("./doctor");

function listExampleConfigFiles(directory) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".config.json"))
    .sort();
}

function checkExampleConfigs(directory) {
  const files = listExampleConfigFiles(directory);
  const failures = [];

  for (const file of files) {
    const filePath = path.join(directory, file);
    let rawConfig;

    try {
      rawConfig = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
      failures.push({
        file,
        errors: [`Invalid JSON: ${error.message}`],
      });
      continue;
    }

    const result = runDoctor(rawConfig);

    if (!result.ok) {
      failures.push({
        file,
        errors: result.errors,
      });
    }
  }

  return {
    ok: failures.length === 0,
    checked: files.length,
    failures,
  };
}

module.exports = {
  checkExampleConfigs,
  listExampleConfigFiles,
};
