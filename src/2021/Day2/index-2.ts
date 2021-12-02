import { parseString } from "../../util/parse-input";

const input = parseString(__dirname, "input.txt")
  .split("\n")
  .map((l) => l.trim());

let horizontalLocation = 0;
let depth = 0;
let aim = 0;

input.forEach((command) => {
  const delta = Number(command.replace(/\D/g, ""));

  switch (command[0]) {
    case "u": {
      aim -= delta;
      break;
    }
    case "d": {
      aim += delta;
      break;
    }
    case "f": {
      horizontalLocation += delta;
      depth += aim * delta;
      break;
    }
  }
});

console.log(horizontalLocation * depth);
