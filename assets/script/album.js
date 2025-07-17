const parameters = new URLSearchParams(window.location.search);
const albumId = parameters.get("id");

const endSearch =
  " https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const endAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";

const endArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const content = document.getElementById("lista");
const albumImg = document.querySelector("#container-img img");
const titoloAlbum = document.querySelectorAll(".titolo-album-d");
const titoloAlbum2 = document.querySelector("#titolo-album");
const artistaAlbum = document.querySelectorAll(".artista-album");
const annoAlbum = document.querySelectorAll(".anno-album");
const numeroTracce = document.querySelectorAll(".numero-tracce");
const durataAlbum = document.querySelectorAll(".durata-album");

console.log(albumId);
fetch(endAlbum + "/" + albumId)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("errore");
    }
  })
  .then((data) => {
    console.log(data);
    const tracksArray = data.tracks.data;
    console.log(tracksArray);
    console.log(content);
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
      albumDuration = albumDuration + tracksArray[i].duration;
    }

    let albumMinutes = Math.floor(albumDuration / 60);
    let albumSeconds = Math.floor(albumDuration % 60);

    durataAlbum[0].innerText =
      albumMinutes.toString() + " min" + " " + albumSeconds.toString() + " sec";

    for (let i = 0; i < tracksArray.length; i++) {
      minutes = Math.floor(tracksArray[i].duration / 60);
      seconds = Math.floor(tracksArray[i].duration % 60);

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

      content.innerHTML += `
        <div class="row">
                      <div class="col d-none d-lg-block col-lg-1">
                        <p class="text-white text-center">${i + 1}</p>
                      </div>
                      <div class="col col-11 col-lg-5">
                        <a href='javascript:void(0)' class='text-decoration-none'><p class="text-white mb-1">${
                          tracksArray[i].title_short
                        }</p></a>
                       <a href='./artist.html?id=${tracksArray[
                         i
                       ].artist.id.toString()}' class='text-decoration-none'> <p class="text-secondary">${
        tracksArray[i].artist.name
      }</p></a>
                      </div>
                      <div class="col d-none d-lg-block col-lg-3">
                        <p class="text-white text-center">${Math.ceil(
                          Math.random() * 1000000000
                        )}</p>
                      </div>
                      <div class="col d-none d-lg-block col-lg-3">
                        <p class="text-white text-center">${minutes}: ${seconds}</p>
                      </div>
                    </div>
        `;
    }
  })
  .catch((er) => {
    console.log(er);
  });
window.addEventListener("scroll", function () {
  if (window.innerWidth <= 768) {
    var scrollPosition = window.scrollY;
    var imgAlbum = document.querySelector(".img-album");
    var scale = 1 - scrollPosition / 500; // regola il valore 500 per adattarlo alle tue esigenze
    if (scale < 0) scale = 0;
    imgAlbum.style.transform = "scale(" + scale + ")";
  }
});
