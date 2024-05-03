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
    <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})">
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
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return userData?.songs;
};
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
};
/*
 * Se define una función de flecha llamada getCurrentSongIndex utilizando la sintaxis de arrow function () => { ... }.
 * Dentro de la función getCurrentSongIndex, se utiliza el operador de encadenamiento opcional (?.) para acceder a la propiedad songs del objeto userData. Si userData es null o undefined, la expresión retornará undefined. Esto previene errores si userData no está definido.
 * Después de acceder a la propiedad songs de userData, se llama al método indexOf() del array songs. Este método busca el índice de la canción actual (currentSong) dentro del array de canciones. Si la canción actual no está en el array, el método indexOf() retornará -1.
 * El resultado de indexOf() es retornado por la función getCurrentSongIndex(). Si la canción actual está presente en el array de canciones, se retorna su índice. Si no, se retorna -1.
 */
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};
/*
 * Se define una función de flecha llamada setPlayerDisplay utilizando la sintaxis de arrow function () => { ... }.
 * Dentro de la función setPlayerDisplay, se seleccionan los elementos del reproductor de música (el título de la canción y el artista) utilizando document.getElementById(). Estos elementos se almacenan en las variables playingSong y songArtist, respectivamente. Estos elementos son identificados por sus id en el documento HTML ('player-song-title' y 'player-song-artist').
 * Se accede a la información de la canción actual (currentTitle y currentArtist) desde el objeto userData?.currentSong. Se utiliza el operador de encadenamiento opcional (?.) para evitar errores si userData o userData.currentSong son null o undefined.
 * Se asigna el texto del título de la canción (currentTitle) al contenido de texto del elemento playingSong utilizando playingSong.textContent = currentTitle ? currentTitle : "";. Esto significa que si currentTitle es diferente de null, undefined o una cadena vacía, se asignará a playingSong.textContent, de lo contrario, se asignará una cadena vacía.
 * Se asigna el texto del artista de la canción (currentArtist) al contenido de texto del elemento songArtist utilizando songArtist.textContent = currentArtist ? currentArtist : "";. Esto significa que si currentArtist es diferente de null, undefined o una cadena vacía, se asignará a songArtist.textContent, de lo contrario, se asignará una cadena vacía.
 */
const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};
/*
 * Se define una función de flecha llamada setPlayButtonAccessibleText utilizando la sintaxis de arrow function () => { ... }.
 * Dentro de la función setPlayButtonAccessibleText, se accede a la información de la canción actual (song) desde el objeto userData?.currentSong. Se utiliza el operador de encadenamiento opcional (?.) para evitar errores si userData o userData.currentSong son null o undefined. Si userData.currentSong es null o undefined, se asigna la primera canción del array userData.songs a la variable song.
 * Se utiliza el método setAttribute() para establecer el atributo aria-label del botón de reproducción (playButton). Este atributo se utiliza para proporcionar una etiqueta accesible para el botón, que se leerá en voz alta por los lectores de pantalla.
 * El valor del atributo aria-label se establece en función de la información de la canción actual (song). Si song.title existe y no es una cadena vacía, se asigna la etiqueta "Play [nombre de la canción]" al atributo aria-label. De lo contrario, se asigna la etiqueta "Play".
 */

// Funciones del reproductor

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");
  audio.play();
  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};
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
  playButton.classList.remove("playing");
  audio.pause();
};
/*
 * Se define una función de flecha llamada pauseSong utilizando la sintaxis de arrow function () => { ... }.
 * Dentro de la función pauseSong, se asigna el valor de la propiedad currentTime del objeto audio a la propiedad songCurrentTime del objeto userData. Esto se realiza para guardar el momento de reproducción actual de la canción, lo que permite reanudar la reproducción desde el mismo punto cuando se vuelva a reproducir la canción.
 * Se utiliza el método classList.remove() para eliminar la clase CSS 'playing' del elemento playButton. Esta clase generalmente se usa para indicar visualmente que la canción se está reproduciendo. Al eliminar esta clase, se actualiza la apariencia del botón de reproducción para indicar que la canción está en pausa.
 * Finalmente, se llama al método pause() del objeto audio para detener la reproducción de la canción.
 */
