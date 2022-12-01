import { parseString } from "../../util/parse-input";

const input = parseString(__dirname, process.env.INPUT);

const elfRations = input
  .split("\n")
  .join(" ")
  .split("  ")
  .map((elfRow) =>
    elfRow
      .split(" ")
      .map(Number)
      .reduce((t, v) => t + v, 0)
  );

console.log(Math.max(...elfRations));
