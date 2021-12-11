import { parseInput } from "../../util/parse-input";

let input = parseInput((l) => l.split("").map(Number), __dirname, "input.txt");

let steps = 0;
let flashes = 0;

while (true) {
  let lastFlash = flashes;
  let once = true;

  do {
    lastFlash = flashes;
    for (let r = 0; r < input.length; r++) {
      const row = input[r];
      for (let c = 0; c < row.length; c++) {
        let cell = row[c];

        if (once) {
          cell = cell ?? 0;
          cell++;
          input[r][c] = cell;
        } else if (cell > 9) {
          row[c] = undefined;
          flashes++;

          [-1, 0, 1].forEach((rd) => {
            [-1, 0, 1].forEach((cd) => {
              if (typeof input[r + rd]?.[c + cd] === "number") {
                input[r + rd][c + cd]++;
              }
            });
          });
        }
      }
    }

    if (once) {
      lastFlash--;
    }

    once = false;
  } while (flashes > lastFlash);

  steps++;

  if (input.every((row) => row.every((c) => !c))) {
    break;
  }
}

console.log(steps);
