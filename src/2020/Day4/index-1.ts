import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (v) => {
    if (!v) return undefined;

    const matches = v.split(" ").map((v) => {
      const [, fieldId, value] = v.match(/(...):(\S+)/);

      return { [fieldId]: value };
    });

    return Object.assign({}, ...matches);
  },
  __dirname,
  "input.txt",
);

const passports = [];

input.forEach((row) => {
  if (!row) return passports.push({});

  const current = passports.pop();
  passports.push({
    ...current,
    ...row,
  });
});

const validPassports = passports.filter(
  (p) =>
    "byr" in p &&
    "iyr" in p &&
    "eyr" in p &&
    "hgt" in p &&
    "hcl" in p &&
    "ecl" in p &&
    "pid" in p,
);

console.log(validPassports.length);
