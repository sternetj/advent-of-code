import { parseInput } from "../../util/parse-input";

const input = parseInput(Number, __dirname, "input.txt");

for (let i = 0; i < input.length; i++) {
  for (let j = 1; j < input.length; j++) {
    if (input[i] + input[j] === 2020) {
      console.log(input[i] * input[j]);
      process.exit(0);
    }
  }
}
