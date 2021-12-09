import { parseInput } from "../../util/parse-input";
import { sum, intersection, difference } from "lodash";

const input = parseInput(
  (l) => {
    const [signals, output] = l.split("|").map((t) => t.trim());
    return {
      signals: signals.split(" ").map((v) => v.split("")),
      output: output.split(" ").map((v) => v.split("")),
    };
  },
  __dirname,
  "input.txt",
);

type SignalNotes = typeof input[number];

const diff = (a: any[], b: any[]) => difference(a, b).length;
const intsec = (a: any[], b: any[]) => intersection(a, b).length;

const computeOutputValue = (data: SignalNotes) => {
  const signals = data.signals;

  const one = signals.find((v) => v.length === 2);
  const seven = signals.find((v) => v.length === 3);
  const four = signals.find((v) => v.length === 4);
  const eight = signals.find((v) => v.length === 7);

  const sixSegmentNums = signals.filter((v) => v.length === 6);
  const fiveSegmentNums = signals.filter((v) => v.length === 5);

  const nine = sixSegmentNums.find((wire) => intsec(four, wire) === 4);

  const zero = sixSegmentNums.find(
    (wire) => wire !== nine && intsec(seven, wire) === 3,
  );

  const six = sixSegmentNums.find((wire) => wire !== nine && wire !== zero);

  const three = fiveSegmentNums.find((wire) => intsec(one, wire) === 2);

  const five = fiveSegmentNums.find((wire) => intsec(six, wire) === 5);

  const two = fiveSegmentNums.find((wire) => wire !== five && wire !== three);

  return +data.output
    .map((num) => {
      if (diff(num, zero) === 0 && diff(zero, num) === 0) return 0;
      if (diff(num, one) === 0 && diff(one, num) === 0) return 1;
      if (diff(num, two) === 0 && diff(two, num) === 0) return 2;
      if (diff(num, three) === 0 && diff(three, num) === 0) return 3;
      if (diff(num, four) === 0 && diff(four, num) === 0) return 4;
      if (diff(num, five) === 0 && diff(five, num) === 0) return 5;
      if (diff(num, six) === 0 && diff(six, num) === 0) return 6;
      if (diff(num, seven) === 0 && diff(seven, num) === 0) return 7;
      if (diff(num, eight) === 0 && diff(eight, num) === 0) return 8;

      return 9;
    })
    .join("");
};

console.log(sum(input.map(computeOutputValue)));
