import { parseInputSections } from "../../util/parse-input";

const [ranges, ids] = parseInputSections([
  (l) => l.split("-").map(Number),
  (l) => Number(l),
]);

const result = ids.filter((id) =>
  ranges.some(([start, end]) => start <= id && id <= end),
).length;

console.log(result);
