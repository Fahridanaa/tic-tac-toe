const statusElement = document.getElementById("status");
const boxes = document.querySelectorAll(".box");
const countElements = document.querySelectorAll(".count");
let currentPlayer = 0;
const players = [
  { name: 'Player 1', symbol: `<img src="assets/o.png">`, count: 0 },
  { name: 'Bot', symbol: `<img src="assets/x.png">`, count: 0 }
];
let win = false;
const restartButton = `<button onclick="reset();">
  <img src="assets/restart.png" class="icon" />
</button>`;
const restartElement = document.getElementById("restart");

const makeMove = (box, player) => {
  if (!box.hasChildNodes() && !win) {
    box.innerHTML += players[player].symbol;
    currentPlayer = (currentPlayer + 1) % 2;
    if (checkWin(players[player].symbol)) {
      updateStatus(player + 1);
    } else if ([...boxes].every(box => box.innerHTML !== '')) {
      updateStatus(0);
    } else if (currentPlayer === 1) {
      makeMove(getRandomEmptyBox(), currentPlayer); // Bot's move
    }
  }
}

const getRandomEmptyBox = () => {
  const emptyBoxes = [...boxes].filter(box => !box.hasChildNodes());
  const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
  return emptyBoxes[randomIndex];
}

const checkWin = (player) => {
  const lines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9], 
    [1, 5, 9], [3, 5, 7]            
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (boxes[a - 1].innerHTML == player &&
        boxes[b - 1].innerHTML == player &&
        boxes[c - 1].innerHTML == player) {
      return true;
    }
  }
  return false;
}

const updateStatus = (winner) => {
  statusElement.innerHTML = winner ? `${players[winner - 1].name} Wins` : "Draw";
  if (winner) {
    countElements[winner - 1].innerHTML = ++players[winner - 1].count;
  }
  win = true;
  restartElement.innerHTML = restartButton;
}

boxes.forEach(box => {
  box.addEventListener('click', () => makeMove(box, currentPlayer));
});

const reset = () => {
  boxes.forEach(box => {
    box.innerHTML = '';
  });
  statusElement.innerHTML = '';
  currentPlayer = 0;
  win = false;
  restartElement.innerHTML = '';
}

reset();


