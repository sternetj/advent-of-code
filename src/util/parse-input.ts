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

export function parseInputSections<T, U>(
  formatters: [
    (v: string, index?: number) => T,
    (v: string, index?: number) => U,
  ],
  ...pathParts
): [T[], U[]] {
  const file = parseString(...pathParts);
  const sections: [T[], U[]] = [[], []];
  let sectionIndex = 0;
  file
    .split("\n")
    .map((v) => v.trim())
    .forEach((value, index) => {
      if (value === "") return sectionIndex++;
      let res = formatters[sectionIndex](value, index);
      if (!!res) sections[sectionIndex].push(res as any);
    });
  return sections;
}

export function parseSections<T1, T2>(
  format: (v: string, index?: number) => T1,
  format2: (v: string, index?: number) => T2,
): [T1[], T2[]] {
  const file = parseString();
  let processedData = file.split("\n").map((v) => v.trim());
  const index = processedData.findIndex((v) => v === "");
  processedData = processedData.filter((v) => v !== "");

  return [
    processedData.slice(0, index).map(format),
    processedData.slice(index).map(format2),
  ];
}

export function parseString(...pathParts): string {
  if (!pathParts.length) {
    pathParts.push(process.env.INPUT);
  }
  return fs.readFileSync(path.join(...pathParts).replace("dist", ""), "utf-8");
}
