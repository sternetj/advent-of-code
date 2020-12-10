import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => {
    const [, pos1, pos2, char, password] = v.match(/(\d+)-(\d+) (.): (.*)/);

    return {
      pos1: Number(pos1) - 1,
      pos2: Number(pos2) - 1,
      char,
      password,
    };
  },
  __dirname,
  "input.txt",
);

const matching = input.filter(({ pos1, pos2, char, password }) => {
  return (
    (password[pos1] === char && password[pos2] !== char) ||
    (password[pos2] === char && password[pos1] !== char)
  );
});

console.log(matching.length);
