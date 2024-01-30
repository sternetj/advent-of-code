import { parseInputWithBreaks } from "../../util/parse-input";

let groupId = 0;
const input = parseInputWithBreaks(
  (line) => {
    if (line === ("" as const)) {
      groupId++;
      return line;
    }
    if (groupId === 1) {
      return Object.fromEntries(
        line
          .slice(1, -1)
          .split(",")
          .map((v) => {
            const [variable, num] = v.split("=");
            return [variable, Number(num)];
          })
          .concat([
            ["groupId", 1],
            ["flow", "in"],
          ])
      );
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

          return (val: any) => {
            if (op === ">") {
              return val[variable] > Number(testVal) ? out : false;
            }

            return val[variable] < Number(testVal) ? out : false;
          };
        }

        return () => ruleRaw;
      });

    return { flow, rules, groupId };
  },
  __dirname,
  process.env.INPUT
);

const values = input.filter((v) => v.groupId === 1);
const flows = input.filter((v) => v.groupId === 0);

const toProcess = [...values];
const accepted = [];

while (toProcess.length) {
  const processing = toProcess.pop();
  const flow = flows.find((f) => f.flow === processing.flow);

  for (const rule of flow.rules) {
    const res = rule(processing);
    if (res) {
      processing.flow = res;

      if (res === "A") {
        accepted.push(processing);
      } else if (res !== "R") {
        toProcess.push(processing);
      }

      break;
    }
  }
}

console.log(accepted.reduce((t, v) => t + v.x + v.m + v.a + v.s, 0));
