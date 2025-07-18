// URL di base
const parameters = new URLSearchParams(window.location.search);
const artistId = parameters.get("id");

const endSearch =
  " https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const endAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";

const endArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";

const headerImg = document.getElementById("bgArtist");
const headerArtist = document.getElementById("nomeArtista");
const content = document.getElementById("content");
const mainImgs = document.querySelectorAll("main img");
const Avatar = document.getElementById("Avatar");
let imgSrc = "";

let tracklist = "";

// Creazione oggetto Audio
const audio = new Audio();
let isPlaying = false;

// Selezione bottone play/pause tramite classe fissa (da aggiungere nel tuo HTML)
const playBtn = document.querySelector(".play-toggle");
const progressBar = document.querySelector(".progresso-canzone .progress-bar");
const startTime = document.querySelectorAll(".small.text-secondary")[0];
const endTime = document.querySelectorAll(".small.text-secondary")[1];

// Funzione per ottenere la traccia dell'artista e popolare la lista
const getTracks = function () {
  fetch(tracklist)
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error("errore");
    })
    .then((data1) => {
      document.getElementById("hide").classList.toggle("d-none");
      content.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        let duration = data1.data[i].duration;
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        let title = data1.data[i].title.replace(/'/g, "\\'");
        let artist = data1.data[i].artist.name.replace(/'/g, "\\'");
        let imageUrl = data1.data[i].album.cover_big;
        let preview = data1.data[i].preview;

        content.innerHTML += `
  <div class="d-flex align-items-center my-4">
  <span style="width:1em" class="fs-4">${i + 1}</span>
    <a href='./album.html?id=${data1.data[
      i
    ].album.id.toString()}'><img src="${imageUrl}" class="ms-4" height="100" width="100" alt="Album" /></a>
    <div class="d-flex flex-column flex-grow-1 ms-4 flex-xxl-row">
      <a href='javascript:void(0)' class='click text-decoration-none text-white'
        onclick="player('${title}', '${artist}', '${imageUrl}', '${preview}')">
        <h5 style="width: 8em" class='me-4 text-white'>${title}</h5>
      </a>
      <p style="width: 4em" class="flex-lg-grow-1 text-center">${Math.ceil(
        Math.random() * 5000000000
      )}</p>
      <p class="d-none d-xxl-block">${minutes}:${seconds}</p>
    </div>
    <button
                type="button"
                class="btn btn-dark text-secondary px-3 py-2 order-lg-3 d-lg-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                  />
                </svg></button
              >
  </div>
`;
      }

      document.getElementById("show").classList.remove("d-none");
    })

    .catch((er) => {
      console.log(er);
    });
};
getTracks();

// Ottenimento dati artista
const getArtist = function () {
  fetch(endArtist + "/" + artistId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore");
      }
    })
    .then((data) => {
      tracklist = data.tracklist;
      headerImg.setAttribute("src", data.picture_big);
      Avatar.setAttribute("src", data.picture_big);
      headerArtist.innerText = `${data.name}`;
      getTracks();
    })
    .catch((er) => console.log(er));
};

getArtist();

// Gestione apertura barra ricerca
const showBarBtn = document.getElementById("showBar");
const searchBar = document.getElementById("searchBar");
const showBarMob = document.getElementById("showBarMob");
const risultatiRicerca = document.getElementById("risultatiRicerca");
const searchForm = document.getElementById("searchForm");
const searchInput = document.querySelector("form input");
const Risultati = document.getElementById("Risultati");

showBarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchBar.classList.toggle("d-none");
});

