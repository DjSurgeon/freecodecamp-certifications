// Constants of the DOM
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Other constants
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];
const locations = [
    {
        name: "town square",
        button_text: ["Go to store", "Go to cave", "Fight dragon"],
        button_functions: [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        button_text: ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        button_functions: [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        button_text: ["Fight slime", "Fight fanged beast", "Go to town square"],
        button_functions: [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    }
];
// Declaration of variables.
let xp;
let health;
let gold;
let currentWeaponIndex;
let fighting; // No inicilized
let monsterHealth; // No inicialized
let inventory;

// Initialize of variables.
xp = 0;
health = 100;
gold = 50;
currentWeaponIndex = 0;
inventory = ["stick"];

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Functions
function goTown() {
    update(locations[0]);
}
function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);
}
function fightDragon() {
    console.log("Fighting dragon.");
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}
function buyWeapon() {
    if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
        let newWeapon;

        gold -= 30;
        currentWeaponIndex++;
        goldText.innerText = gold;
        newWeapon = weapons[currentWeaponIndex].name;
        text.innerText = `You now have a ${newWeapon}.`;
        inventory.push(newWeapon);
        text.innerText += ` In your inventory you have: ${inventory}.`;
    } else {
        text.innerText = "You do not have enough gold to buy a weapon.";
    }
}
else {
    text.innerText = "You already have the most powerful weapon!";
}
}
function fightSlime() {

}
function fightBeast() {

}
function update(location) {
    button1.innerText = location.button_text[0];
    button2.innerText = location.button_text[1];
    button3.innerText = location.button_text[2];

    button1.onclick = location.button_functions[0];
    button2.onclick = location.button_functions[1];
    button3.onclick = location.button_functions[2];

    text.innerText = location.text;
}