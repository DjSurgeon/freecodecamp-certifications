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
    for (let i = 0; i < 5; i++) {
        diceValuesArr.push((Math.floor((Math.random() * 6) + 1)));
        listOfAllDice[i].innerText = `${diceValuesArr[i]}`
    }
}

const updateStats = () => {
    rollsElement.innerText = `${rolls}`;
    roundElement.innerText = `${round}`;
}

const updateRadioOption = (index, scoreValue) => {
    scoreInputs[index].disabled = false;
    scoreInputs[index].value = scoreValue;
    scoreSpans[index].innerText = `, score = ${scoreValue}`;
}

const getHighestDuplicates = (arr) => {
    const counts = {};

    for (const num of arr) {
        if (counts[num]) {
            counts[num]++;
        } else {
            counts[num] = 1;
        }
    }

    let highestCount = 0;

    for (const num of arr) {
        const count = counts[num];
        if (count >= 3 && count > highestCount) {
            highestCount = count;
        }
        if (count >= 4 && count > highestCount) {
            highestCount = count;
        }
    }

    const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

    if (highestCount >= 4) {
        updateRadioOption(1, sumOfAllDice);
    }

    if (highestCount >= 3) {
        updateRadioOption(0, sumOfAllDice);
    }

    updateRadioOption(5, 0);
};

const resetRadioOptions = () => {
    scoreInputs.forEach((input) => {
      input.disabled = true;
      input.checked = false;
    });
  
    scoreSpans.forEach((span) => {
      span.textContent = "";
    });
  };
// Click Events
rulesBtn.addEventListener("click", rulesWindow)
rollDiceBtn.addEventListener("click", () => {
    if (rolls < 3) {
        rolls++;
        rollDices();
        updateStats();
        getHighestDuplicates(diceValuesArr);
    }
    else {
        alert("You have made three rolls this round. Please select a score.");
    }
});