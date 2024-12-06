// Elements of DOM
const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesBtn = document.getElementById("rules-btn");
const rulesContainer = document.querySelector(".rules-container");

// Other variables and constants
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let round = 1;

let isModalShowing = false;

// Logic
const rulesWindow = () => {
    isModalShowing = !isModalShowing
    if (isModalShowing) {
        rulesContainer.style.display = "block";
        rulesBtn.innerText = "Hide rules";
    }
    else {
        rulesContainer.style.display = "none";
        rulesBtn.innerText = "Show rules";
    }
}
const rollDices = () => {
    diceValuesArr.length = 0;
    for(let i=0; i<5; i++) {
        diceValuesArr.push((Math.floor((Math.random() * 6) + 1)));
        listOfAllDice[i].innerText = `${diceValuesArr[i]}`
    }
}

const updateStats = () => {
    rollsElement.innerText = `${rolls}`;
    roundElement.innerText = `${round}`;
}

// Click Events
rulesBtn.addEventListener("click", rulesWindow)
rollDiceBtn.addEventListener("click", () => {
    if (rolls < 3) {
    rolls++;
    rollDices();
    updateStats();
    }
    else {
      alert("You have made three rolls this round. Please select a score.");
    }
  });