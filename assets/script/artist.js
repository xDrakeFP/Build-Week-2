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

        content.innerHTML += `
      <div class="d-flex align-items-center my-4">
                <h4>${i + 1}</h4>
                <img
                  src=${data1.data[i].album.cover_big}
                  class="ms-4"
                  height="100"
                  width="100"
                  alt="Album"
                />
                <div class="d-flex flex-column flex-grow-1 ms-4 flex-lg-row">
                  <h5 style="width: 15em" class='me-4'>${
                    data1.data[i].title
                  }</h5>

                  <p style="width: 4em" class="flex-lg-grow-1 text-center">Views</p>
                  <p class="d-none d-lg-block">${minutes}: ${seconds}</p>
                </div>
                <button
                  type="button"
                  class="btn btn-dark text-secondary d-lg-none"
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
                  </svg>
                </button>
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
