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

const getTracks = function () {
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
      for (let i = 0; i < data1.data.length; i++) {
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

        content.innerHTML += `
  <div class="d-flex align-items-center my-4">
  <span style="width:1em" class="fs-4">${i + 1}</span>
    <img src="${imageUrl}" class="ms-4" height="100" width="100" alt="Album" />
    <div class="d-flex flex-column flex-grow-1 ms-4 flex-lg-row">
      <a href='javascript:void(0)' class='click text-decoration-none text-white'
        onclick="player('${title}', '${artist}', '${imageUrl}')">
        <h5 style="width: 15em" class='me-4 text-white'>${title}</h5>
      </a>
      <p style="width: 4em" class="flex-lg-grow-1 text-center">Views</p>
      <p class="d-none d-lg-block">${minutes}:${seconds}</p>
    </div>
    
  </div>
  
`;
      }
    })
    .catch((er) => {
      console.log(er);
    });
};

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
      console.log(data);
      tracklist = data.tracklist;

      headerImg.setAttribute("src", data.picture_big);
      Avatar.setAttribute("src", data.picture_big);
      headerArtist.innerText = `${data.name}`;

      getTracks();
    })
    .catch((er) => {
      console.log(er);
    });
};

getArtist();

//Funzione per caricare sulla barra player un altra traccia
const addTitile = document.querySelector("click");

const player = function (title, artist, imageUrl) {
  document.getElementById("playerImg").src = imageUrl;
  document.getElementById("playerTitle").innerText = title;
  document.getElementById("playerArtist").innerText = artist;
};
