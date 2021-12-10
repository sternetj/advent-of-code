import { parseInput } from "../../util/parse-input";
import { last } from "lodash";

const input = parseInput((l) => l.split(""), __dirname, "input.txt");

const toErrorScore = (char: string) => {
  return (
    {
      ")": 3,
      "]": 57,
      "}": 1197,
      ">": 25137,
    }[char] ?? 0
  );
};

const isClose = (c: string) => !!c.match(/[\]\}\>\)]/);
const invert = (c: string) =>
  ({
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  }[c]);

console.log(
  input.reduce((sum, line) => {
    const buf = [];
    const illegalChar = line.find((c) => {
      if (isClose(c)) {
        if (last(buf) !== invert(c)) return true;
        buf.pop();
      } else {
        buf.push(c);
      }
    });

    return sum + toErrorScore(illegalChar);
  }, 0)
);
