let scriptToRun = process.argv[2];

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

const scriptName = `./${parts[0]}/Day${parts[1]}/index-${parts[2]}.ts`;

console.log(`Running ${scriptName}`);
require(scriptName);

export {};
