const parameters = new URLSearchParams(window.location.search);
const albumId = parameters.get("id");

const endSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const endAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";

const content = document.getElementById("lista");
const albumImg = document.querySelector("#container-img img");
const titoloAlbum = document.querySelectorAll(".titolo-album-d");
const titoloAlbum2 = document.querySelector("#titolo-album");
const artistaAlbum = document.querySelectorAll(".artista-album");
const annoAlbum = document.querySelectorAll(".anno-album");
const numeroTracce = document.querySelectorAll(".numero-tracce");
const durataAlbum = document.querySelectorAll(".durata-album");

fetch(endAlbum + "/" + albumId)
  .then((res) => {
    if (res.ok) return res.json();
    else throw new Error("errore");
  })
  .then((data) => {
    const tracksArray = data.tracks.data;
    albumImg.setAttribute("src", data.cover_big);
    titoloAlbum[0].innerText = data.title;
    titoloAlbum2.innerText = data.title;
    artistaAlbum[0].innerText = data.artist.name;
    artistaAlbum[1].innerText = data.artist.name;
    annoAlbum[0].innerText = data.release_date.slice(0, -6);
    annoAlbum[1].innerText = data.release_date.slice(0, -6);
    numeroTracce[0].innerText = tracksArray.length.toString() + " brani";

    let albumDuration = 0;
    for (let i = 0; i < tracksArray.length; i++) {
      albumDuration += tracksArray[i].duration;
    }
    let albumMinutes = Math.floor(albumDuration / 60);
    let albumSeconds = Math.floor(albumDuration % 60);
    durataAlbum[0].innerText = `${albumMinutes} min ${albumSeconds} sec`;

    for (let i = 0; i < tracksArray.length; i++) {
      let minutes = Math.floor(tracksArray[i].duration / 60);
      let seconds = Math.floor(tracksArray[i].duration % 60);
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      let title = tracksArray[i].title_short.replace(/'/g, "\\'");
      let artist = tracksArray[i].artist.name.replace(/'/g, "\\'");
      let imageUrl = tracksArray[i].album.cover_big;
      let previewUrl = tracksArray[i].preview;

      content.innerHTML += `
        <div class="row">
          <div class="col d-none d-lg-block col-lg-1">
            <p class="text-white text-center">${i + 1}</p>
          </div>
          <div class="col col-11 col-lg-5">
            <a href='javascript:void(0)' class='text-decoration-none'
              onclick="player('${title}', '${artist}', '${imageUrl}', '${previewUrl}')">
              <p class="text-white mb-1">${tracksArray[i].title_short}</p>
            </a>
            <a href='./artist.html?id=${
              tracksArray[i].artist.id
            }' class='text-decoration-none'>
              <p class="text-secondary">${tracksArray[i].artist.name}</p>
            </a>
          </div>
          <div class="col d-none d-lg-block col-lg-3">
            <p class="text-white text-center">${Math.ceil(
              Math.random() * 1000000000
            )}</p>
          </div>
          <div class="col d-none d-lg-block col-lg-3">
            <p class="text-white text-center">${minutes}:${seconds}</p>
          </div>
        </div>`;
    }
  })
  .catch((er) => console.log(er));

// --------------------- Player Audio Control ---------------------

const audio = document.getElementById("audioPlayer");
const playBtn = document.querySelector(".bi-play-circle-fill");
const progressBar = document.querySelector(".progress-bar");
const currentTimeEl = document.querySelectorAll(".small.text-secondary")[0];
const durationEl = document.querySelectorAll(".small.text-secondary")[1];

let isPlaying = false;

playBtn.addEventListener("click", () => {
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
