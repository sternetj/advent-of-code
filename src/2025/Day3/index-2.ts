import { parseInput } from "../../util/parse-input";

const input = parseInput((l) => l.split("").map(Number));
const batteryCount = 12;

const result = input.reduce((total, line) => {
  let digits = new Array(batteryCount).fill(0);
  for (let i = 0; i < line.length; i++) {
    const digit = line[i];
    for (let digitIndex = 0; digitIndex < batteryCount; digitIndex++) {
      if (
        digit > digits[digitIndex] &&
        i + (batteryCount - digitIndex) <= line.length
      ) {
        digits[digitIndex] = digit;
        const removeCount = batteryCount - (digitIndex + 1);
        digits.splice(
          digitIndex + 1,
          removeCount,
          ...new Array(removeCount).fill(0),
        );
        break;
      }
    }
  }
  return total + Number(digits.join(""));
}, 0);

console.log(result);
