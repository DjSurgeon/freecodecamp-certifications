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
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
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
    },
    {
        name: "fight",
        button_text: ["Attack", "Dodge", "Run"],
        button_functions: [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        button_text: ["Go to town square", "Go to town square", "Go to town square"],
        button_functions: [goTown, goTown, goTown],
        text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
    },
    {
        name: "lose",
        button_text: ["Replay?", "Replay?", "Replay?"],
        button_functions: [restart, restart, restart],
        text: "You die."
    },
    {
        name: "win",
        button_text: ["Replay?", "Replay?", "Replay?"],
        button_functions: [restart, restart, restart],
        text: "You defeat the dragon! You win thw Game!"
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
            button2.innerText = "Sell weapon for 15 gold";
            button2.onclick = sellWeapon;
        }
    }
    else {
        text.innerText = "You already have the most powerful weapon!";
    }
}
function sellWeapon() {
    if (inventory.length > 1) {
        let currentWeapon;
        
        gold += 15;
        goldText.innerText = gold;
        currentWeapon = inventory.shift();
        text.innerText = `You sold a ${currentWeapon}.`;
        text.innerText += ` In your inventory you have: ${inventory}`;
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}
function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting = 2;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display =  'block';
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText =  monsterHealth
}
function attack() {
    text.innerText = `The ${monsters[fighting].name} attacks.`;
    text.innerText += ` You attack it with your ${weapons[currentWeaponIndex].name}.`;
    health -= getMonsterAttackValue(monsters[fighting].level);
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;    
      }
      else {
        text.innerText += " You miss.";
      }
    if (health <= 0) {
        lose();
      } else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
          }
          else {
          defeatMonster();
          }
      }
      if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeaponIndex--;
      }
}
function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}
function dodge() {
    text.innerText = `You dodge the attack from the ${monsters[fighting].name}`;
}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
}
function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
}
function update(location) {
    monsterStats.style.display = 'none';
    button1.innerText = location.button_text[0];
    button2.innerText = location.button_text[1];
    button3.innerText = location.button_text[2];
    button1.onclick = location.button_functions[0];
    button2.onclick = location.button_functions[1];
    button3.onclick = location.button_functions[2];
    text.innerText = location.text;
}
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeaponIndex = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}