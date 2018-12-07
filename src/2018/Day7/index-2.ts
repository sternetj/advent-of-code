import { flatten, uniq } from "lodash";
import { parseInput } from "../../util/parse-input";

let steps = parseInput(
  v => {
    const [_, first, second] = v.match(
      /Step (.) must be finished before step (.) can begin./
    );
    return [first, second];
  },
  __dirname,
  "input.txt"
);

const requirements: { [key: string]: Set<string> } = {};

steps.forEach(([required, step]) => {
  requirements[step] = requirements[step] || new Set();
  requirements[step].add(required);
});

let todo: string[] = uniq(flatten(steps)).sort();
let seconds = 0;
const maxWorkers = 5;
let workers = [];

while (todo.length) {
  for (let step of todo) {
    if (
      (!requirements[step] || requirements[step].size === 0) &&
      !workers.find(w => w.step === step) &&
      workers.length < maxWorkers
    ) {
      workers.push({
        step,
        remaining: 60 + step.charCodeAt(0) - 64
      });
    }
  }
  workers = workers.map(worker => ({
    ...worker,
    remaining: worker.remaining - 1
  }));
  const finishedWorkers = workers.filter(({ remaining }) => remaining === 0);
  workers = workers.filter(({ remaining }) => remaining > 0);

  for (let worker of finishedWorkers) {
    todo = todo.filter(s => s !== worker.step);
    Object.values(requirements).forEach(set => set.delete(worker.step));
  }

  seconds++;
}

console.log(seconds);
