import { parseString } from "../../util/parse-input";

const lines = parseString(__dirname, process.env.INPUT).split("\n");

const monkeys: Array<{
  id: number;
  items: Array<{ item: number; id: number }>;
  op: (v: number) => number;
  test: (v: number) => number;
  throwToOnTrue: number;
  throwToOnFalse: number;
  inspections: number;
  divisor: number;
}> = [];
let monkeyIndex = 0;
let itemId = 0;

lines.forEach((raw) => {
  const line = raw.trim();
  if (line.startsWith("Monkey")) {
    monkeyIndex = +line.split(" ")[1].split(":")[0];
    monkeys.push({ inspections: 0, id: monkeyIndex } as any);
  } else if (line.startsWith("Starting")) {
    const items = JSON.parse(`[${line.split(":")[1]}]`);
    monkeys[monkeyIndex].items = items.map((item) => ({ item, id: itemId++ }));
  } else if (line.startsWith("Operation")) {
    const op = line.split("= ")[1];
    monkeys[monkeyIndex].op = (v: number) => eval(op.replaceAll("old", `${v}`));
  } else if (line.startsWith("Test")) {
    const divisor = +line.split("by ")[1];
    monkeys[monkeyIndex].test = (v: number) => v % divisor;
    monkeys[monkeyIndex].divisor = divisor;
  } else if (line.startsWith("If true")) {
    const throwTo = +line.split("monkey ")[1];
    monkeys[monkeyIndex].throwToOnTrue = throwTo;
  } else if (line.startsWith("If false")) {
    const throwTo = +line.split("monkey ")[1];
    monkeys[monkeyIndex].throwToOnFalse = throwTo;
  }
});

const divisors = monkeys.map((m) => m.divisor);
const maxDivisor = Math.max(...divisors);
let lcm = maxDivisor;

while (!divisors.every((d) => lcm % d === 0)) {
  lcm += maxDivisor;
}

let round = 10000;
while (round-- > 0) {
  for (let m of monkeys) {
    while (m.items.length) {
      m.inspections++;
      let [{ item, id }] = m.items.splice(0, 1);
      item = m.op(item);

      item -= Math.floor(item / lcm) * lcm;

      const throwTo = m.test(item) === 0 ? m.throwToOnTrue : m.throwToOnFalse;
      monkeys[throwTo].items.push({ item, id });
    }
  }
}

const [m1, m2] = monkeys.sort((a, b) => b.inspections - a.inspections);

console.log(m1.inspections * m2.inspections);
