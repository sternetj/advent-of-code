import { parseInput } from "../../util/parse-input";

const [files, free] = parseInput((l) => l.split(""))[0].reduce(
  (parts, v, i) => [
    i % 2 === 0 ? [...parts[0], Number(v)] : parts[0],
    i % 2 === 1 ? [...parts[1], Number(v)] : parts[1],
  ],
  [[], []] as [number[], number[]],
);

let total = 0;
let fileIndex = 0;
let freeIndex = 0;
let writePtr = 0;

while (fileIndex < files.length) {
  while (files[fileIndex] !== 0) {
    total += fileIndex * writePtr;
    files[fileIndex]--;
    writePtr++;
  }

  while (free[freeIndex] !== 0 && files.length > 0) {
    const fileId = files.length - 1;
    if (files[fileId] === 0) {
      files.pop();
    } else {
      total += fileId * writePtr;
      files[fileId]--;
      free[freeIndex]--;
      writePtr++;
    }
  }

  freeIndex++;
  fileIndex++;
}

console.log(total);
