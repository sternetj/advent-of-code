import { parseInput } from "../../util/parse-input";

class Claim {
  constructor(
    public id: string,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  public getCoords() {
    const coords = [];

    for (let i = this.x; i < this.x + this.width; i++) {
      for (let j = this.y; j < this.y + this.height; j++) {
        coords.push(`${i}x${j}`);
      }
    }

    return coords;
  }
}

const input = parseInput(
  v => {
    const parts = v.split(/[(\s@\s)|:\s|x|,#]/g);
    return new Claim(parts[1], +parts[4], +parts[5], +parts[7], +parts[8]);
  },
  __dirname,
  "input-1.txt"
);

const fabric: { [key: string]: number } = {};

input.forEach(claim => {
  claim.getCoords().forEach(coord => {
    fabric[coord] = fabric[coord] + 1 || 1;
  });
});

const overlappedCount = Object.values(fabric).filter(v => v > 1).length;

console.log(overlappedCount);
