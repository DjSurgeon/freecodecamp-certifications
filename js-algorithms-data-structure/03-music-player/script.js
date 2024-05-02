// Constants asignation

const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

// Array for store all songs

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
  },
];

// Web audio API

const audio = new Audio();

// Tracks information

let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

// Arrow functions

const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      return `
    <li id="song-${song.id}" class="playlist-song"></li>
    <button onclick="playSong(${song.id})" class="playlist-song-info">
    <span class="playlist-song-title">${song.title}</span>
    <span class="playlist-song-artist">${song.artist}</span>
    <span class="playlist-song-duration">${song.duration}</span>
    </button>
    <button class="playlist-song-delete" aria-label="Delete ${song.title}">
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
    </button>
    `;
    })
    .join("");
  playlistSongs.innerHTML = songsHTML;
};
/*
 * La función renderSongs toma un parámetro array, que se espera que sea un array de objetos que representan canciones.
 * Dentro de la función, se utiliza el método map() para iterar sobre cada elemento del array de canciones. Para cada canción, se crea un bloque de HTML que representa la información de la canción.
 * El bloque de HTML incluye:
 * Un <li> con un id único basado en el id de la canción (song.id).
 * Un botón con la clase playlist-song-info, que incluye:
 * Un span con la clase playlist-song-title, que muestra el título de la canción (song.title).
 * Un span con la clase playlist-song-artist, que muestra el artista de la canción (song.artist).
 * Un span con la clase playlist-song-duration, que muestra la duración de la canción (song.duration).
 * Un botón con la clase playlist-song-delete, que se utiliza para eliminar la canción de la lista de reproducción. Este botón también incluye un SVG que representa un ícono de eliminación.
 * Cada bloque de HTML generado se devuelve como un string.
 * Todos los bloques de HTML generados se concatenan utilizando join(""), lo que los convierte en una sola cadena.
 * Finalmente, la cadena resultante se asigna como HTML al elemento con el id playlistSongs en el documento HTML. Este elemento se espera que sea una lista (<ul> o <ol>) donde se mostrarán las canciones.
 */
