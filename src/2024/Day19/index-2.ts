import { parseSections } from "../../util/parse-input";

const [[patterns], designs] = parseSections(
  (l) => l.split(", "),
  (l) => l,
);

const calcNumWaysToCreate = (
  design: string,
  patterns: string[],
  duped: Record<string, number> = {},
) => {
  if (design === "") return 1;

  const options = patterns.filter((p) => design.startsWith(p));

  return options.reduce(
    (sum, option) =>
      sum +
      (duped[option] ?? 1) *
        calcNumWaysToCreate(design.slice(option.length), patterns, duped),
    0,
  );
};

const dedupedPatterns = patterns.filter(
  (p) =>
    calcNumWaysToCreate(
      p,
      patterns.filter((p2) => p2 !== p),
    ) === 0,
);

const duped = Object.fromEntries(
  patterns.map((p) => [p, calcNumWaysToCreate(p, patterns)]),
);

console.log(duped);

console.log(
  designs.reduce(
    (total, d) => total + calcNumWaysToCreate(d, dedupedPatterns, duped),
    0,
  ),
);