showBarMob.addEventListener("click", (e) => {
  e.preventDefault();
  searchBar.classList.toggle("d-none");
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  Risultati.classList.remove("d-none");
  fetch(endSearch + searchInput.value)
    .then((res) => (res.ok ? res.json() : Promise.reject("errore")))
    .then((data) => {
      risultatiRicerca.innerHTML = "";
      for (let i = 0; i < data.data.length; i++) {
        let minutes = Math.floor(data.data[i].duration / 60);
        let seconds = Math.floor(data.data[i].duration % 60);
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        let title = data.data[i].title_short.replace(/'/g, "\\'");
        let artist = data.data[i].artist.name.replace(/'/g, "\\'");
        let imageUrl = data.data[i].album.cover_big;
        let preview = data.data[i].preview;

        risultatiRicerca.innerHTML += `
       <div class="row align-items-center my-3">
          <div class="col col-3">
            <a href='./album.html?id=${data.data[i].album.id}'><img src=${imageUrl} class="w-100" /></a>
          </div>
          <div class="col col-6">
            <a href='javascript:void(0)' class='text-decoration-none text-white'
               onclick="player('${title}', '${artist}', '${imageUrl}', '${preview}')">
              <h2>${title}</h2></a>
          </div>
          <div class="col col-2">
            <h5>${minutes}:${seconds}</h5>
          </div>
        </div>`;
      }
      e.target.reset();
    })
    .catch((er) => console.log(er));
});

const closeSearch = function () {
  Risultati.classList.add("d-none");
  risultatiRicerca.innerHTML = "";
};

// Gestione click bottone play/pause
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playBtn.classList.remove("bi-pause-circle-fill");
    playBtn.classList.add("bi-play-circle-fill");
  } else {
    audio.play().catch((err) => console.error("Errore riproduzione:", err));
    isPlaying = true;
    playBtn.classList.remove("bi-play-circle-fill");
    playBtn.classList.add("bi-pause-circle-fill");
  }
});

playBtnMob.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playBtn.classList.remove("bi-pause-circle-fill");
    playBtn.classList.add("bi-play-circle-fill");
  } else {
    audio.play().catch((err) => console.error("Errore riproduzione:", err));
    isPlaying = true;
    playBtn.classList.remove("bi-play-circle-fill");
    playBtn.classList.add("bi-pause-circle-fill");
  }
});

// Gestione aggiornamento barra di progresso e tempo
audio.addEventListener("timeupdate", () => {
  const duration = audio.duration || 0;
  const currentTime = audio.currentTime || 0;
  const percentage = (currentTime / duration) * 100;
  progressBar.style.width = `${percentage}%`;
  startTime.innerText = formatTime(currentTime);
  endTime.innerText = formatTime(duration);
});

// Funzione per formattare il tempo (mm:ss)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

const goBack = function () {
  window.history.back();
};

const showMore = function () {
  fetch(tracklist)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore");
      }
    })
    .then((data1) => {
      console.log(data1);
      for (let i = 5; i < data1.data.length; i++) {
        let duration = data1.data[i].duration;
        let minutes = Math.floor(duration / 60);
        if (minutes < 10) {
          minutes = "0" + minutes.toString();
        } else {
          minutes = minutes;
        }

        let seconds = Math.floor(duration % 60);
        if (seconds < 10) {
          seconds = "0" + seconds.toString();
        } else {
          seconds = seconds;
        }
        //funzione che genera html dinamico
        let title = data1.data[i].title.replace(/'/g, "\\'");
        let artist = data1.data[i].artist.name.replace(/'/g, "\\'");
        let imageUrl = data1.data[i].album.cover_big;
        let previewUrl = data1.data[i].preview;

        content.innerHTML += `
  <div class="d-flex align-items-center my-4">
  <span style="width:1em" class="fs-4">${i + 1}</span>
    <img src="${imageUrl}" class="ms-4" height="100" width="100" alt="Album" />
    <div class="d-flex flex-column flex-grow-1 ms-4 flex-xxl-row">
      <a href='javascript:void(0)' class='click text-decoration-none text-white'
        onclick="player('${title}', '${artist}', '${imageUrl}','${previewUrl}')">
        <h5 style="width: 8em" class='me-4 text-white'>${title}</h5>
      </a>
      <p style="width: 4em" class="flex-lg-grow-1 text-center  ">${Math.ceil(
        Math.random() * 5000000000
      )}</p>
      <p class="d-none d-xxl-block">${minutes}:${seconds}</p>
    </div>
    <button
                type="button"
                class="btn btn-dark text-secondary px-3 py-2 order-lg-3 d-lg-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                  />
                </svg></button
              >
  </div>
`;
      }

      document.getElementById("show").classList.toggle("d-none");
      document.getElementById("hide").classList.toggle("d-none");
    })

    .catch((er) => {
      console.log(er);
    });
};
// Funzione principale del player audio
const player = function (title, artist, imageUrl, audioUrl) {
  console.log("URL audio:", audioUrl); // debug
  document.getElementById("playerImg").src = imageUrl;
  document.getElementById("playerTitle").innerText = title;
  document.getElementById("playerArtist").innerText = artist;
  audio.src = audioUrl;
  audio.play().catch((err) => console.error("Errore riproduzione audio:", err));
  isPlaying = true;
  playBtn.classList.remove("bi-play-circle-fill");
  playBtn.classList.add("bi-pause-circle-fill");
};

playBtnMob;