const sortSongs = () => {
  userData?.songs.sort((a,b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return userData?.songs;
}
/*
* La función sortSongs es una función de flecha sin parámetros. Esto significa que no espera ningún argumento al ser llamada.
* Dentro de la función, se utiliza el operador de encadenamiento opcional (?.) para acceder a la propiedad songs del objeto userData. El operador de encadenamiento opcional asegura que si userData es null o undefined, la función se detenga y no arroje un error.
* Una vez que se accede a la propiedad songs, se utiliza el método sort() para ordenar las canciones en función de un criterio de ordenación personalizado.
* El método sort() toma una función de comparación como argumento, que define el criterio de ordenación. En este caso, la función de comparación compara dos canciones a y b en función de sus títulos.
* Dentro de la función de comparación, se utilizan varias declaraciones if para comparar los títulos de las canciones a y b.
* Si el título de la canción a es alfabéticamente anterior al título de la canción b, la función de comparación devuelve -1. Esto indica que a debe aparecer antes que b en la lista ordenada.
* Si el título de la canción a es alfabéticamente posterior al título de la canción b, la función de comparación devuelve 1. Esto indica que b debe aparecer antes que a en la lista ordenada.
* Si los títulos de las canciones a y b son iguales, la función de comparación devuelve 0. Esto indica que el orden relativo de a y b no importa en la lista ordenada.
* Una vez que se ha realizado la clasificación, se devuelve el array de canciones ordenado utilizando nuevamente el operador de encadenamiento opcional.
*/
const getCurrentSongIndex = () => {
  return userData?.songs.indexOf(userData?.currentSong);
}
/*
* Se define una función de flecha llamada getCurrentSongIndex utilizando la sintaxis de arrow function () => { ... }.
* Dentro de la función getCurrentSongIndex, se utiliza el operador de encadenamiento opcional (?.) para acceder a la propiedad songs del objeto userData. Si userData es null o undefined, la expresión retornará undefined. Esto previene errores si userData no está definido.
* Después de acceder a la propiedad songs de userData, se llama al método indexOf() del array songs. Este método busca el índice de la canción actual (currentSong) dentro del array de canciones. Si la canción actual no está en el array, el método indexOf() retornará -1.
* El resultado de indexOf() es retornado por la función getCurrentSongIndex(). Si la canción actual está presente en el array de canciones, se retorna su índice. Si no, se retorna -1.
*/

// Funciones del reproductor 

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  }
  else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");
  audio.play();
}
/*
* La función playSong toma un parámetro id, que representa el identificador único de la canción que se va a reproducir.
* Dentro de la función, se utiliza el método find() en el array de canciones almacenado en el objeto userData para encontrar la canción que coincida con el id proporcionado.
* La función de flecha pasada como argumento a find() compara cada canción en el array de canciones con el id proporcionado. Devuelve la primera canción que coincida con el id o undefined si ninguna canción coincide.
* Si se encuentra una canción con el id proporcionado, se almacena en la variable song.
* A continuación, se actualiza la fuente (src) y el título de la etiqueta de audio (audio) con los valores de la canción encontrada.
* Se realiza una comprobación para determinar si la canción que se está reproduciendo actualmente es la misma que la que se va a reproducir. Si la canción actual es null o si el id de la canción actual es diferente del id de la canción que se va a reproducir, se establece el tiempo de reproducción (currentTime) del audio en 0 para reiniciar la canción desde el principio. De lo contrario, se establece el tiempo de reproducción en el tiempo en el que se había pausado anteriormente.
* Se actualiza la propiedad currentSong del objeto userData con la canción que se va a reproducir.
* Se agrega la clase CSS "playing" al botón de reproducción (playButton) para indicar que la canción se está reproduciendo.
* Por último, se llama al método play() en el elemento de audio (audio) para comenzar la reproducción de la canción.
*/

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove('playing');
  audio.pause()
}
/*
* Se define una función de flecha llamada pauseSong utilizando la sintaxis de arrow function () => { ... }.
* Dentro de la función pauseSong, se asigna el valor de la propiedad currentTime del objeto audio a la propiedad songCurrentTime del objeto userData. Esto se realiza para guardar el momento de reproducción actual de la canción, lo que permite reanudar la reproducción desde el mismo punto cuando se vuelva a reproducir la canción.
* Se utiliza el método classList.remove() para eliminar la clase CSS 'playing' del elemento playButton. Esta clase generalmente se usa para indicar visualmente que la canción se está reproduciendo. Al eliminar esta clase, se actualiza la apariencia del botón de reproducción para indicar que la canción está en pausa.
* Finalmente, se llama al método pause() del objeto audio para detener la reproducción de la canción.
*/
const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id)
  }
  else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1]
    playSong(nextSong.id);
  }
}
// Llamada a funciones

renderSongs(sortSongs());

// Registro de eventos

playButton.addEventListener('click', () => {
  if (!userData?.currentSong) {
    playSong(userData?.songs[0].id)
  }
  else {
    playSong(userData?.currentSong.id)
  }
});
/*
* Se utiliza el método addEventListener() para agregar un evento de escucha al botón de reproducción (playButton). Este evento se activará cuando el botón sea clicado.
* El primer argumento del método addEventListener() es el tipo de evento que se está escuchando, en este caso, 'click', que indica que el evento se activará cuando el botón sea clicado.
* El segundo argumento es una función de flecha (() => { ... }) que se ejecutará cuando se active el evento. Esta función de flecha no tiene parámetros.
* Dentro de la función de flecha, se realiza una comprobación utilizando un operador de negación (!) junto con el operador de encadenamiento opcional (?.). Esta comprobación verifica si la propiedad currentSong del objeto userData es null o undefined.
* Si userData?.currentSong es null o undefined, significa que no hay ninguna canción actualmente en reproducción. En este caso, se llama a la función playSong() con el id de la primera canción en el array de canciones almacenado en userData.
* Si userData?.currentSong tiene un valor (es decir, hay una canción actualmente en reproducción), se llama a la función playSong() con el id de la canción actual.
*/
pauseButton.addEventListener('click', pauseSong);
nextButton.addEventListener('click', playNextSong);