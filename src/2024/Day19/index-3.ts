import { parseSections } from "../../util/parse-input";

const [[patterns], designs] = parseSections(
  (l) => l.split(", "),
  (l) => l,
);

const canBuildDesign = (design: string, patterns: string[]) => {
  if (design === "") return true;

  const options = patterns.filter((p) => design.startsWith(p));

  return options.some((option) =>
    canBuildDesign(design.slice(option.length), patterns),
  );
};

const calcNumWaysToCreate = (design: string, patterns: string[]) => {
  if (design === "") return 1;

  const options = patterns.filter((p) => design.startsWith(p));

  return options.reduce(
    (total, option) =>
      total + calcNumWaysToCreate(design.slice(option.length), patterns),
    0,
  );
};

const dedupedPatterns = patterns.filter(
  (p) =>
    !canBuildDesign(
      p,
      patterns.filter((p2) => p2 !== p),
    ),
);

console.log(
  designs
    .filter((d) => canBuildDesign(d, dedupedPatterns))
    .map((d, i, a) => {
      console.log(`${i + 1}/${a.length}`);
      return calcNumWaysToCreate(d, patterns);
    })
    .reduce((a, b) => a + b, 0),
);

// 11780197473273856 too high
