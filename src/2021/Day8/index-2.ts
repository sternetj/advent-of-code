import { parseInput } from "../../util/parse-input";
import { intersection } from "lodash";

const input = parseInput(
  (l) => {
    const [signals, output] = l.split("|").map((t) => t.trim());
    return {
      signals: signals.split(" ").map((v) => v.split("").sort()),
      output: output.split(" ").map((v) => v.split("").sort()),
    };
  },
  __dirname,
  "test.txt"
);

type SignalNotes = typeof input[number];

const computeOutputValue = (data: SignalNotes) => {
  // 7 => 8
  // 5 => 5, 2, 3
  // 3 => 7
  // 6 => 9, 6, 0
  // 4 => 4
  // 2 => 1

  const signals = data.signals;

  const one = signals.find((v) => v.length === 2);
  const seven = signals.find((v) => v.length === 3);
  const four = signals.find((v) => v.length === 4);
  const eight = signals.find((v) => v.length === 7);

  const sixSegmentNums = signals.filter((v) => v.length === 6);
  const fiveSegmentNums = signals.filter((v) => v.length === 5);

  const six = sixSegmentNums.find(
    (wire) => intersection(one, wire).length === 1
  );

  const zero = sixSegmentNums.find(
    (wire) => intersection(four, wire).length === 3
  );

  const nine = sixSegmentNums.find(
    (wire) => wire.join("") !== zero.join("") && wire.join("") !== six.join("")
  );

  const three = fiveSegmentNums.find(
    (wire) => intersection(one, wire).length === 2
  );

  const five = fiveSegmentNums.find(
    (wire) => intersection(six, wire).length === 5
  );

  const two = fiveSegmentNums.find((wire) => wire !== five && wire !== three);

  console.log(zero);
  console.log(one);
  console.log(two);
  console.log(three);
  console.log(four);
  console.log(five);
  console.log(six);
  console.log(seven);
  console.log(eight);
  console.log(nine);

  return data.output
    .map((v) => {
      const num = v.join("");
      if (num === zero.join("")) return 0;
      if (num === one.join("")) return 1;
      if (num === two.join("")) return 2;
      if (num === three.join("")) return 3;
      if (num === four.join("")) return 4;
      if (num === five.join("")) return 5;
      if (num === six.join("")) return 6;
      if (num === seven.join("")) return 7;
      if (num === eight.join("")) return 8;
      if (num === nine.join("")) return 9;

      console.log(num);

      return "X";
    })
    .join("");
};

// console.log(sum(input.map(computeOutputValue)));
console.log(input.slice(1, 2).map(computeOutputValue));
