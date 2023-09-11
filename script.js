let status1 = document.getElementById("status");
let box = document.querySelectorAll(".box");
let count = document.querySelectorAll(".count");
let i = 1;
let circle = `<img src="assets/o.png" alt="" />`
let x = `<img src="assets/x.png" alt="" />`

const makeimg = (e) => {
  if(i % 2 == 0) {
    e.innerHTML += x;
    i++;
  }else {
    e.innerHTML += circle;
    i++;
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
      return true;
    }
  }
  return false;
}

const game = () => {
  const x = 'X';
  const circle = 'O';

  if (checkWin(x)) {
    status1.innerHTML = `Player 2 Wins`;
    count[1].innerHTML = parseInt(count[1].innerHTML) + 1;
  } else if (checkWin(circle)) {
    status1.innerHTML = `Player 1 Wins`;
    count[0].innerHTML = parseInt(count[0].innerHTML) + 1;
  } else if (Array.from({ length: 9 }, (_, i) => box[i].innerHTML).every(val => val != '')) {
    status1.innerHTML = "Draw";
  }
}


box.forEach((e) => {
  e.addEventListener('click', () => {
    if(!e.hasChildNodes('img')) {
      makeimg(e);
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
}




