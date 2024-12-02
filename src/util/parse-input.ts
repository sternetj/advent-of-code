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

export function parseInputWithBreaks<T>(
  format: (v: string, index?: number) => T,
  ...pathParts
): Exclude<T, "" | undefined | false>[] {
  const file = parseString(...pathParts);
  return file
    .split("\n")
    .map((v) => v.trim())
    .map(format)
    .filter((v) => !!v) as Exclude<T, "" | undefined | false>[];
}

export function parseString(...pathParts): string {
  if (!pathParts.length) {
    pathParts.push(process.env.INPUT);
  }
  return fs.readFileSync(path.join(...pathParts).replace("dist", ""), "utf-8");
}