const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};
/*
 * Se define una función de flecha llamada playNextSong utilizando la sintaxis de arrow function () => { ... }.
 * Dentro de la función playNextSong, se verifica si userData?.currentSong es null utilizando el operador de encadenamiento opcional (?.). Si userData?.currentSong es null, significa que no hay ninguna canción actualmente reproduciéndose.
 * Si no hay una canción actual (userData?.currentSong === null), se llama a la función playSong() con el id de la primera canción en el array de canciones (userData?.songs[0].id). Esto inicia la reproducción de la primera canción en la lista.
 * Si hay una canción actual (userData?.currentSong !== null), se obtiene el índice de la canción actual llamando a la función getCurrentSongIndex(). Esta función retorna el índice de la canción actual en el array de canciones.
 * Se utiliza el índice de la canción actual para acceder a la siguiente canción en el array de canciones. Esto se logra sumando 1 al índice actual y accediendo al elemento correspondiente en el array de canciones: userData?.songs[currentSongIndex + 1].
 * Se llama a la función playSong() con el id de la siguiente canción (nextSong.id). Esto inicia la reproducción de la siguiente canción en la lista.
 */
const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    return;
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};
/*
 * Se define una función de flecha llamada playPreviousSong utilizando la sintaxis de arrow function () => { ... }.
 * Dentro de la función playPreviousSong, se verifica si userData?.currentSong es null utilizando el operador de encadenamiento opcional (?.). Si userData?.currentSong es null, significa que no hay ninguna canción actualmente reproduciéndose.
 * Si no hay una canción actual (userData?.currentSong === null), la función simplemente termina y no hace nada más (return). Esto evita intentar reproducir la canción anterior cuando no hay ninguna canción actual.
 * Si hay una canción actual (userData?.currentSong !== null), se obtiene el índice de la canción actual llamando a la función getCurrentSongIndex(). Esta función retorna el índice de la canción actual en el array de canciones.
 * Se utiliza el índice de la canción actual para acceder a la canción anterior en el array de canciones. Esto se logra restando 1 al índice actual y accediendo al elemento correspondiente en el array de canciones: userData?.songs[currentSongIndex - 1].
 * Se llama a la función playSong() con el id de la canción anterior (previousSong.id). Esto inicia la reproducción de la canción anterior en la lista.
 */
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );
  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
    if (songToHighlight) {
      songToHighlight.setAttribute("aria-current", "true");
    }
  });
};
/*
 * Se define una función de flecha llamada highlightCurrentSong utilizando la sintaxis de arrow function () => { ... }.
 * Dentro de la función highlightCurrentSong, se seleccionan todos los elementos de canción de la lista de reproducción utilizando document.querySelectorAll('.playlist-song'). Esto devuelve una NodeList que contiene todos los elementos con la clase CSS .playlist-song.
 * Se intenta encontrar el elemento de la canción actual (songToHighlight) utilizando el id de la canción actual almacenado en userData?.currentSong?.id. Se accede al elemento de la canción actual utilizando document.getElementById(), pasando el id de la canción actual.
 * Se itera sobre todos los elementos de la lista de reproducción usando playlistSongElements.forEach((songEl) => { ... }). Esto permite recorrer todos los elementos de la lista de reproducción para realizar operaciones en cada uno de ellos.
 * Para cada elemento de canción (songEl), se elimina el atributo aria-current utilizando songEl.removeAttribute('aria-current'). Esto asegura que ningún elemento de canción tenga el estado de "actual" antes de resaltar la canción actual.
 * Se verifica si songToHighlight (el elemento de la canción actual) existe. Si existe, se le añade el atributo aria-current con el valor 'true' utilizando songToHighlight.setAttribute('aria-current', 'true'). Esto resalta visualmente la canción actual para que los usuarios puedan identificarla fácilmente.
 */
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};
/*
 * Se define una función de flecha llamada shuffle utilizando la sintaxis de arrow function () => { ... }.
 * Dentro de la función shuffle, se utiliza el método sort() en el array de canciones userData?.songs. Este método ordena aleatoriamente las canciones reordenando los elementos del array. La función de comparación pasada como argumento devuelve un número negativo, positivo o cero de manera aleatoria, lo que provoca que los elementos se reordenen de forma aleatoria.
 * Se asigna null a la propiedad currentSong del objeto userData, lo que indica que no hay una canción actualmente seleccionada después de la operación de mezcla.
 * Se restablece el tiempo de reproducción de la canción actual (songCurrentTime) a 0, lo que asegura que la canción comience desde el principio cuando se reproduzca después de la mezcla.
 * Se llama a la función renderSongs() para volver a representar la lista de canciones en la interfaz de usuario con el nuevo orden aleatorio.
 * Se llama a la función pauseSong() para pausar la reproducción de la canción actual, si está reproduciéndose.
 * Se llama a la función setPlayerDisplay() para actualizar la visualización del reproductor de música en la interfaz de usuario con la información de la canción actual, que ahora es null debido a la operación de mezcla.
 * Se llama a la función setPlayButtonAccessibleText() para actualizar el atributo aria-label del botón de reproducción en la interfaz de usuario, proporcionando una etiqueta accesible adecuada después de la operación de mezcla.
 */
