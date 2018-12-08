import { parseString } from "../../util/parse-input";

class Node {
  public children: Node[] = [];
  public metadata: number[] = [];
  constructor(public childCount: number, public metadataCount: number) {}

  get metadataSum() {
    return (
      this.metadata.reduce((sum, value) => sum + value, 0) +
      this.children.reduce((sum, child) => sum + child.metadataSum, 0)
    );
  }
}

let input = parseString(__dirname, "input.txt")
  .split(" ")
  .map(Number);

let tree = new Node(1, 0);

function getChild(data: number[]): [Node, number[]] {
  let [childCount, metadataCount, ...newData] = data;
  let newNode = new Node(childCount, metadataCount);
  let child;

  for (let i = 0; i < childCount; i++) {
    [child, newData] = getChild(newData);
    newNode.children.push(child);
  }

  newNode.metadata = newData.splice(0, metadataCount);
  return [newNode, newData];
}

[tree] = getChild(input);

console.log(tree.metadataSum);
