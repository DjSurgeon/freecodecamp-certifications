// DOM elements
const checkbtn = document.getElementById('check-btn');
const textInput = document.getElementById('text-input');
const result = document.getElementById('result');

// Constants & Variables
const regex = /[^a-zA-Z0-9]/g;
let string;
let chars;
let palindrome;

function print() {
    if (!textInput.value) {
        alert("Please input a value");
    }
    else {
        string = textInput.value;
        palindrome = isPalindrome(string);
        if (palindrome) {
            result.innerText = `${textInput.value} is a palindrome`;
        }
        else {
            result.innerText = `${textInput.value} is not a palindrome`;
        }
    }
}

function isPalindrome(string) {
    let i;
    let j;

    string = string.toLowerCase();
    string = string.replaceAll(regex, '');
    chars = string.split('');
    i = 0;
    j = chars.length - 1;
    
    while(i <= j - 1) 
        {
            if (chars[i] === chars[j])
                {
                    i++;
                    j--;
                }
                else
                {
                    return false;
                }
        }
            return true;
}

checkbtn.onclick = print;