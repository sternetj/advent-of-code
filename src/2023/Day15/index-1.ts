import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => l.split(","),
  __dirname,
  process.env.INPUT
).flat();

const hash = (str: string) =>
  str.split("").reduce((current, s) => {
    current += s.charCodeAt(0);
    current *= 17;
    return (current %= 256);
  }, 0);

console.log(input.reduce((t, str) => t + hash(str), 0));
