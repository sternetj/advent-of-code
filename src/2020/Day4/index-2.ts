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

const isValidByType = (id, val) => {
  switch (id) {
    case "byr": {
      return /^\d{4}$/.test(val) && +val >= 1920 && +val <= 2002;
    }
    case "iyr": {
      return /^\d{4}$/.test(val) && +val >= 2010 && +val <= 2020;
    }
    case "eyr": {
      return /^\d{4}$/.test(val) && +val >= 2020 && +val <= 2030;
    }
    case "hgt": {
      const [, height, unit] = val.match(/^(\d+)(cm|in)$/) || [];

      if (!height || !unit) return false;

      if (unit === "cm") return +height >= 150 && +height <= 193;
      if (unit === "in") return +height >= 59 && +height <= 76;

      return false;
    }
    case "hcl": {
      return /^#[0-9a-f]{6}$/.test(val);
    }
    case "ecl": {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val);
    }
    case "pid": {
      return /^\d{9}$/.test(val);
    }
    default:
      return true;
  }
};

const isValid = (passport) => {
  if (
    !passport["byr"] ||
    !passport["iyr"] ||
    !passport["eyr"] ||
    !passport["hgt"] ||
    !passport["hcl"] ||
    !passport["ecl"] ||
    !passport["pid"]
  )
    return false;

  return Object.entries(passport).every(([id, val]) => isValidByType(id, val));
};

const validPassports = passports.filter(isValid);

// console.log(validPassports);
console.log(validPassports.length);
