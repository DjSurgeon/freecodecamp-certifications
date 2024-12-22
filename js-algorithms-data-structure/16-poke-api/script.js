const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

let pokemons = [];
let pokemonsIds = [];

const pokeImg = document.getElementById('poke-img');
const pokeName = document.getElementById('pokemon-name');
const pokeId = document.getElementById('pokemon-id');
const pokeWeight = document.getElementById('weight');
const pokeHeight = document.getElementById('height');
const pokeType = document.getElementById('types');
const pokeHp = document.getElementById('hp');
const pokeAttack = document.getElementById('attack');
const pokeDefense = document.getElementById('defense');
const pokeSpecialAttack = document.getElementById('special-attack');
const pokeSpecialDefense = document.getElementById('special-defense');
const pokeSpeed = document.getElementById('speed');

const pokeApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";


const findPokemon = () => {
    let value = searchInput.value.toString().toLowerCase();
    if (pokemons.includes(value) || pokemonsIds.includes(value)) {
        let url = `${pokeApi}/${value}`;
        loadDetails(url);
    }
    else {
        alert("Pokémon not found");
    }
}

const loadApi = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => showApi(data))
}
const loadDetails = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data))
}

const showApi = (data) => {
    pokemons = data.results.map((item) => item.name);
    pokemonsIds = data.results.map((item) => item.id.toString());
}

const showDetails = (data) => {
    pokeImg.innerHTML = "";
    pokeImg.insertAdjacentHTML('beforeend', `
    <img id="sprite" src="${data["sprites"]["front_default"]}"/>`);
    pokeName.innerHTML = data["name"].toUpperCase();
    pokeId.innerHTML = `#${data["id"]}`;
    pokeWeight.innerHTML = `Weight: ${data["weight"]}`;
    pokeHeight.innerHTML = `Height: ${data["height"]}`;
    pokeHp.innerHTML = data["stats"][0]["base_stat"];
    pokeAttack.innerHTML = data["stats"][1]["base_stat"];
    pokeDefense.innerHTML = data["stats"][2]["base_stat"];
    pokeSpecialAttack.innerHTML = data["stats"][3]["base_stat"];
    pokeSpecialDefense.innerHTML = data["stats"][4]["base_stat"];
    pokeSpeed.innerHTML = data["stats"][5]["base_stat"];
    printTypes(data);
}

const printTypes = (data) => {
    pokeType.innerHTML = "";
    if (data["types"][1] && data["types"][0]["slot"] === 1) {
        pokeType.innerHTML = `<p>${data["types"][1]["type"]["name"].toUpperCase()}</p>
        <p>${data["types"][0]["type"]["name"].toUpperCase()}</p>`;
    } else if ( data["types"][0]["slot"] === 1) {
        pokeType.innerHTML = `<p>${data["types"][0]["type"]["name"].toUpperCase()}</p>`;
    }
}

loadApi(pokeApi);

searchButton.addEventListener("click", findPokemon);