const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  }
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");
    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];
    });
    renderSongs(sortSongs());
    setPlayButtonAccessibleText();
    resetButton.remove();
  }
  /*
   * Condición: userData?.songs.length === 0
   * Verifica si la longitud de la lista de canciones (userData?.songs.length) es igual a cero, lo que significa que no hay canciones en la lista.
   * Acciones dentro del bloque if:
   * Crear botón de reseteo: Se crea un nuevo elemento de botón utilizando document.createElement('button').
   * Configurar propiedades del botón: Se le asigna un ID (reset) al botón y se establece un atributo aria-label ("Reset playlist").
   * Agregar texto al botón: Se crea un nodo de texto con el texto "Reset Playlist" utilizando document.createTextNode('Reset Playlist') y se agrega al botón creado.
   * Agregar botón al DOM: Se agrega el botón al final del elemento con la clase playlistSongs utilizando playlistSongs.appendChild(resetButton).
   * Agregar evento de click al botón: Se añade un event listener para escuchar el evento de click en el botón. Cuando se hace clic en el botón, se restaura la lista de canciones (userData.songs) a la lista completa de canciones (allSongs).
   * Renderizar y actualizar la interfaz de usuario:
   * Se llama a renderSongs(sortSongs()) para renderizar las canciones ordenadas.
   * Se llama a setPlayButtonAccessibleText() para actualizar el texto accesible del botón de reproducción.
   * Eliminar el botón de reseteo: Después de restaurar la lista de canciones y actualizar la interfaz de usuario, se elimina el botón de reseteo del DOM utilizando resetButton.remove().
   */
};
/*
 * Primero, verifica si la canción que se está eliminando es la canción actualmente en reproducción. Compara el id de la canción actual (userData?.currentSong?.id) con el id proporcionado como argumento. Si coinciden, significa que se está eliminando la canción actual.
 * Si la canción actual se está eliminando, se restablece userData.currentSong a null y userData.songCurrentTime a 0.
 * Luego, llama a la función pauseSong() para detener la reproducción de la canción actual.
 * Finalmente, llama a la función setPlayerDisplay() para actualizar la visualización del reproductor de música.
 * Después de eso, utiliza el método filter() en userData?.songs para eliminar la canción con el id proporcionado. La función de devolución de llamada del método filter() comprueba si el id de cada canción es diferente al id proporcionado como argumento. Si es así, se mantiene la canción en el nuevo array resultante.
 * El nuevo array filtrado se asigna de nuevo a userData.songs.
 * Luego, llama a la función renderSongs() para actualizar la visualización de la lista de canciones.
 * Después, llama a la función highlightCurrentSong() para resaltar la canción actualmente seleccionada en la lista de canciones.
 * Finalmente, llama a la función setPlayButtonAccessibleText() para actualizar el texto accesible del botón de reproducción en caso de que se haya eliminado la canción actualmente en reproducción.
 */

// Llamada a funciones

renderSongs(sortSongs());

// Registro de eventos

playButton.addEventListener("click", () => {
  if (!userData?.currentSong) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
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
pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);
audio.addEventListener('ended', () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = currentSongIndex < userData?.songs.length - 1;
  if (nextSongExists) {
    playNextSong()
  }
  else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
  }
  pauseSong();
  setPlayerDisplay()
  highlightCurrentSong();
  setPlayButtonAccessibleText();
});