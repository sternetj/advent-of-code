import { parseInput } from "../../util/parse-input";

const re = /([0-9]|one|two|three|four|five|six|seven|eight|nine|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/i;

const values = {
  "zero": "0",
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
}

const sub = (v: string) => values[v.toLowerCase()] ?? values[v.split("").reverse().join("").toLowerCase()] ?? v;

const input = parseInput((l) => {
  const [first] = l.match(re);
  const [last] = l.split("").reverse().join("").match(re);
  return Number(sub(first)+sub(last));
},__dirname, process.env.INPUT);

console.log(input.reduce((t, v) => t + v, 0));
