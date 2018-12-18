import { compact } from "lodash";
import { parseInput } from "../../util/parse-input";

namespace Day18Puzzle1 {
  enum Contents {
    Empty = ".",
    Lumberyard = "#",
    Wooded = "|"
  }
  (function() {
    let field = parseInput(
      s =>
        s
          .trim()
          .split("")
          .map(v => v as Contents),
      __dirname,
      "input.txt"
    );

    let maxMinutes = 1000000000;
    let minutes = 0;

    const getSurrounding = (x, y, field: Contents[][]) => {
      let above = field[y - 1] || [];
      let below = field[y + 1] || [];
      let surroundedBy = compact([
        above[x - 1],
        above[x],
        above[x + 1],
        field[y][x - 1],
        field[y][x + 1],
        below[x - 1],
        below[x],
        below[x + 1]
      ]);

      return {
        empty: surroundedBy.filter(v => v === Contents.Empty),
        lumberyards: surroundedBy.filter(v => v === Contents.Lumberyard),
        woods: surroundedBy.filter(v => v === Contents.Wooded)
      };
    };

    const getResourceValue = field => {
      let lumberyards = field.reduce(
        (total, row) =>
          total + row.filter(c => c === Contents.Lumberyard).length,
        0
      );
      let woods = field.reduce(
        (total, row) => total + row.filter(c => c === Contents.Wooded).length,
        0
      );

      return lumberyards * woods;
    };

    const fieldToString = field => {
      return field.reduce((str, row) => str + row.join(""), "");
    };

    let resourceValues = {};

    while (minutes++ < maxMinutes) {
      let newField = field.slice().map(arr => arr.slice());
      field.forEach((row, y) => {
        row.forEach((acre, x) => {
          let surroundBy = getSurrounding(x, y, field);

          switch (acre) {
            case Contents.Empty:
              newField[y][x] =
                surroundBy.woods.length >= 3 ? Contents.Wooded : Contents.Empty;
              break;
            case Contents.Wooded:
              newField[y][x] =
                surroundBy.lumberyards.length >= 3
                  ? Contents.Lumberyard
                  : Contents.Wooded;
              break;
            case Contents.Lumberyard:
              newField[y][x] =
                surroundBy.lumberyards.length && surroundBy.woods.length
                  ? Contents.Lumberyard
                  : Contents.Empty;
              break;
          }
        });
      });

      field = newField;
      let value = fieldToString(field);
      if (resourceValues[value]) {
        let firstRepeatAt = resourceValues[value];
        let cycleLength = minutes - firstRepeatAt;
        minutes +=
          Math.floor((maxMinutes - minutes) / cycleLength) * cycleLength;
        resourceValues = {};
      } else {
        resourceValues[value] = minutes;
      }
    }

    console.log(getResourceValue(field));
  })();
}

// 263105 too low
