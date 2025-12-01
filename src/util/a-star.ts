const key = ([x, y]: number[]) => `${x},${y}`;

type Config<T> = {
  start: number[];
  end: number[];
  map: T[][];
  isValidSpace: (space: T) => boolean;
  heuristic: (next: number[], getPathSoFar: () => number[][]) => number;
};

export const aStar = <T>(config: Config<T>) => {
  let { start, end, map, isValidSpace, heuristic } = config;

  map = map.map((row) => [...row]);
  start = [start[0], start[1]];
  end = [end[0], end[1]];

  const toProcess = [start];
  const cameFrom = {};
  const gScore = { [key(start)]: 0 };

  function* getParent(current: number[]) {
    while (cameFrom[key(current)]) {
      yield current;
      current = cameFrom[key(current)];
    }
    yield current;
  }

  while (toProcess.length) {
    let current = toProcess.reduce((minI, p) => {
      if (gScore[key(p)] < gScore[key(minI)]) return p;
      return minI;
    }, toProcess[0]);

    if (current[0] === end[0] && current[1] === end[1]) {
      return Array.from(getParent(current)).reverse();
    }

    toProcess.splice(toProcess.indexOf(current), 1);

    for (const [dx, dy] of [
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
    ]) {
      const next = [current[0] + dx, current[1] + dy];
      if (!isValidSpace(map[next[1]]?.[next[0]])) continue;
      const newGScore =
        gScore[key(current)] +
        heuristic(next, () => Array.from(getParent(current)).concat([next]));
      if (newGScore < (gScore[key(next)] ?? Infinity)) {
        cameFrom[key(next)] = current;
        gScore[key(next)] = newGScore;
        toProcess.push(next);
      }
    }
  }

  return [];
};
