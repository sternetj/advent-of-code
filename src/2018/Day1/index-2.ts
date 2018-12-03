import { parseInput } from '../../util/parse-input';

const input = parseInput(Number, __dirname, 'input-1.txt');

const found = {};
let currentFrequency = 0;
let frequencyChanges = [];

while (!found[currentFrequency]) {
  if (!frequencyChanges.length) {
    frequencyChanges = input.slice();
  }

  found[currentFrequency] = true;

  currentFrequency += frequencyChanges.shift();
}

console.log(currentFrequency);
