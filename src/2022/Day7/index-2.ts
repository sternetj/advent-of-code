import { parseInput } from "../../util/parse-input";

const log = parseInput((v) => v, __dirname, process.env.INPUT);

const fs = {};
let wd = fs;

log.forEach((line) => {
  if (line === "$ cd /") {
    wd = fs;
  } else if (line.startsWith("$ cd")) {
    const dir = line.slice(5);
    const parent = wd;
    wd = wd[dir] = wd[dir] || {};
    wd[".."] = wd[".."] || parent;
  } else if (line.match(/\d+/)) {
    const [size, name] = line.split(" ");
    wd[name] = +size;
  }
});

const calcFolderSize = (dir): number => {
  if (isFinite(dir)) return dir;

  return Object.entries(dir).reduce((total, [name, folder]) => {
    if (name === "..") return total;

    return total + calcFolderSize(folder);
  }, 0);
};

const total = 70000000;
const used = calcFolderSize(fs);
const free = total - used;
const needed = 30000000 - free;

const findMinResourceToDelete = (dir) => {
  const size = calcFolderSize(dir);

  if (size < needed) return Infinity;

  return Math.min(
    size,
    ...Object.entries(dir).map(([name, folder]) => {
      if (name === ".." || isFinite(+folder)) return Infinity;

      return findMinResourceToDelete(folder);
    })
  );
};

const deletedSize = findMinResourceToDelete(fs);

console.log(deletedSize);
