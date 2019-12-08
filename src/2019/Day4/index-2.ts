import { parseInput } from "../../util/parse-input";

const origInput = parseInput(Number, __dirname, "input.txt");

for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    const input = origInput.slice();
    input[1] = noun;
    input[2] = verb;

    for (let i = 0; i < input.length; i += 4) {
      const code = input[i];
      const valA = input[input[i + 1]];
      const valB = input[input[i + 2]];

      switch (code) {
        case 1:
          input[input[i + 3]] = valA + valB;
          continue;
        case 2:
          input[input[i + 3]] = valA * valB;
          continue;
      }
      break;
    }

    const output = input[0];

    if (output === 19690720) {
      console.log(100 * noun + verb);
      process.exit(0);
    }
  }
}
