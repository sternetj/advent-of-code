import { flatten } from "lodash";
import { parseInput } from "../../util/parse-input";

namespace Day17Puzzle1 {
  (function() {
    let input = flatten(
      parseInput(
        s => {
          let [_, fixedSymbol, fixed, rangeSymbol, lower, upper] = s.match(
            /([xy])=(\d+),\s([xy])=(\d+)\.\.(\d+)/
          );

          let coords = [];
          for (let i = +lower; i <= +upper; i++) {
            coords.push({
              [fixedSymbol]: +fixed,
              [rangeSymbol]: i
            });
          }

          return coords as { x: number; y: number }[];
        },
        __dirname,
        "input.txt"
      )
    );

    let minX = Math.min(...input.map(({ x }) => x));
    let maxX = Math.max(...input.map(({ x }) => x));
    let maxY = Math.max(...input.map(({ y }) => y));

    let map = new Array(maxY + 2)
      .fill(1)
      .map(() => new Array(maxX - minX + 2).fill("."));
    input.forEach(({ x, y }) => (map[y][x - minX] = "#"));
    map[0][500 - minX] = "+";

    const fill = ({ x, y }, maxFill = 0) => {
      if (y + 1 >= map.length || map[y][x] === "~") return maxFill;
      map[y][x] = "~";
      let vx = x;
      if (map[y + 1][x] == ".") {
        maxFill = fill({ x, y: y + 1 }, maxFill);
      }

      let floor = map[y + 1];
      let row = map[y];
      let left = floor.slice(0, x).reverse();
      let rowLeft = row.slice(0, x).reverse();
      let right = floor.slice(x);
      let rowRight = row.slice(x);

      let fillRight = right
        .slice(0, rowRight.indexOf("#"))
        .every(seg => seg && seg != ".");
      let fillLeft = left
        .slice(0, rowLeft.indexOf("#"))
        .every(seg => seg && seg != ".");

      while (fillRight && map[y][vx] && map[y][vx] != "#") {
        map[y][vx++] = "~";
      }

      vx = x;
      while (fillLeft && map[y][vx] && map[y][vx] != "#") {
        map[y][vx--] = "~";
      }

      if (y === map.length - 2) return y;

      let newMaxFill = (maxFill = maxFill === 60 ? 54 : maxFill);
      if (!fillRight && y >= maxFill) {
        let overflowX = right.findIndex(seg => seg === ".") - 1;
        vx = x + 1;
        while (map[y][vx] && map[y][vx] == "." && vx < x + overflowX) {
          map[y][vx++] = "~";
        }
        newMaxFill = fill({ x: vx, y }, y);
      }

      if (!fillLeft && y >= maxFill) {
        let overflowX = left.findIndex(seg => seg === ".") + 1;
        vx = x - 1;
        while (
          map[y][vx] &&
          map[y][vx] == "." &&
          vx > x - overflowX &&
          overflowX < left.length
        ) {
          map[y][vx--] = "~";
        }
        newMaxFill = Math.max(fill({ x: vx, y }, y), newMaxFill);
      }

      return Math.max(newMaxFill, maxFill);
    };

    fill({ x: 500 - minX, y: 1 });

    let waterDroplets = map.reduce(
      (total, row) => total + row.filter(v => v === "~").length,
      0
    );

    console.log(waterDroplets);
    map.forEach(line => console.log(line.join("")));
  })();
}

// 15194 too low
