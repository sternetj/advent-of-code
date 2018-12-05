import { parseString } from "../../util/parse-input";

let input = parseString(__dirname, "input.txt");

function shouldReact(a, b) {
  return a !== b && a.toLowerCase() === b.toLowerCase();
}

for (let i = 0; i < input.length - 1; i++) {
  const n = input[i];
  const nPlusOne = input[i + 1];

  if (shouldReact(n, nPlusOne)) {
    input = input.slice(0, i) + input.slice(i + 2);
    i = Math.max(-1, i - 2);
  }
}

console.log(input.length);
