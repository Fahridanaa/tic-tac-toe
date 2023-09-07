let status = document.getElementById("status");
let box = document.querySelectorAll(".box");
let i = 1;

box.forEach((e) => {
  let circle = `<img src="assets/o.png" alt="" />`
  let x = `<img src="assets/x.png" alt="" />`
  e.addEventListener('click', () => {
    if(!e.hasChildNodes('img')) {
    if(i % 2 == 0) {
        e.innerHTML += x;
        i++;
      }else {
        e.innerHTML += circle;
        i++;
      }
    }
  })
})