import { parseString } from "../../util/parse-input";

const input = parseString(__dirname, process.env.INPUT).split("\n");

const containers: string[][] = [];
const moves = [];

input.forEach((line) => {
  if (line.startsWith("move")) {
    const [_, num, from, to] = line
      .match(/move (\d+) from (\d+) to (\d+)/)
      .map(Number);
    moves.push({ num, from, to });
  } else if (line.trim() !== "" && line[1] !== "1") {
    for (let i = 0, start = 1; start < line.length; i++, start += 4) {
      containers[i] = containers[i] ?? [];
      if (line[start].trim()) {
        containers[i].push(line[start]);
      }
    }
  }
});

moves.forEach(({ num, from, to }) => {
  const moving = containers[from - 1].splice(0, num);
  containers[to - 1].splice(0, 0, ...moving.reverse());
});

const topContainers = containers.map((row) => row[0]).join("");

console.log(topContainers);
