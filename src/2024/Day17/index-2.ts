import { parseSections } from "../../util/parse-input";

const [registers, [program]] = parseSections(
  (l) => Number(l.split(" ")[2]),
  (l) => l.split(" ")[1].split(",").map(Number),
);

let bPrime = registers[1];
let cPrime = registers[2];

const cached = {};
const produceOutput = (
  a: number,
  b: number,
  c: number,
  program: number[],
  shouldHalt: (out: string) => boolean,
) => {
  const combo = (operand: number) => {
    if (operand <= 3) return operand;
    if (operand === 4) return a;
    if (operand === 5) return b;
    if (operand === 6) return c;
    throw new Error(`Invalid operand: ${operand}`);
  };

  let pointer = 0;
  let out = [];
  let toCache = [];
  while (pointer < program.length) {
    if (shouldHalt(out.join(","))) {
      break;
    }

    // console.log(a, b, c, pointer);
    if (cached[`${a}|${b}|${c}|${pointer}`]?.length) {
      // console.log(cached);
      return cached[`${a}|${b}|${c}|${pointer}`];
    }

    toCache.push(`${a}|${b}|${c}|${pointer}`);

    const instruction = program[pointer];
    const operand = program[pointer + 1];

    switch (instruction) {
      case 0: {
        // adv
        a = Math.floor(a / 2 ** combo(operand));
        break;
      }
      case 1: {
        // bxl
        b ^= operand;
        break;
      }
      case 2: {
        // bst
        b = combo(operand) % 8;
        break;
      }
      case 3: {
        // jnz
        if (a !== 0) pointer = operand - 2;
        break;
      }
      case 4: {
        // bxc
        b ^= c;
        break;
      }
      case 5: {
        // out
        out.push(combo(operand) % 8);
        break;
      }
      case 6: {
        // bdv
        b = Math.floor(a / 2 ** combo(operand));
        break;
      }
      case 7: {
        // cdv
        c = Math.floor(a / 2 ** combo(operand));
        break;
      }
      default: {
        throw new Error(`Invalid instruction: ${instruction}`);
      }
    }

    pointer += 2;
  }

  const res = out.join(",");

  toCache.forEach((key) => {
    cached[key] = res;
  });

  return res;
};

// console.log(produceOutput(0, 0, 0, program, () => false));

let a = 0;
const expected = program.join(",");
let last = 0;
while (true) {
  let output = produceOutput(a++, bPrime, cPrime, program, (out) => {
    return out.length && !expected.startsWith(out);
  });
  if (expected === output) {
    a--;
    break;
  }
  if (output.length > 2) {
    console.log(a - 1, a - 1 - last, output);
    last = a - 1;
  }
}

console.log(a);
