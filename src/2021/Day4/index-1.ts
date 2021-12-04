import { parseInput } from "../../util/parse-input";
import { sum, last } from "lodash";

const input = parseInput((v) => v, __dirname, "input.txt");

const numbers = input[0].split(",").map(Number);

type WinLine = {
  numbers: number[];
  found: number[];
  board: number[];
};

const parseBoard = (board: string[]): WinLine[] => {
  const numBoard = board.map((row) => row.split(/\s+/).map(Number));
  const lines: WinLine[] = [];

  numBoard.map((row, rIndex) => {
    lines.push({
      numbers: row,
      found: [],
      board: numBoard.flat(),
    });

    if (rIndex === 0) {
      row.map((_, cIndex) => {
        lines.push({
          numbers: [
            numBoard[rIndex][cIndex],
            numBoard[rIndex + 1][cIndex],
            numBoard[rIndex + 2][cIndex],
            numBoard[rIndex + 3][cIndex],
            numBoard[rIndex + 4][cIndex],
          ],
          found: [],
          board: numBoard.flat(),
        });
      });
    }
  });

  return lines;
};

const winLines: WinLine[] = [];
let boardIndex = 2;

while (boardIndex < input.length) {
  winLines.push(...parseBoard(input.slice(boardIndex, boardIndex + 5)));
  boardIndex += 6;
}

let winningLine: WinLine;
let calledNumbers: number[] = [];

for (const num of numbers) {
  for (const winLine of winLines) {
    if (winLine.numbers.includes(num)) {
      winLine.found.push(num);

      if (winLine.found.length === winLine.numbers.length) {
        winningLine = winLine;
        break;
      }
    }
  }

  calledNumbers.push(num);
  if (winningLine) break;
}

const unmarkedSum = sum(
  winningLine.board.filter((n) => !calledNumbers.includes(n))
);
const lastCalled = last(calledNumbers);

console.log(lastCalled * unmarkedSum);
