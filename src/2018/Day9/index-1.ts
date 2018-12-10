const maxMarble = 70918;
const players = 464;

const board = [0, 1];
let currentMarble = 1;
let currentPlayer = 2;
let scores: { [id: number]: number } = {};

function getIndex(val: number) {
  return (val + board.length) % board.length;
}

for (let player = 1; player <= players; player++) {
  scores[player] = 0;
}

for (let marble = 2; marble <= maxMarble; marble++) {
  if (marble % 23 === 0) {
    scores[currentPlayer] += marble;
    currentMarble = getIndex(currentMarble - 7);
    scores[currentPlayer] += board.splice(currentMarble, 1)[0];
  } else {
    currentMarble += 2;
    if (board.length === currentMarble) {
      board.push(marble);
    } else {
      currentMarble = getIndex(currentMarble);
      board.splice(currentMarble, 0, marble);
    }
  }

  currentPlayer = Math.max((currentPlayer + 1) % (players + 1), 1);
}

const winningScore = Math.max(...Object.values(scores));

console.log(winningScore);
