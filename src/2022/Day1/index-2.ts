import { parseString } from "../../util/parse-input";

const input = parseString(__dirname, process.env.INPUT);

const sum = (total = 0, value: number) => total + value;

const elfRations = input
  .split("\n")
  .join(" ")
  .split("  ")
  .map((elfRow) => elfRow.split(" ").map(Number).reduce(sum));

elfRations.sort((a, b) => b - a);

console.log(elfRations.slice(0, 3).reduce(sum));
