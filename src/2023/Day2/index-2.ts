import { parseInput } from "../../util/parse-input";
import { find } from "lodash";

const input = parseInput(
  (l) => {
    const gameNum = +l.split(":")[0].split(" ")[1];
    const draws = l
      .split(": ")[1]
      .split("; ")
      .map((r) =>
        r.split(", ").map((d) => ({
          num: +d.split(" ")[0],
          color: d.split(" ")[1],
        }))
      );

    return { gameNum, draws };
  },
  __dirname,
  process.env.INPUT
);

const gamePowers = input.map((g) => {
  const red = Math.max(
    ...g.draws.map((d) => d.find((v) => v.color === "red")?.num ?? 0)
  );
  const blue = Math.max(
    ...g.draws.map((d) => d.find((v) => v.color === "blue")?.num ?? 0)
  );
  const green = Math.max(
    ...g.draws.map((d) => d.find((v) => v.color === "green")?.num ?? 0)
  );

  return red * green * blue;
});

console.log(gamePowers.reduce((t, v) => t + v, 0));
