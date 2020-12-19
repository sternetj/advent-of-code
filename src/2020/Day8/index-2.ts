import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => {
    const [inst, val] = v.split(" ");
    return { inst, val: +val.replace("+", "") };
  },
  __dirname,
  "input.txt",
);

const execute = (instructions, ptr = 0, reg = 0, visited = {}) => {
  if (visited[ptr]) throw new Error("Infinite Loop Detected");
  if (ptr > instructions.length || ptr < 0) throw new Error("Out of bounds");
  if (ptr === instructions.length) return reg;

  visited[ptr] = true;
  const { inst, val } = instructions[ptr];

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

  return execute(instructions, ptr, reg, visited);
};

for (let i = 0; i < input.length; i++) {
  try {
    const { inst, val } = input[i];
    if (inst !== "acc") {
      const instructions = input.slice();
      instructions.splice(i, 1, {
        inst: inst === "jmp" ? "nop" : "jmp",
        val,
      });
      const res = execute(instructions);

      console.log(res);
      break;
    }
  } catch (error) {}
}
