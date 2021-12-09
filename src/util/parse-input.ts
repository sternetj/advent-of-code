import * as fs from "fs";
import * as path from "path";

export function parseInput<T>(
  format: (v: string, index?: number) => T,
  ...pathParts
): T[] {
  const file = parseString(...pathParts);
  return file
    .split("\n")
    .map((v) => v.trim())
    .filter((v) => !!v)
    .map(format);
}

export function parseString(...pathParts): string {
  return fs.readFileSync(path.join(...pathParts).replace("dist", ""), "utf-8");
}
