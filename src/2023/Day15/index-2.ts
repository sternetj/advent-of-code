import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => l.split(","),
  __dirname,
  process.env.INPUT
).flat();

const hash = (str: string) =>
  str.split("").reduce((current, s) => {
    current += s.charCodeAt(0);
    current *= 17;
    return (current %= 256);
  }, 0);

const boxes: Record<number, string[]> = {};

for (const step of input) {
  const stepLen = step.length - 1;
  const splitAt = isFinite(+step[stepLen]) ? stepLen - 1 : stepLen;
  const label = step.slice(0, splitAt);
  const [op, lens] = step.slice(splitAt);
  const box = hash(label);
  const labelKey = `${label}|`;
  const id = `${labelKey}|${lens}`;

  boxes[box] ??= [];

  if (op === "=") {
    let found = false;
    boxes[box] = boxes[box].map((c) => {
      if (c.startsWith(labelKey)) {
        found = true;
        return id;
      }

      return c;
    });

    if (!found) {
      boxes[box].push(id);
    }
  } else {
    const index = boxes[box].findIndex((c) => c.startsWith(labelKey));
    if (index != -1) {
      boxes[box].splice(index, 1);
    }
  }
}

const focusingPower = Object.entries(boxes)
  .flatMap(([boxKey, seq]) => {
    const box = Number(boxKey);

    return seq?.map((seq, lensIndex) => {
      return Number(seq.split("||")[1]) * (lensIndex + 1) * (box + 1);
    });
  })
  .reduce((t, v) => t + v, 0);

console.log(focusingPower);
