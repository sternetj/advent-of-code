import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => {
    const [mapLineRaw, groupsRaw] = l.split(" ");
    const mapLine = new Array(5).fill(mapLineRaw).join("?");
    const groups = new Array(5).fill(groupsRaw).join(",");
    const damageGroups = groups.split(",").map(Number);
    const damageTotal =
      damageGroups.reduce((t, v) => t + v, 0) -
      mapLine.split("").filter((v) => v === "#").length;
    const match = new RegExp(
      `^[.?]*${damageGroups.map((v) => `[#?]{${v}}`).join("[.?]+")}[.?]*$`
    );
    return { mapLine, damageTotal, match };
  },
  __dirname,
  process.env.INPUT
);

const subStr = (s: string, index: number, v: string) =>
  [s.slice(0, index), v, s.slice(index + 1)].join("");

const calculatePerms = (line: string, test: RegExp, total = 0, index = 0) => {
  if (total < 0) return 0;
  if (!line.match(test)) return 0;
  if (index >= line.length) return 1;
  if (line[index] !== "?") return calculatePerms(line, test, total, index + 1);

  return (
    calculatePerms(subStr(line, index, "."), test, total, index + 1) +
    calculatePerms(subStr(line, index, "#"), test, total - 1, index + 1)
  );
};

const totalDistances = input.reduce((total, line, index) => {
  console.log(Math.round(((index + 1) / input.length) * 100));
  return total + calculatePerms(line.mapLine, line.match, line.damageTotal);
}, 0);

console.log(totalDistances);
