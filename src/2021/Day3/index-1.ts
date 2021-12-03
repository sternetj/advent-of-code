import { parseInput } from "../../util/parse-input";

const input = parseInput(l => l.split("").map(Number), __dirname, "input.txt");

let counts = input[0].slice().fill(0);

input.forEach((row) => {
  row.forEach((cell, index) => {
    counts[index] += cell;
  })
});

const final = counts.map(v => v > input.length/2 ? 1 : 0);
const gamma = parseInt(final.join(""), 2);
const epsilon = parseInt(final.map(v => v ? 0 : 1).join(""), 2);

console.log(gamma * epsilon);
