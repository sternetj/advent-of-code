import { parseSections } from "../../util/parse-input";

const [registers, [program]] = parseSections(
  (l) => Number(l.split(" ")[2]),
  (l) => l.split(" ")[1].split(",").map(Number),
);

let a = registers[0];
let b = registers[1];
let c = registers[2];

const combo = (operand: number) => {
  if (operand <= 3) return operand;
  if (operand === 4) return a;
  if (operand === 5) return b;
  if (operand === 6) return c;
  throw new Error(`Invalid operand: ${operand}`);
};

let pointer = 0;
let out = [];
while (pointer < program.length) {
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

console.log(a, b, c);
console.log(out.join(","));
