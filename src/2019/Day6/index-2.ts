import { map } from "./puzzle-map";

const computePathTo = (
  to: string,
  path: string[] = [],
  node: string = "COM",
): string[] => {
  path = path.concat(node);
  if (node === to) return path;
  if (!map[node]) return [];

  return map[node].reduce(
    (finalPath, child) => finalPath.concat(computePathTo(to, path, child)),
    [],
  );
};

const pathToSAN = computePathTo("SAN");
const pathToYOU = computePathTo("YOU");

let rootNode = "";
while (pathToSAN[0] === pathToYOU[0]) {
  pathToSAN.shift();
  rootNode = pathToYOU.shift();
}

// Add Common Start
pathToYOU.splice(0, 0, rootNode);
// Remove YOU
pathToYOU.pop();
// Remove YOU's starting Orbital
pathToYOU.pop();

// Remove SAN
pathToSAN.pop();

console.log(pathToSAN.length + pathToYOU.length);
