const romanArray = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

const numbers = [
    {
        arabic: 1000, // position 0
        roman: "M"
    },
    {
        arabic: 900, // position 1
        roman: "CM"
    },
    {
        arabic: 500,
        roman: "D"
    },
    {
        arabic: 400,
        roman: "CD"
    },
    {
        arabic: 100,
        roman: "C"
    },
    {
        arabic: 90,
        roman: "XC"
    },
    {
        arabic: 50,
        roman: "L"
    },
    {
        arabic: 40,
        roman: "XL"
    },
    {
        arabic: 10,
        roman: "X"
    },
    {
        arabic: 9,
        roman: "IX"
    },
    {
        arabic: 5,
        roman: "V"
    },
    {
        arabic: 4,
        roman: "IV"
    },
    {
        arabic: 1,
        roman: "I"
    }
]

// DOM elements

const convertBtn = document.getElementById('convert-btn');
const arabicNum = document.getElementById('number');
const romanNum = document.getElementById('output');

// Logic and functions

const checkNum = () => {
    let number = arabicNum.value;
    if (number == false) {
        romanNum.innerText = "Please enter a valid number";
    }
    else if (number <= 0) {
        romanNum.innerText = "Please enter a number greater than or equal to 1";
    }
    else if (number >= 4000) {
        romanNum.innerText = "Please enter a number less than or equal to 3999";
    }
    else {
        romanNum.innerText = ("");
        printRomanNumber(number);

    }
};


function printRomanNumber(num) {
    // number = Number(num); // String to Num
    
    let roman = romanArray.find((el) => el <= num);
    console.log(roman);
    
    if (Math.floor(num / roman) === 1) {
        console.log(roman);
        let romanToPrint = numbers.find((el) => el.arabic == roman)
        romanNum.innerText += `${romanToPrint.roman}`;
        let module = num % roman;
        if (module !== 0) {
            printRomanNumber(module);
        }
    }
    else if (Math.floor(num / roman) === 2) {
        let romanToPrint = numbers.find((el) => el.arabic == roman)
        romanNum.innerText += `${romanToPrint.roman}${romanToPrint.roman}`;
        let module = num % roman;
        if (module !== 0) {
            printRomanNumber(module);
        }
    }
    else if (Math.floor(num / roman) === 3) {
        let romanToPrint = numbers.find((el) => el.arabic == roman)
        romanNum.innerText += `${romanToPrint.roman}${romanToPrint.roman}${romanToPrint.roman}`;
        let module = num % roman;
        if (module !== 0) {
            printRomanNumber(module);
        }
    }
    
}

// Events
convertBtn.addEventListener("click", checkNum);