import { parseInput } from "../../util/parse-input";

const input = parseInput(Number, __dirname, "input.txt");

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    for (let k = j + 1; k < input.length; k++) {
      if (input[i] + input[j] + input[k] === 2020) {
        console.log(input[i] * input[j] * input[k]);
        process.exit(0);
      }
    }
  }
}
