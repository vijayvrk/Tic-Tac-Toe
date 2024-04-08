let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let turnIndicator = document.getElementById("turn-indicator"); // Reference to turn indicator element
//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

//New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  updateTurnIndicator(); // Update turn indicator when starting a new game
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  updateTurnIndicator(); // Update turn indicator when restarting the game
});

//Win Logic
const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

//Display X/O on select
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.disabled = true;
    }
    //Increment on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    winChecker();
    updateTurnIndicator(); // Update turn indicator after each player's turn
  });
});

// Function to update turn indicator
const updateTurnIndicator = () => {
  turnIndicator.innerText = xTurn ? "X's Turn" : "O's Turn";
};

//Enable Buttons and disable popup on page load
window.onload = enableButtons;
updateTurnIndicator(); // Initial update of turn indicator when the page loads
