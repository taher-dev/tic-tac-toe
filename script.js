let boxes = document.querySelectorAll(".boxes");
let newContainer = document.querySelector(".new-game-container");
let h2 = newContainer.querySelector("h2");
let turnContainer = document.querySelector(".turn-container");
let turn = turnContainer.querySelector(".turn");
let newBtn = document.querySelector(".new-game-btn");
let resetBtn = document.querySelector("#reset-btn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let playerO = true;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (playerO) {
      turn.innerHTML = "X";
      box.innerHTML = "O";
      box.classList.add("playerO");
      playerO = false;
    } else {
      turn.innerHTML = "O";
      box.innerHTML = "X";
      playerO = true;
    }
    box.disabled = true;

    if (!checkWinner()) {
      checkDraw();
    }
    checkWinner();
  });
});

const boxDisabled = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};
const boxEnabled = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.classList.remove("win");
    if (box.innerHTML == "O") {
      box.classList.remove("playerO");
    }
    box.innerHTML = "";
  });
};
const checkWinner = () => {
  for (condition of winConditions) {
    let [a, b, c] = condition;
    if (
      boxes[a].innerHTML == boxes[b].innerHTML &&
      boxes[b].innerHTML == boxes[c].innerHTML &&
      boxes[a].innerHTML != ""
    ) {
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");
      boxDisabled();
      turnContainer.classList.add("hide");
      resetBtn.classList.add("hide");
      newContainer.classList.remove("hide");
      h2.classList.add("win");
      h2.innerHTML = boxes[a].innerHTML + " is the WINNER!";
    }
  }
};

const checkDraw = () => {
  let count = 0;
  boxes.forEach((box) => {
    if (box.innerHTML != "") {
      count++;
    }
  });
  if (count == 9) {
    boxDisabled();
    turnContainer.classList.add("hide");
    resetBtn.classList.add("hide");
    newContainer.classList.remove("hide");
    h2.classList.add("draw");
    h2.innerHTML = "It's a DRAW!";
  }
};

const newGame = () => {
  playerO = true;
  turn.innerHTML = "O";
  newContainer.classList.add("hide");
  turnContainer.classList.remove("hide");
  resetBtn.classList.remove("hide");
  h2.classList.remove("draw");
  h2.classList.remove("win");
  boxEnabled();
};
const reset = () => {
  playerO = true;
  turn.innerHTML = "O";
  boxEnabled();
};

resetBtn.addEventListener("click", reset);
newBtn.addEventListener("click", newGame);
