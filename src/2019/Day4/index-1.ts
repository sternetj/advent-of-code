const lower = 168630;
const higher = 718098;

let matching = 0;

const hasDoubleDigit = (key: string) =>
  /(11|22|33|44|55|66|77|88|99|00)/.test(key);
const nextNumber = (num: number) => {
  const newNum = num
    .toString()
    .split("")
    .map(Number);

  newNum.forEach((v, i) => {
    const prev = +newNum[i - 1] ?? 0;
    newNum[i] = v < prev ? prev : v;
  });

  return +newNum.join("");
};

for (let i = nextNumber(lower); i <= higher; i = nextNumber(i)) {
  const numStr = i.toString();
  if (hasDoubleDigit(numStr)) {
    matching++;
  }

  i += 1;
}

console.log(matching);
