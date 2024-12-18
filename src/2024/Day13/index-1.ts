import { parseInputWithBreaks } from "../../util/parse-input";

type Tuple = [number, number];
type Machine = [Tuple, Tuple, Tuple];

const input = parseInputWithBreaks((l) => {
  if (l === "") return "";
  let re = /Prize: X=(\d+), Y=(\d+)/;
  if (l.startsWith("Button")) {
    re = /Button [AB]: X\+(\d+), Y\+(\d+)/;
  }
  const matches = l.match(re);
  return [+matches[1], +matches[2]];
}).reduce((parts, part: Tuple, i) => {
  if (i % 3 === 0) {
    parts = [...parts, [] as any];
  }

  parts[parts.length - 1].push(part);

  return parts;
}, [] as Machine[]);

let presses: Tuple[] = [];
const MAX_PRESSES = 100;
while (input.length) {
  let [[ax, ay], [bx, by], [x, y]] = input.shift();

  for (let bPresses = 0; bPresses < MAX_PRESSES; bPresses++) {
    let dx = x - bx * bPresses;
    let dy = y - by * bPresses;

    if (
      dx % ax === 0 &&
      dy % ay === 0 &&
      dx / ax < MAX_PRESSES &&
      dy / ay < MAX_PRESSES &&
      dy / ay === dx / ax
    ) {
      presses.push([dx / ax, bPresses]);
      break;
    }
  }
}

console.log(presses.reduce((total, [a, b]) => total + a * 3 + b, 0));
