import { parseInput } from "../../util/parse-input";

const [duration, record] = parseInput(
  (v) => v.replaceAll(/\s+/g, "").split(":").slice(1).map(Number)[0],
  __dirname,
  process.env.INPUT
);

let waysToWin = 0;

for (let btnTime = 0; btnTime <= duration; btnTime++) {
  const remainingTime = duration - btnTime;
  if (remainingTime * btnTime > record) {
    waysToWin += 1;
  }
}

console.dir(waysToWin);
