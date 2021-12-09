import { parseInput } from "../../util/parse-input";
import { sum } from "lodash";

const input = parseInput(
  (l) => {
    const [signals, output] = l.split("|").map((t) => t.trim());
    return {
      signals: signals.split(" "),
      output: output.split(" "),
    };
  },
  __dirname,
  "input.txt"
);

console.log(
  sum(
    input
      .map(({ output }) =>
        output.map((v) =>
          v.length === 2 || v.length === 4 || v.length === 3 || v.length === 7
            ? 1
            : 0
        )
      )
      .flat()
  )
);
