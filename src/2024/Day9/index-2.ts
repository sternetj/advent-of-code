import { parseInput } from "../../util/parse-input";

const [files, free] = parseInput((l) => l.split(""))[0].reduce(
  (parts, v, i) => [
    i % 2 === 0 ? [...parts[0], Number(v)] : parts[0],
    i % 2 === 1 ? [...parts[1], [Number(v), 0]] : parts[1],
  ],
  [[], []] as [number[], [number, number][]],
);

let total = 0;

for (let fileId = files.length - 1; fileId >= 0; fileId--) {
  if (files[fileId] === 0) continue;
  let freeIndex = free.findIndex(
    (freeSpace, i) => i < fileId && files[fileId] <= freeSpace[0],
  );

  const isMoving = freeIndex !== -1;
  freeIndex = isMoving ? freeIndex : fileId;

  const ptrIndex = freeIndex + (isMoving ? 1 : 0);
  let writePtr = files.slice(0, ptrIndex).reduce((t, file) => t + file, 0);
  writePtr += free
    .slice(0, ptrIndex)
    .reduce((t, free, i) => t + (freeIndex === i ? 0 : free[0]) + free[1], 0);

  free[freeIndex][0] -= files[fileId];
  free[freeIndex][1] += files[fileId];

  while (files[fileId] !== 0) {
    total += fileId * writePtr;
    files[fileId]--;
    writePtr++;
  }
}

console.log(total);
