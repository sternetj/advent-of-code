import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => {
    const [, min, max, char, password] = v.match(/(\d+)-(\d+) (.): (.*)/);

    return {
      min: Number(min),
      max: Number(max),
      char,
      password,
    };
  },
  __dirname,
  "input.txt",
);

const matching = input.filter(({ min, max, char, password }) => {
  const charRe = new RegExp(char, "g");
  const diff = password.length - password.replace(charRe, "").length;

  return diff >= min && diff <= max;
});

console.log(matching.length);
