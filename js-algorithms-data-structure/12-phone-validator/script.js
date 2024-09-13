// DOM elements
const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const results = document.getElementById('results-div');

const checkPhone = /^1?\s?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;


//Events
checkBtn.addEventListener('click', () => {
    if(userInput.value === "") {
        alert("Please provide a phone number");
    }
    else if(checkPhone.test(userInput.value)) {
        results.textContent = `Valid US number: ${userInput.value}`;
    }
    else {
        results.textContent = `Invalid US number: ${userInput.value}`;
    }
})
clearBtn.addEventListener('click', () => {
    results.textContent = "";
})
