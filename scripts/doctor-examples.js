#!/usr/bin/env node

const path = require("node:path");
const { checkExampleConfigs } = require("../src/doctor-examples");

const examplesDirectory = path.join(process.cwd(), "examples");
const result = checkExampleConfigs(examplesDirectory);

if (result.ok) {
  console.log(`Example config doctor passed: ${result.checked} checked.`);
} else {
  for (const failure of result.failures) {
    console.error(`Example config failed: ${failure.file}`);

    for (const error of failure.errors) {
      console.error(`  Error: ${error}`);
    }
  }

  console.error(
    `Example config doctor failed: ${result.failures.length}/${result.checked} failed.`
  );
  process.exitCode = 1;
}
