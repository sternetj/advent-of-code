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

const getErrorIndex = (print: number[]) =>
  print.findIndex((value, i) => {
    const restrictions = map[value] ?? [];
    return !restrictions.every(
      (restriction) => !print.slice(0, i).includes(restriction),
    );
  });

const isValid = (print: number[]) => getErrorIndex(print) === -1;

const invalidPrints = toPrint.filter((print) => !isValid(print));

const fixedPrints = invalidPrints.map((print) => {
  while (!isValid(print)) {
    const errorIndex = getErrorIndex(print);
    var b = print[errorIndex - 1];
    print[errorIndex - 1] = print[errorIndex];
    print[errorIndex] = b;
  }

  return print;
});

console.log(
  fixedPrints.reduce((t, print) => t + print[(print.length - 1) / 2], 0),
);
