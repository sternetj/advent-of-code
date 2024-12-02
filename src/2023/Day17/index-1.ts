import { parseInput } from "../../util/parse-input";

const input = parseInput(
  (l) => l.split("").map(Number),
  __dirname,
  process.env.INPUT
);
class Node {
  x: number;
  y: number;
  cost: number;
  heuristic: number;
  parent: Node | null;

  constructor(x: number, y: number, cost: number, heuristic: number) {
    this.x = x;
    this.y = y;
    this.cost = cost;
    this.heuristic = heuristic;
    this.parent = null;
  }

  get totalCost(): number {
    let cost = 0;
    let node: Node = this;
    while (node.parent) {
      cost += node.heuristic;
      node = node.parent;
    }
    return this.cost + cost;
  }
}

class AStar {
  grid: Node[][];
  openSet: Node[];
  closedSet: Node[];

  constructor(grid: Node[][]) {
    this.grid = grid;
    this.openSet = [];
    this.closedSet = [];
  }

  findPath(start: Node, goal: Node): Node[] | null {
    this.openSet.push(start);

    while (this.openSet.length > 0) {
      const current = this.getMinCostNode();

      if (current === goal) {
        return this.reconstructPath(current);
      }

      this.removeNodeFromList(this.openSet, current);
      this.closedSet.push(current);

      for (const neighbor of this.getNeighbors(current)) {
        if (this.closedSet.includes(neighbor)) {
          continue;
        }

        const tentativeCost =
          current.cost + this.calculateDistance(current, neighbor);

        if (!this.openSet.includes(neighbor) || tentativeCost < neighbor.cost) {
          neighbor.cost = tentativeCost;
          neighbor.parent = current;

          if (!this.openSet.includes(neighbor)) {
            this.openSet.push(neighbor);
          }
        }
      }
    }

    return null; // No path found
  }

  getMinCostNode(): Node {
    return this.openSet.reduce(
      (minNode, node) => (node.totalCost < minNode.totalCost ? node : minNode),
      this.openSet[0]
    );
  }

  removeNodeFromList(list: Node[], node: Node): void {
    const index = list.indexOf(node);
    if (index !== -1) {
      list.splice(index, 1);
    }
  }

  getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];

    const directions = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
    ];

    for (const dir of directions) {
      const neighborX = node.x + dir.x;
      const neighborY = node.y + dir.y;
      const p1 = node.parent;
      const p2 = p1?.parent;

      if (
        neighborX >= 0 &&
        neighborX < this.grid.length &&
        neighborY >= 0 &&
        neighborY < this.grid[0].length &&
        (!p1 ||
          !p2 ||
          (new Set([node.x, p1.x, p2.x, neighborX]).size > 1 &&
            new Set([node.y, p1.y, p2.y, neighborY]).size > 1))
      ) {
        const neighbor = this.grid[neighborX][neighborY];
        neighbors.push(neighbor);
      }
    }

    return neighbors;
  }

  calculateDistance(nodeA: Node, nodeB: Node): number {
    // Assuming Manhattan distance as the heuristic
    return nodeB.heuristic;
  }

  reconstructPath(node: Node): Node[] {
    const path: Node[] = [];
    let current = node;

    while (current !== null) {
      path.unshift(current);
      current = current.parent!;
    }

    return path;
  }
}

// Example usage:
const grid: Node[][] = [];

for (let i = 0; i < input.length; i++) {
  grid[i] = [];
  for (let j = 0; j < input[0].length; j++) {
    grid[i][j] = new Node(i, j, 0, input[i][j]);
  }
}

const startNode = grid[0][0];
const goalNode = grid[input.length - 1][input[0].length - 1];

const aStar = new AStar(grid);
const path = aStar.findPath(startNode, goalNode);

console.log("Path:", path);
console.log(
  "Total:",
  path.reduce((v, n) => v + n.heuristic, 0)
);
