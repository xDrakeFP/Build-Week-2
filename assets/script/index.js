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

        risultatiRicerca.innerHTML += `
       <div class="row align-items-center my-3">
                  <div class="col col-3">
                    <img
                      alt="cover"
                      src=${data.data[i].album.cover_big}
                      class="w-100"
                    />
                  </div>
                  <div class="col col-6">
                   <a href='javascript:void(0)' class='text-decoration-none text-white'> <h2>${data.data[i].title_short}</h2></a>
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
