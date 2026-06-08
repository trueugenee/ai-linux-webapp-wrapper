#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { runDoctor } = require("../src/doctor");

const configPath = path.join(process.cwd(), "app.config.json");

function readConfig() {
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    console.error(`Config doctor failed: ${error.message}`);
    process.exitCode = 1;
    return null;
  }
}

const rawConfig = readConfig();

if (rawConfig !== null) {
  const result = runDoctor(rawConfig);

  for (const warning of result.warnings) {
    console.warn(`Warning: ${warning}`);
  }

  for (const error of result.errors) {
    console.error(`Error: ${error}`);
  }

  if (result.ok) {
    console.log("Config doctor passed.");
  } else {
    console.error("Config doctor failed.");
    process.exitCode = 1;
  }
}
