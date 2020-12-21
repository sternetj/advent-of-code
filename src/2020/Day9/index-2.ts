import { parseInput } from "../../util/parse-input";

const input = parseInput(Number, __dirname, "input.txt");

const invalidNum = 776203571; // From part 1

const extractWeakness = (
  arr: number[],
  total = 0,
  min = arr[0],
  max = arr[0],
) => {
  const [first, ...remaining] = arr.slice();
  const sum = total + first;
  max = Math.max(max, first);
  if (sum === invalidNum && total !== 0) {
    console.log(`min: ${min}, end: ${max}`);
    return min + max;
  }
  if (sum > invalidNum) return -1;

  return extractWeakness(remaining, sum, Math.min(min, first), max);
};

for (let i = 0; i < input.length; i++) {
  const weakness = extractWeakness(input.slice(i));
  if (weakness > -1) {
    console.log(weakness);
    break;
  }
}

//Guessed 75220633
