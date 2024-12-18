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
let i = 0;
while (input.length) {
  let [[s, u], [t, v], [X, Y]] = input.shift();

  X += 10000000000000;
  Y += 10000000000000;

  const a = (v * X - t * Y) / (s * v - t * u);
  const b = (u * X - s * Y) / (t * u - s * v);

  if (a % 1 === 0 && b % 1 === 0) {
    presses.push([a, b]);
  }
  i++;
}

console.log(presses.reduce((total, [a, b]) => total + a * 3 + b, 0));
