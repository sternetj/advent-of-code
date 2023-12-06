import { parseInput } from "../../util/parse-input";

const [time, distance] = parseInput(
  (v) => v.split(/\s+/).slice(1).map(Number),
  __dirname,
  process.env.INPUT
);

const result = time.reduce((total, duration, index) => {
  const record = distance[index];
  let waysToWin = 0;

  for (let btnTime = 0; btnTime <= duration; btnTime++) {
    const remainingTime = duration - btnTime;
    if (remainingTime * btnTime > record) {
      waysToWin += 1;
    }
  }

  return total * waysToWin;
}, 1);

console.dir(result);
