import { parseInput } from "../../util/parse-input";
import { last } from "lodash";

const input = parseInput((l) => l.split(""), __dirname, "input.txt");

const toCharScore = (char: string) => {
  return (
    {
      ")": 1,
      "]": 2,
      "}": 3,
      ">": 4,
    }[char] ?? 0
  );
};

const toAutoCompleteScore = (chars: string[]) =>
  chars.reduce((t, c) => 5 * t + toCharScore(c), 0);

const isClose = (c: string) => !!c.match(/[\]\}\>\)]/);
const invert = (c: string) =>
  ({
    ")": "(",
    "(": ")",
    "]": "[",
    "[": "]",
    "}": "{",
    "{": "}",
    ">": "<",
    "<": ">",
  }[c]);

const output = input
  .map((line) => {
    const buf = [];

    for (const c of line) {
      if (isClose(c)) {
        if (last(buf) !== invert(c)) return undefined;
        buf.pop();
      } else {
        buf.push(c);
      }
    }

    return toAutoCompleteScore(buf.reverse().map(invert));
  })
  .filter((score) => isFinite(score))
  .sort((a, b) => a - b);

console.log(output[(output.length - 1) / 2]);
