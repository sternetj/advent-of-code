import { parseInputSections } from "../../util/parse-input";

let [ranges] = parseInputSections([(l) => l.split("-").map(Number), Number]);

let totalRanges: number;
do {
  totalRanges = ranges.length;
  for (let aIndex = 0; aIndex < ranges.length; aIndex++) {
    const [aStart, aEnd] = ranges[aIndex];
    const bIndex = ranges.findIndex(
      ([bStart, bEnd], bIndex) =>
        bIndex > aIndex &&
        ((aStart <= bStart && bStart <= aEnd) ||
          (aStart <= bEnd && bEnd <= aEnd) ||
          (bStart <= aStart && aStart <= bEnd) ||
          (bStart <= aEnd && aEnd <= bEnd)),
    );

    if (ranges[bIndex]) {
      const [bStart, bEnd] = ranges[bIndex];
      const start = Math.min(aStart, bStart);
      const end = Math.max(aEnd, bEnd);
      ranges[aIndex] = [start, end];
      ranges.splice(bIndex, 1);
      break;
    }
  }
} while (ranges.length < totalRanges);
const result = ranges.reduce(
  (total, [start, end]) => total + (end - start) + 1,
  0,
);

console.log(result);
