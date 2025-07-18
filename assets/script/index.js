const endSearch =
  " https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const endAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";

const endArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";

fetch(endSearch + "/" + "rock")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("errore");
    }
  })
  .then((data) => {
    console.log(data);
    const mainRow = document.getElementById("mainRow");
    for (let i = 0; i < 6; i++) {
      let id = data.data[i].album.id;
      let strId = id.toString();
      mainRow.innerHTML += `
        <div class="col-6 col-md-4 ">
                 <a href='./album.html?id=${strId}' class='text-decoration-none text-white d-flex align-items-center'> <img
                    src=${data.data[i].album.cover_big}
                    alt="Foto Playlist"
                    class="card-img-left img-fluid rounded-start"
                    width="64"
                    height="64"
                  />

                  <p class="card-text text-truncate fw-semibold duerighe ms-2">
                    ${data.data[i].album.title}
                  </p>
                </div></a>
        `;
    }
  })
  .catch((er) => {
    console.log(er);
  });

fetch(endSearch + "/" + "pop")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("errore");
    }
  })
  .then((data) => {
    console.log(data);
    const secondRow = document.getElementById("secondRow");
    for (let i = 0; i < 8; i++) {
      let id = data.data[i].album.id;
      let strId = id.toString();
      secondRow.innerHTML += `
       <div class="col col-12 col-md-6 col-lg-3" >
                  <a href="./album.html?id=${strId}" class="text-decoration-none text-white"
                    ><div class="card bg-dark" >
                      <img src=${data.data[i].album.cover_big} class="card-img-top" alt="cover" />
                      <div class="card-body" style='height: 170px;'>
                        <h5 class="card-title text-light">${data.data[i].album.title}</h5>
                      </div>
                    </div></a
                  >
                </div>
      `;
    }
  })
  .catch((er) => {
    console.log(er);
  });

// funzione di ricerca
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore");
      }
    })
    .then((data) => {
      console.log(data);
      risultatiRicerca.innerHTML = "";
      for (let i = 0; i < data.data.length; i++) {
        let minutes = Math.floor(data.data[i].duration / 60);
        let seconds = Math.floor(data.data[i].duration % 60);
        if (minutes < 10) {
          minutes = "0" + minutes.toString();
        } else {
          minutes = minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds.toString();
        } else {
          seconds = seconds;
        }

        let title = data.data[i].title_short.replace(/'/g, "\\'");
        let artist = data.data[i].artist.name.replace(/'/g, "\\'");
        let imageUrl = data.data[i].album.cover_big;
        let preview = data.data[i].preview;

        risultatiRicerca.innerHTML += `
       <div class="row align-items-center my-3">
                  <div class="col col-3">
                    <a href='./album.html?id=${data.data[
                      i
                    ].album.id.toString()}'><img
                      alt="cover"
                      src=${data.data[i].album.cover_big}
                      class="w-100"
                    /></a>
                  </div>
                  <div class="col col-6">
                   <a href='javascript:void(0)' class='text-decoration-none text-white'
                   onclick="player('${title}', '${artist}', '${imageUrl}', '${preview}')"
                   > <h2>${data.data[i].title_short}</h2></a>
                  </div>
                  <div class="col col-2">
                    <h5>${minutes}: ${seconds}</h5>
                  </div>
                </div>
      `;
      }
      e.target.reset();
    })
    .catch((er) => {
      console.log(er);
    });
});

const closeSearch = function () {
  Risultati.classList.add("d-none");
  risultatiRicerca.innerHTML = "";
};

/*
const player = function (title, artist, imageUrl) {
  document.getElementById("playerImg").src = imageUrl;
  document.getElementById("playerTitle").innerText = title;
  document.getElementById("playerArtist").innerText = artist;
}; */

// --------------------- Player Audio Control ---------------------

const audio = document.getElementById("audioPlayer");
const playBtn = document.querySelector(".bi-play-circle-fill");
const progressBar = document.querySelector(".progress-bar");
const currentTimeEl = document.querySelectorAll(".small.text-secondary")[0];
const durationEl = document.querySelectorAll(".small.text-secondary")[1];
const playBtnMob = document.getElementById("playBtnMob");

let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

playBtnMob.addEventListener("click", () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

audio.addEventListener("play", () => {
  isPlaying = true;
  playBtn.classList.remove("bi-play-circle-fill");
  playBtn.classList.add("bi-pause-circle-fill");
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playBtn.classList.remove("bi-pause-circle-fill");
  playBtn.classList.add("bi-play-circle-fill");
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

// --------------------- Funzione player ---------------------

const player = function (title, artist, imageUrl, audioUrl) {
  document.getElementById("playerImg").src = imageUrl;
  document.getElementById("playerTitle").innerText = title;
  document.getElementById("playerArtist").innerText = artist;

  if (audioUrl) {
    audio.src = audioUrl;
    audio.play();
  } else {
    audio.pause();
    audio.src = "";
  }
};
//avvio colori player

const element = document.getElementById("color");
const playButton = document.getElementById("playPauseBtn");
const timerElement = document.getElementById("currentTime");

let colorIndex = 0;
const colors = ["yellow", "lime", "white"];
let animationSpeed = 1;
let startTime = null;
let animationFrameId = null;
let isAnimating = false;
let timerStart = null;

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${min}:${sec}`;
}

function animate(currentTime) {
  if (!startTime) {
    startTime = currentTime;
    timerStart = currentTime;
  }

  const elapsedTime = currentTime - startTime;
  const elapsedSeconds = (currentTime - timerStart) / 1000;

  // Aggiorna timer visivo
  timerElement.textContent = formatTime(elapsedSeconds);

  // Cambia colore ogni 2 secondi
  if (elapsedTime > 2000) {
    startTime = currentTime;
    colorIndex = (colorIndex + 1) % colors.length;
    element.style.color = colors[colorIndex];
  }

  // Alterna velocità (rimasta fissa a 1 in questo caso)
  animationSpeed = 1;

  // Applica trasformazione
  element.style.transform = `scale(${animationSpeed})`;

  animationFrameId = requestAnimationFrame(animate);
}

// Toggle play/stop
playButton.addEventListener("click", () => {
  if (isAnimating) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  } else {
    startTime = null;
    timerStart = null;
    timerElement.textContent = "00:00";
    animationFrameId = requestAnimationFrame(animate);
    isAnimating = true;
  }
});
