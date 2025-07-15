const endSearch =
  " https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const endAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";

const endArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const parameters = new URLSearchParams(window.location.search);
const albumId = parameters.get("id");

const getAlbum = function () {
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
    })
    .catch((er) => {
      console.log(er);
    });
};

getAlbum();
