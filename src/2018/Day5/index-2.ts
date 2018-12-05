import { parseString } from "../../util/parse-input";

const input = parseString(__dirname, "input.txt");

function shouldReact(a, b) {
  return a !== b && a.toLowerCase() === b.toLowerCase();
}
let units = "abcdefghijklmnopqrstuvwxyz".split("");
let smallestLength = input.length;

for (let unit of units) {
  let polymer = input.slice();
  polymer = polymer.replace(new RegExp(unit, "gi"), "");

  for (let i = 0; i < polymer.length - 1; i++) {
    const n = polymer[i];
    const nPlusOne = polymer[i + 1];

    if (shouldReact(n, nPlusOne)) {
      polymer = polymer.slice(0, i) + polymer.slice(i + 2);
      i = Math.max(-1, i - 2);
    }
  }

  smallestLength = Math.min(polymer.length, smallestLength);
}

console.log(smallestLength);
