import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split(""));

const isXmas = (x: number, y: number) => {
  const ct = input[x]?.[y];
  const tl = input[x - 1]?.[y - 1];
  const tr = input[x + 1]?.[y - 1];
  const bl = input[x - 1]?.[y + 1];
  const br = input[x + 1]?.[y + 1];

  const w1 = [tl, br].sort().join("");
  const w2 = [tr, bl].sort().join("");

  return ct === "A" && w1 === "MS" && w2 === "MS";
};

let total = 0;
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    total += isXmas(x, y) ? 1 : 0;
  }
}

console.log(total);
