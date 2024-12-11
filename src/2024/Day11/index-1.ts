import { parseInput } from "../../util/parse-input";

let [map] = parseInput((l) => l.split(" ").map<number | number[]>(Number));

let blinks = 25;
while (blinks-- > 0) {
  for (let i = 0; i < map.length; i++) {
    const num = map[i];
    const sNum = `${num}`;
    if (num === 0) {
      map[i] = 1;
    } else if (sNum.length % 2 === 0) {
      const num1 = sNum.slice(0, sNum.length / 2);
      const num2 = sNum.slice(sNum.length / 2);
      map.splice(i, 1, [+num1, +num2]);
    } else if (typeof num === "number") {
      map[i] = num * 2024;
    }
  }

  map = map.flat();
}

console.log(map.length);
