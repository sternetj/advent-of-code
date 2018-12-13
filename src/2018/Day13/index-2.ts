import { parseInput } from "../../util/parse-input";

enum Direction {
  North = "^",
  South = "v",
  East = ">",
  West = "<"
}
// enum Turn {
//   Left,
//   Straight,
//   Right
// }

class Cart {
  public previousTurn = Turn.Right;
  constructor(public x: number, public y: number, public facing: Direction) {}

  public moveToNext(map: { [key: string]: string }) {
    this.updateCoords();
    this.updateFacing(map[`${this.x},${this.y}`]);
  }

  // symbol: - | / \
  updateFacing(symbol: string) {
    switch (symbol) {
      case Direction.East:
        this.x++;
        break;
      case Direction.West:
        this.x--;
        break;
      case Direction.North:
        this.y--;
        break;
      case Direction.South:
        this.y++;
        break;
    }
  }

  private updateCoords() {
    switch (this.facing) {
      case Direction.East:
        this.x++;
        break;
      case Direction.West:
        this.x--;
        break;
      case Direction.North:
        this.y--;
        break;
      case Direction.South:
        this.y++;
        break;
    }
  }
}

let cart = new Cart(0, 0, ">" as Direction);

(function() {
  let input = parseInput(
    v => v.replace("\r", "").split(""),
    __dirname,
    "input.test.txt"
  );
})();

// 20,109
// 101,112
