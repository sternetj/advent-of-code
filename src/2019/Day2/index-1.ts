import { parseInput } from "../../util/parse-input";

const input = parseInput(Number, __dirname, "input.txt");

input[1] = 12;
input[2] = 2;

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

console.log(input[0]);
