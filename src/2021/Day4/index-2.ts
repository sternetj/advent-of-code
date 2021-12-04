import { parseInput } from "../../util/parse-input";
import { sum, last } from "lodash";

const input = parseInput((v) => v, __dirname, "input.txt");

const numbers = input[0].split(",").map(Number);

type WinLine = {
  numbers: number[];
  found: number[];
  board: number[];
  boardId: number;
};

const parseBoard = (boardId: number, board: string[]): WinLine[] => {
  const numBoard = board.map((row) => row.split(/\s+/).map(Number));
  const flatBoard = numBoard.flat();
  const lines: WinLine[] = [];

  numBoard.map((row, rIndex) => {
    lines.push({
      numbers: row,
      found: [],
      board: flatBoard,
      boardId,
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
          board: flatBoard,
          boardId,
        });
      });
    }
  });

  return lines;
};

let winLines: WinLine[] = [];
let boardIndex = 2;
let boardId = 1;

while (boardIndex < input.length) {
  winLines.push(
    ...parseBoard(boardId++, input.slice(boardIndex, boardIndex + 5))
  );
  boardIndex += 6;
}

let lastWinLine: WinLine;
let calledNumbers: number[] = [];
let winningBoards: Record<number, boolean> = {};

for (const num of numbers) {
  const newWinLines = [];

  for (const winLine of winLines) {
    if (!winningBoards[winLine.boardId]) {
      if (winLine.numbers.includes(num)) {
        winLine.found.push(num);

        if (winLine.found.length === winLine.numbers.length) {
          winningBoards[winLine.boardId] = true;
          lastWinLine = winLine;
          continue;
        }
      }

      newWinLines.push(winLine);
    }
  }

  winLines = newWinLines;

  if (!winLines.length) break;

  calledNumbers.push(num);
}

const unmarkedSum = sum(
  lastWinLine.board.filter((n) => !calledNumbers.includes(n))
);
const lastCalled = last(lastWinLine.found);

console.log(lastCalled * unmarkedSum);
