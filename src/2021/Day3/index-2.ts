import { parseString } from "../../util/parse-input";

const input = parseString(__dirname, "input.txt").split("\n").sort();

// console.log(input.sort().join("\n"));

type isSignificantFunc = (index: number, input: string[]) => boolean
const doIt = (data: string[], isSignificant: isSignificantFunc, index = 0): string => {
  if (index > data[0]?.length || data.length === 1) return data[0];

  const i = data.findIndex(l => l[index] === "1");
  if (isSignificant(i, data)) {
    return doIt(data.slice(i), isSignificant, index + 1);
  } else {
    return doIt(data.slice(0, i), isSignificant, index + 1);
  }
}

const oxygen = parseInt(doIt(input, (index, data) => index <= data.length/2), 2);
const co2 = parseInt(doIt(input, (index, data) => index > data.length/2), 2);

console.log(oxygen);
console.log(co2);
console.log(co2 * oxygen);
