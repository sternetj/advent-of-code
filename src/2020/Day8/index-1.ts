import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => {
    const [inst, val] = v.split(" ");
    return { inst, val: +val.replace("+", "") };
  },
  __dirname,
  "input.txt",
);

const visited = {};
let ptr = 0;
let reg = 0;

while (!visited[ptr]) {
  visited[ptr] = true;
  const { inst, val } = input[ptr];

  switch (inst) {
    case "jmp":
      ptr += val;
      break;
    case "acc":
      reg += val;
    case "nop":
      ptr++;
      break;
  }
}

console.log(reg);
