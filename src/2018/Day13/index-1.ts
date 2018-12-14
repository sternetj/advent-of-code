import { sortBy } from "lodash";
import { parseInput } from "../../util/parse-input";

enum Direction {
  Up = "^",
  Down = "v",
  Left = "<",
  Right = ">",
}
enum Turn {
  Left,
  Straight,
  Right,
}

class Cart {
  public previousTurn = Turn.Right;
  constructor(
    public id: number,
    public currentSegment: TrackSegment,
    public direction: Direction,
  ) {}
}

class TrackSegment {
  public attachedTo: TrackSegment[] = [];

  constructor(public x: number, public y: number, public symbol: string) {}

  public get isHub() {
    return this.attachedTo.length === 4;
  }

  public get id() {
    return `${this.x},${this.y}`;
  }

  public getNextSegment(direction: Direction) {
    if (this.isHub) {
      switch (direction) {
        case Direction.Up:
          return this.attachedTo.find(segment => segment.y === this.y - 1);
        case Direction.Down:
          return this.attachedTo.find(segment => segment.y === this.y + 1);
        case Direction.Left:
          return this.attachedTo.find(segment => segment.x === this.x - 1);
        case Direction.Right:
          return this.attachedTo.find(segment => segment.x === this.x + 1);
      }
    }

    switch (direction) {
      case Direction.Up:
        return this.attachedTo.find(segment => segment.y !== this.y + 1);
      case Direction.Down:
        return this.attachedTo.find(segment => segment.y !== this.y - 1);
      case Direction.Left:
        return this.attachedTo.find(segment => segment.x !== this.x + 1);
      case Direction.Right:
        return this.attachedTo.find(segment => segment.x !== this.x - 1);
    }
  }
}

(function() {
  let input = parseInput(
    v => v.replace("\r", "").split(""),
    __dirname,
    // "input.test.txt",
    // "input.test.1.txt",
    "input.txt",
  );
  let map: { [key: string]: TrackSegment } = {};
  let carts: Cart[] = [];

  const getNewDirection = (currentDir: Direction, turn: Turn) => {
    switch (currentDir) {
      case Direction.Up:
        switch (turn) {
          case Turn.Left:
            return Direction.Left;
          case Turn.Right:
            return Direction.Right;
        }
      case Direction.Down:
        switch (turn) {
          case Turn.Left:
            return Direction.Right;
          case Turn.Right:
            return Direction.Left;
        }
      case Direction.Left:
        switch (turn) {
          case Turn.Left:
            return Direction.Down;
          case Turn.Right:
            return Direction.Up;
        }
      case Direction.Right:
        switch (turn) {
          case Turn.Left:
            return Direction.Up;
          case Turn.Right:
            return Direction.Down;
        }
    }

    return currentDir;
  };

  const getDirectionFrom = (a: TrackSegment, b: TrackSegment) => {
    if (a.x === b.x) {
      return a.y > b.y ? Direction.Up : Direction.Down;
    } else {
      return a.x > b.x ? Direction.Left : Direction.Right;
    }
  };

  const isAllowedMove = (
    from: TrackSegment,
    to: TrackSegment,
    dir: Direction,
  ) => {
    let path = `${from.symbol}${to.symbol}`;

    switch (dir) {
      case Direction.Right:
        return [
          "-/",
          "-\\",
          "-+",
          "+-",
          "+\\",
          "+/",
          "\\-",
          "\\+",
          "/-",
          "/+",
          "--",
          "++",
        ].includes(path);
      case Direction.Down:
        return [
          "|/",
          "|\\",
          "|+",
          "+|",
          "+\\",
          "+/",
          "\\|",
          "\\+",
          "/|",
          "/+",
          "||",
          "++",
        ].includes(path);
      default:
        return false;
    }
  };

  const createTrackSegment = (x: number, y: number, symbol: string) => {
    let segment = new TrackSegment(
      x,
      y,
      symbol.replace(/[><]/, "-").replace(/[v^]/, "|"),
    );
    [
      { x: segment.x - 1, y: segment.y, direction: Direction.Right },
      { x: segment.x, y: segment.y - 1, direction: Direction.Down },
    ].forEach(({ x, y, direction }) => {
      let neighbor = map[`${x},${y}`];
      if (neighbor) {
        if (isAllowedMove(neighbor, segment, direction)) {
          neighbor.attachedTo.push(segment);
          segment.attachedTo.push(neighbor);
        }
      }
    });

    map[`${segment.x},${segment.y}`] = segment;
    return segment;
  };

  let cartId = 0;
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    for (let colIndex = 0; colIndex < input[rowIndex].length; colIndex++) {
      let cell = input[rowIndex][colIndex];
      if (cell != " ") {
        let segment = createTrackSegment(colIndex, rowIndex, cell);
        if (["v", "^", ">", "<"].includes(cell)) {
          carts.push(new Cart(cartId++, segment, cell as Direction));
        }
      }
    }
  }

  Object.values(map).forEach(segment => {
    if (
      (segment.attachedTo.length != 2 && segment.attachedTo.length != 4) ||
      (segment.symbol === "+" && segment.attachedTo.length != 4)
    ) {
      console.log(segment);
    }
  });

  let exit = false;
  while (!exit) {
    let currentPositions = {};
    carts = sortBy(carts, "currentSegment.y", "currentSegment.x");
    carts.forEach(cart => (currentPositions[cart.currentSegment.id] = cart));
    for (const cart of carts) {
      let currentPos = cart.currentSegment.id;
      delete currentPositions[currentPos];
      if (cart.currentSegment.isHub) {
        switch (cart.previousTurn) {
          case Turn.Left:
            cart.previousTurn = Turn.Straight;
            break;
          case Turn.Straight:
            cart.previousTurn = Turn.Right;
            break;
          case Turn.Right:
            cart.previousTurn = Turn.Left;
            break;
        }
        cart.direction = getNewDirection(cart.direction, cart.previousTurn);
      }

      let nextSegment = cart.currentSegment.getNextSegment(cart.direction);
      cart.direction = getDirectionFrom(cart.currentSegment, nextSegment);
      cart.currentSegment = nextSegment;

      currentPos = cart.currentSegment.id;
      if (currentPositions[currentPos]) {
        console.log(currentPos);
        exit = true;
        break;
      }
      currentPositions[currentPos] = cart;
    }
  }
})();
