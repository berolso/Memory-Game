const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    //add data attributes
    newDiv.dataset.isChecked = false;
    newDiv.dataset.isMatched = false;

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

//track live picks
let pickTotal = 0;
let guessedColor = [];

function handleCardClick(event) {
  //if less than two picks
  let data = event.target.dataset;
  if (
    pickTotal < 2 &&
    data.isChecked === "false" &&
    data.isMatched === "false"
  ) {
    // you can use event.target to see which element was clicked
    // console.log("you just clicked", event.target);

    //show card color, set isChecked add to guessedColor
    event.target.style.backgroundColor = event.target.classList;
    data.isChecked = true;
    pickTotal++;
    guessedColor.push(event.target.className);

    //check to see if two cards are same
    if (guessedColor[0] === guessedColor[1]) {
      let checked = document.querySelectorAll("div[data-is-checked='true']");
      for (let i of checked) {
        i.dataset.isMatched = true;
      }
    }
    //reset color if pickTotal === 2
    if (pickTotal === 2) {
      display.value = ++guessTotal;
      setTimeout(() => {
        let nonMatch = document.querySelectorAll(
          "div[data-is-matched='false']"
        );
        for (let i of nonMatch) {
          i.dataset.isChecked = false;
          i.style.backgroundColor = "";
          pickTotal = 0;
          guessedColor = [];
        }
      }, 1000);
    }
  }
  checkWin();
}

//check to see if has won
let hasWon = false;
function checkWin() {
  let storageBest = localStorage.best;
  let unMatched = document.querySelectorAll("div[data-is-matched='false']");
  if (!unMatched.length) {
    hasWon = true;
    gameContainer.innerText = "YOU WON";
  }
  if (hasWon === true) {
    if (guessTotal < bestScore || !bestScore) {
      console.log(guessTotal, bestScore);
      localStorage.setItem("best", guessTotal);
      bestDisplay.value = JSON.parse(localStorage.getItem("best"));
    }
    console.log(bestScore);
  }
}

// when the DOM loads
// createDivsForColors(shuffledColors);

// create div for control buttons
const controls = document.createElement("div");
controls.setAttribute("id", "controls");
document.querySelector("h1").insertAdjacentElement("afterend", controls);

//create start button
const startBtn = document.createElement("button");
startBtn.innerText = "Start";
controls.append(startBtn);
startBtn.addEventListener("click", start);

function start() {
  // when the DOM loads
  gameContainer.innerText = "";
  let prev = document.querySelectorAll("#game div");
  if (prev) {
    for (let i of prev) {
      i.remove();
    }
  }
  createDivsForColors(shuffle(COLORS));
  pickTotal = 0;
  guessedColor = [];
  guessTotal = 0;
  display.value = guessTotal;
  hasWon = false;
}

//create restart button
const restartBtn = document.createElement("button");
restartBtn.innerHTML = "Restart";
controls.append(restartBtn);
restartBtn.addEventListener("click", function () {
  if (document.querySelector("#game > div")) start();
});

//create guesses display
let guessTotal;
const displayLabel = document.createElement("label");
displayLabel.innerText = " Total Guesses:";
const display = document.createElement("input");
display.type = "number";
display.readOnly = true;
displayLabel.append(display);
controls.append(displayLabel);

//create best score display
let bestScore = JSON.parse(localStorage.getItem("best"));
const bestLabel = document.createElement("label");
bestLabel.innerText = " Best Score:";
const bestDisplay = document.createElement("input");
bestDisplay.value = bestScore;
bestDisplay.type = "number";
bestDisplay.readOnly = true;
bestLabel.append(bestDisplay);
controls.append(bestLabel);

//
