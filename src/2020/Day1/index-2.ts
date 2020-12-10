import { parseInput } from "../../util/parse-input";

const input = parseInput(Number, __dirname, "input.txt");

function fuelCost(cost: number) {
  const result = Math.floor(cost / 3) - 2;

  if (result <= 0) return 0;

  return result + fuelCost(result);
}

const result = input.map(fuelCost).reduce((a, b) => a + b, 0);

console.log(result);
