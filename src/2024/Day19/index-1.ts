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

const dedupedPatterns = patterns.filter(
  (p) =>
    !canBuildDesign(
      p,
      patterns.filter((p2) => p2 !== p),
    ),
);

console.log(designs.filter((d) => canBuildDesign(d, dedupedPatterns)).length);
