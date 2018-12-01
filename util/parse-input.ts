import * as fs from "fs";
import * as path from "path";

export function parseInput<T>(format: (v: any) => T, ...pathParts): T[] {
    const file = fs.readFileSync(path.join(...pathParts).replace('dist', ''), 'utf-8');
    return file.split('\n').map(format);
}