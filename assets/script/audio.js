// Elementi player
const audio = document.getElementById("audioPlayer");
const playBtn = document.querySelector(".bi-play-circle-fill");
const progressBar = document.querySelector(".progress-bar");
const currentTimeEl = document.querySelectorAll(".small.text-secondary")[0];
const durationEl = document.querySelectorAll(".small.text-secondary")[1];

// Stato
let isPlaying = false;

// Riproduzione manuale
playBtn.addEventListener("click", () => {
  if (audio.src === "") return;

  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

// Aggiorna icona play/pause
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

// Aggiorna barra di avanzamento
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Formatta i secondi in MM:SS
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Funzione player aggiornata per ricevere preview Deezer
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
