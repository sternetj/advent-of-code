import { parseInput } from "../../util/parse-input";

const map = parseInput((l) => l.split(""));

const nodes: Record<string, [number, number][]> = {};

map.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell !== ".") {
      nodes[cell] ??= [];
      nodes[cell].push([x, y]);
    }
  });
});

const antiNodes: Record<string, boolean> = {};
Object.values(nodes).forEach((node) => {
  for (let i = 0; i < node.length; i++) {
    for (let j = i + 1; j < node.length; j++) {
      antiNodes[`${node[i][0]},${node[i][1]}`] = true;
      antiNodes[`${node[j][0]},${node[j][1]}`] = true;

      const dx = Math.abs(node[i][0] - node[j][0]);
      const dy = Math.abs(node[i][1] - node[j][1]);
      const mx = node[i][0] < node[j][0] ? -1 : 1;
      const my = node[i][1] < node[j][1] ? -1 : 1;
      let n1 = [node[i][0] + mx * dx, node[i][1] + my * dy];
      let n2 = [node[j][0] - mx * dx, node[j][1] - my * dy];
      while (map[n1[1]]?.[n1[0]]) {
        antiNodes[`${n1[0]},${n1[1]}`] = true;
        n1 = [n1[0] + mx * dx, n1[1] + my * dy];
      }
      while (map[n2[1]]?.[n2[0]]) {
        antiNodes[`${n2[0]},${n2[1]}`] = true;
        n2 = [n2[0] - mx * dx, n2[1] - my * dy];
      }
    }
  }
});

console.log(Object.keys(antiNodes).length);
