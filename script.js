let status1 = document.getElementById("status");
let box = document.querySelectorAll(".box");
let count = document.querySelectorAll(".count");
let win = false;
let restartbtn = `<button onclick="reset();">
<img src="assets/restart.png" class="icon" />
</button>`
let restart = document.getElementById("restart");
let playerTurn = 0;
const players = [
  { name: 'Player 1', symbol: `<img src="assets/x.png">`, count: 0 },
  { name: 'Player 2', symbol: `<img src="assets/o.png">`, count: 0 }
];

const makeMove = (box, player) => {
  if (!box.hasChildNodes() && !win) {
    box.innerHTML += players[player].symbol;
    playerTurn = (playerTurn + 1) % 2;
  }
}

const checkWin = (player) => {
  const lines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9], 
    [1, 5, 9], [3, 5, 7]            
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (document.getElementById(`box-${a}`).innerHTML == player &&
    document.getElementById(`box-${b}`).innerHTML == player &&
    document.getElementById(`box-${c}`).innerHTML == player) {
      restart.innerHTML = restartbtn;
      win = true;
      return true;
    }
  }
 
  return false;
}

const game = () => {
  if (checkWin(players[0].symbol)) {
    status1.innerHTML = `Player 1 Wins`;
    count[0].innerHTML = ++players[0].count;
  } else if (checkWin(players[1].symbol)) {
    status1.innerHTML = `Player 2 Wins`;
    count[1].innerHTML = ++players[1].count;
  } else if (Array.from({ length: 9 }, (_, i) => box[i].innerHTML).every((e) => e != '')) {
    status1.innerHTML = "Draw";
    restart.innerHTML = restartbtn;
  }
}

box.forEach((e) => {
  e.addEventListener('click', () => {
    if(!(win && e.hasChildNodes('img'))) {
        makeMove(e, playerTurn);
      }
      game();
  })
})

const reset = () => {
  box.forEach((e) => {
    e.innerHTML = '';
  })
  status1.innerHTML = '';
  i = 1;
  win = false;
  restart.innerHTML = '';
}




