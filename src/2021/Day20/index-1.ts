import { parseInput } from "../../util/parse-input";
import { sum } from "lodash";

let [enhancer, ...origImage] = parseInput(
  (l) => l.split(""),
  __dirname,
  "input.txt"
);

const calcMins = (image: string[][]) => {
  let minR;
  let maxR;
  let minC;
  let maxC;
  image.forEach((row, r) => {
    row.forEach((v, c) => {
      if (v === "#") {
        maxR = Math.max(...[maxR, r].filter(isFinite));
        minR = Math.min(...[minR, r].filter(isFinite));
        minC = Math.min(...[minC, c].filter(isFinite));
        maxC = Math.max(...[maxC, c].filter(isFinite));
      }
    });
  });

  return { minR, maxR, minC, maxC };
};

const enhance = (image: string[][]) => {
  let imageT = new Array(image.length + 6).fill(0).map((_, i) => {
    return [".", ".", "."]
      .concat(...(image[i - 3] ?? new Array(image[0].length).fill(".")))
      .concat(".", ".", ".");
  });

  let { minR, maxR, minC, maxC } = calcMins(imageT);

  imageT = imageT.map((row, r) => {
    if (r < minR || r > maxR) return row;

    return row.map((v, c) => {
      if (c < minC || c > maxC) return v;

      const signal = [
        imageT[r - 1]?.[c - 1] === "#" ? 1 : 0,
        imageT[r - 1]?.[c] === "#" ? 1 : 0,
        imageT[r - 1]?.[c + 1] === "#" ? 1 : 0,
        imageT[r]?.[c - 1] === "#" ? 1 : 0,
        imageT[r]?.[c] === "#" ? 1 : 0,
        imageT[r]?.[c + 1] === "#" ? 1 : 0,
        imageT[r + 1]?.[c - 1] === "#" ? 1 : 0,
        imageT[r + 1]?.[c] === "#" ? 1 : 0,
        imageT[r + 1]?.[c + 1] === "#" ? 1 : 0,
      ].join("");

      const index = parseInt(signal, 2);

      const newVal = enhancer[index];

      // if (newVal === "#") {
      //   maxR = Math.max(...[maxR, r].filter(isFinite));
      //   minR = Math.min(...[minR, r].filter(isFinite));
      //   minC = Math.min(...[minC, c].filter(isFinite));
      //   maxC = Math.max(...[maxC, c].filter(isFinite));
      // }

      return newVal;
    });
  });

  // console.log(imageT.map((r) => r.join("")).join("\n") + "\n");

  return imageT; //.slice(minR, maxR + 1).map((row) => row.slice(minC, maxC + 1));
};

let times = 2;
while (times-- > 0) {
  origImage = enhance(origImage);
  console.log(origImage.map((r) => r.join("")).join("\n") + "\n");
}

// console.log(origImage.map((r) => r.join("")).join("\n"));

console.log(sum(origImage.flat().map((v) => (v === "#" ? 1 : 0))));

// 5306 correct
