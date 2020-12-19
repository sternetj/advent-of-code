import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => {
    if (!v) return undefined;

    return v.split("").reduce((o, v) => ({ ...o, [v]: true }), {});
  },
  __dirname,
  "input.txt",
);

const claims = [];

input.forEach((row) => {
  if (!row) return claims.push({});

  const current = claims.pop();
  claims.push({
    ...current,
    ...row,
  });
});

const totalAnswers = claims.reduce(
  (total, groupAnswers) => total + Object.keys(groupAnswers).length,
  0,
);

console.log(totalAnswers);
