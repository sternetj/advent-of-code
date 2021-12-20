import { parseInput } from "../../util/parse-input";
import { cloneDeep } from "lodash";

type FishNum = Array<FishNum> | number;

const input: FishNum = parseInput((l) => JSON.parse(l), __dirname, "input.txt");

const add = (a: FishNum, b: FishNum): FishNum => {
  return [a, b];
};

const addToRegular = (
  num: FishNum,
  val: number,
  dir: "left" | "right",
  added = false
) => {
  if (typeof num === "number") return { v: num + val, added };

  let cAdded = added;

  const v = num.map((v, i) => {
    if (i === 0 && dir === "right" && !cAdded) {
      ({ v, added } = addToRegular(v, val, dir));
    } else if (i === num.length - 1 && dir === "left" && !cAdded) {
      ({ v, added } = addToRegular(v, val, dir));
    }

    cAdded = added || cAdded;

    return v;
  });

  return { v, added: cAdded };
};

const reduce = (val: FishNum, type = "explode", level = 0, reduced = false) => {
  // console.log(val, level);
  if (reduced) return { v: val, reduced };
  if (typeof val === "number") {
    if (val >= 10 && type === "split")
      return {
        v: [Math.floor(val / 2), val - Math.floor(val / 2)],
        reduced: true,
      };

    return { v: val };
  }
  if (level === 4) {
    if (type === "explode") {
      return { v: 0, left: val[0], right: val[1], reduced: true };
    }

    return { v: val };
  }

  let left, right;

  val.forEach((_, i, a) => {
    let {
      v,
      left: l,
      right: r,
      reduced: rd,
    } = reduce(val[i], type, level + 1, reduced);

    a[i] = v;

    if (l && i > 0) {
      val[0] = addToRegular(val[0], l, "left").v;
    } else if (l) {
      left = l;
    }

    if (r && i < val.length - 1) {
      val[val.length - 1] = addToRegular(val[val.length - 1], r, "right").v;
    } else if (r) {
      right = r;
    }

    reduced = reduced || rd;
  });

  return { v: val, left, right, reduced };
};

let prev = {};
let type = "explode";

const eq = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const calcMagnitude = (num: FishNum) => {
  if (typeof num === "number") return num;

  return 3 * calcMagnitude(num[0]) + 2 * calcMagnitude(num[1]);
};

let num = input[0];

input.slice(1).forEach((n) => {
  num = add(num, n);

  do {
    type = eq(num, prev) ? "split" : "explode";
    prev = cloneDeep(num);
    num = reduce(num, type).v;

    if (eq(num, prev) && type === "split") break;
  } while (true);
});

console.log(JSON.stringify(num));
console.log(calcMagnitude(num));
