import { parseSections } from "../../util/parse-input";

const [orderingRules, toPrint] = parseSections(
  (l) => l.split("|").map(Number),
  (l) => l.split(",").map(Number),
);

const map: Record<number, number[]> = {};
orderingRules.forEach(([a, b]) => {
  map[a] ??= [];
  map[a].push(b);
});

const validPrints = toPrint.filter((print) => {
  return print.every((value, i) => {
    const restrictions = map[value] ?? [];
    return restrictions.every(
      (restriction) => !print.slice(0, i).includes(restriction),
    );
  });
});

console.log(
  validPrints.reduce((t, print) => t + print[(print.length - 1) / 2], 0),
);
