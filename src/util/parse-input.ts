import * as fs from "fs";
import * as path from "path";

export function parseInput<T>(
  format: (v: any) => T = v => v,
  ...pathParts
): T[] {
  const file = parseString(...pathParts);
  return file.split("\n").map(format);
}

export function parseString(...pathParts): string {
  return fs.readFileSync(path.join(...pathParts).replace("dist", ""), "utf-8");
}
