import { parseInputWithBreaks } from "../../util/parse-input";
import uniq from "lodash/uniq";

let groupId = 0;
let input = parseInputWithBreaks(
  (line) => {
    if (line === ("" as const)) {
      groupId++;
      return line;
    }
    if (groupId === 1) {
      return { rules: [] };
    }

    const [flow, rulesRaw] = line.split("{");
    const rules = rulesRaw
      .slice(0, -1)
      .split(",")
      .map((ruleRaw) => {
        if (ruleRaw.includes(":")) {
          const [variable, op, testVal, out] = ruleRaw
            .match(/^(.*)([><])(\d+):(.*)$/)
            .slice(1);

          return { variable, op, testVal: +testVal, out };
        }

        return { out: ruleRaw };
      });

    return { flow, rules };
  },
  __dirname,
  process.env.INPUT
);

input = input.filter((i) => i.flow);

const reduceFlows = () => {
  let terminators = {};
  console.dir(input, { depth: 5 });
  input.forEach((flow) => {
    while (true) {
      const lastRule = flow.rules[flow.rules.length - 1];
      const prevRule = flow.rules[flow.rules.length - 2];

      if (prevRule && prevRule.out === lastRule.out) {
        flow.rules.splice(flow.rules.length - 2, 1);
      } else {
        if (flow.rules.length === 1) {
          terminators[flow.flow] = lastRule.out;
        }
        break;
      }
    }
  });

  input = input
    .map((flow) => {
      return {
        ...flow,
        rules: flow.rules.map((rule) => {
          if (terminators[rule.out]) {
            return { ...rule, out: terminators[rule.out] };
          }

          return rule;
        }),
      };
    })
    .filter((flow) => !terminators[flow.flow]);

  console.log(terminators);

  if (Object.keys(terminators).length) {
    reduceFlows();
  }
};

reduceFlows();

const getPaths = (start: string): string[] => {
  if (start === "A" || start === "R") return [start];

  const flow = input.find((f) => f.flow === start);

  return flow.rules.flatMap((r) => {
    const paths = getPaths(r.out);

    return paths.map((p) => `${start} -> ${p}`);
  });
};

const viablePaths = uniq(getPaths("in").filter((path) => path.endsWith("A")));
// const viablePaths = getPaths("in").filter((path) => path.endsWith("A"));
let allExtremes: {
  minX: number;
  maxX: number;
  minM: number;
  maxM: number;
  minA: number;
  maxA: number;
  minS: number;
  maxS: number;
}[] = [];

viablePaths.forEach((path) => {
  const parts = path.split(" -> ");
  let extremes = {
    minX: 1,
    maxX: 4000,
    minM: 1,
    maxM: 4000,
    minA: 1,
    maxA: 4000,
    minS: 1,
    maxS: 4000,
  };

  console.log(parts);
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    const flow = input.find((f) => f.flow === part);
    const ruleIndex = flow.rules.findIndex((r) => r.out === nextPart);

    let rules = flow.rules.slice(0, ruleIndex + 1).map((rule, i) => ({
      ...rule,
      op: !rule.op || i === ruleIndex ? rule.op : rule.op === ">" ? "<=" : ">=",
    }));

    console.log(rules);

    for (const rule of rules) {
      const varId = rule.variable?.toUpperCase() ?? "";
      const shift = rule.op?.includes("=") ? 0 : 1;
      if (rule.op?.startsWith("<")) {
        extremes[`max${varId}`] = Math.min(
          extremes[`max${varId}`],
          rule.testVal - shift
        );
      } else if (rule.op?.startsWith(">")) {
        extremes[`min${varId}`] = Math.max(
          extremes[`min${varId}`],
          rule.testVal + shift
        );
      }
    }
    console.log(extremes);
  }

  allExtremes.push(extremes);
});

console.log(viablePaths);
console.log(allExtremes);

let skips = {};
const dedupedExtremes = allExtremes.map((e, i) => {
  const nextE = allExtremes[i + 1];
  if (!nextE || skips[i])
    return skips[i]
      ? {
          minX: 0,
          maxX: 0,
          minM: 0,
          maxM: 0,
          minA: 0,
          maxA: 0,
          minS: 0,
          maxS: 0,
        }
      : e;

  for (let nextI = i + 1; nextI < allExtremes.length; nextI++) {
    const nextE = allExtremes[nextI];
    if (
      Math.max(e.minX, nextE.minX) <= Math.min(e.maxX, nextE.maxX) &&
      Math.max(e.minM, nextE.minM) <= Math.min(e.maxM, nextE.maxM) &&
      Math.max(e.minA, nextE.minA) <= Math.min(e.maxA, nextE.maxA) &&
      Math.max(e.minS, nextE.minS) <= Math.min(e.maxS, nextE.maxS)
    ) {
      skips[nextI] = true;

      e = {
        minX: Math.min(e.minX, nextE.minX),
        maxX: Math.max(e.maxX, nextE.maxX),
        minM: Math.min(e.minM, nextE.minM),
        maxM: Math.max(e.maxM, nextE.maxM),
        minA: Math.min(e.minA, nextE.minA),
        maxA: Math.max(e.maxA, nextE.maxA),
        minS: Math.min(e.minS, nextE.minS),
        maxS: Math.max(e.maxS, nextE.maxS),
      };
    }
  }

  return e;
});

const res = allExtremes.reduce(
  (totalPaths, e) =>
    totalPaths +
    (e.maxX - e.minX + 1) *
      (e.maxM - e.minM + 1) *
      (e.maxA - e.minA + 1) *
      (e.maxS - e.minS + 1),
  0
);

// console.log(match);
// console.log("========================");
// console.log(allExtremes);
console.log(res);
// console.log(dedupedExtremes);

// console.log(viablePaths);
// console.log(uniq(viablePaths));

// Too low: 108943030712742
