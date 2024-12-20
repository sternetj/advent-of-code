const path = require("path");

let scriptToRun = process.argv[2];
let inputTxtFileName = process.argv[3] ?? "input";

if (!scriptToRun) {
  throw Error(
    "Must provide a script identifier [year?:day?:puzzle] (ex. 2018:3:1, 3:1, 1)",
  );
}

let parts = scriptToRun.split(":");

if (parts.length === 1) {
  parts.splice(0, 0, new Date().getDate().toString());
}

if (parts.length === 2) {
  parts.splice(0, 0, new Date().getFullYear().toString());
}

process.env.INPUT = `${inputTxtFileName}.txt`;

const year = parts[0];
if (Number(year) >= 2024) {
  // In 2024 a simplification was added to not need to pass the default
  // file name into each instance of parseXXX.
  process.env.INPUT = path.resolve(
    __dirname,
    year,
    `Day${parts[1]}`,
    `${inputTxtFileName}.txt`,
  );
}

const scriptName = `./${parts[0]}/Day${parts[1]}/index-${parts[2]}.ts`;

console.log(`Running ${scriptName}`);
require(scriptName);

export {};
