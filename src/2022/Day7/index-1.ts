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

let t = 0;
const calcFolderSize = (dir) => {
  if (isFinite(dir)) return dir;

  const total = Object.entries(dir).reduce((total, [name, folder]) => {
    if (name === "..") return total;

    return total + calcFolderSize(folder);
  }, 0);

  if (total <= 100000) {
    t += total;
  }

  return total;
};

calcFolderSize(fs);

console.log(t);
