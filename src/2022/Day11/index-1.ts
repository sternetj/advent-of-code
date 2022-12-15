import { parseString } from "../../util/parse-input";

const lines = parseString(__dirname, process.env.INPUT).split("\n");

const monkeys: Array<{
  items: number[];
  op: (v: number) => number;
  test: (v: number) => boolean;
  throwToOnTrue: number;
  throwToOnFalse: number;
  inspections: number;
}> = [];
let monkeyIndex = 0;

lines.forEach((raw) => {
  const line = raw.trim();
  if (line.startsWith("Monkey")) {
    monkeyIndex = +line.split(" ")[1].split(":")[0];
    monkeys.push({ inspections: 0 } as any);
  } else if (line.startsWith("Starting")) {
    const items = JSON.parse(`[${line.split(":")[1]}]`);
    monkeys[monkeyIndex].items = items;
  } else if (line.startsWith("Operation")) {
    const op = line.split("= ")[1];
    monkeys[monkeyIndex].op = (v: number) => eval(op.replaceAll("old", `${v}`));
  } else if (line.startsWith("Test")) {
    const test = +line.split("by ")[1];
    monkeys[monkeyIndex].test = (v: number) => v % test === 0;
  } else if (line.startsWith("If true")) {
    const throwTo = +line.split("monkey ")[1];
    monkeys[monkeyIndex].throwToOnTrue = throwTo;
  } else if (line.startsWith("If false")) {
    const throwTo = +line.split("monkey ")[1];
    monkeys[monkeyIndex].throwToOnFalse = throwTo;
  }
});

let round = 20;
while (round-- > 0) {
  for (let m of monkeys) {
    while (m.items.length) {
      m.inspections++;
      let [item] = m.items.splice(0, 1);
      item = Math.floor(m.op(item) / 3);
      const throwTo = m.test(item) ? m.throwToOnTrue : m.throwToOnFalse;
      monkeys[throwTo].items.push(item);
    }
  }
}

const [m1, m2] = monkeys.sort((a, b) => b.inspections - a.inspections);

console.log(m1.inspections * m2.inspections);
