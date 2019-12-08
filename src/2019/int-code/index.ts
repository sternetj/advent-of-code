type OpCode =
  | "add"
  | "multiply"
  | "input"
  | "output"
  | "jumpIfTrue"
  | "jumpIfFalse"
  | "lessThan"
  | "equals"
  | "exit";

const parseInstruction = (val: number) => {
  const instruction = val.toString().padStart(5, "0");
  const modes = instruction
    .slice(0, 3)
    .split("")
    .map(Number)
    .reverse();

  const code: OpCode =
    {
      1: "add",
      2: "multiply",
      3: "input",
      4: "output",
      5: "jumpIfTrue",
      6: "jumpIfFalse",
      7: "lessThan",
      8: "equals",
      99: "exit",
    }[+instruction.slice(3, 5)] || "exit";

  return {
    code,
    modes,
  };
};

export const computeIntCode = (memory: number[], input?: number) => {
  let increaseBy = 4;
  let out = input;

  for (let i = 0; i < memory.length; i += increaseBy) {
    const instruction = parseInstruction(memory[i]);
    const reg = memory.slice(i + 1, i + 4);
    const val = reg.map((reg, i) =>
      instruction.modes[i] === 1 ? reg : memory[reg],
    );

    switch (instruction.code) {
      case "add":
        memory[reg[2]] = val[0] + val[1];
        increaseBy = 4;
        break;
      case "multiply":
        memory[reg[2]] = val[0] * val[1];
        increaseBy = 4;
        break;
      case "input":
        memory[reg[0]] = out;
        increaseBy = 2;
        continue;
      case "output":
        out = val[0];
        increaseBy = 2;
        continue;
      case "jumpIfTrue":
        increaseBy = 3;
        if (val[0]) {
          i = val[1];
          increaseBy = 0;
        }
        continue;
      case "jumpIfFalse":
        increaseBy = 3;
        if (!val[0]) {
          i = val[1];
          increaseBy = 0;
        }
        continue;
      case "lessThan":
        memory[reg[2]] = val[0] < val[1] ? 1 : 0;
        increaseBy = 4;
        continue;
      case "equals":
        memory[reg[2]] = val[0] === val[1] ? 1 : 0;
        increaseBy = 4;
        continue;
      case "exit":
        return out !== undefined ? out : memory[0];
    }
  }

  return out !== undefined ? out : memory[0];
};
