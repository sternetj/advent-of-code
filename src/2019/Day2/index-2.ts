import { parseInput } from "../../util/parse-input";
import { computeIntCode } from "../int-code";

const origInput = parseInput(Number, __dirname, "input.txt");

for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    const input = origInput.slice();
    input[1] = noun;
    input[2] = verb;

    const output = computeIntCode(input);

    if (output === 19690720) {
      console.log(100 * noun + verb);
      process.exit(0);
    }
  }
}
