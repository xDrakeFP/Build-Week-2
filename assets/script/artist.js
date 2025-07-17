const parameters = new URLSearchParams(window.location.search);
const artistId = parameters.get('id');

const endSearch =
  ' https://striveschool-api.herokuapp.com/api/deezer/search?q=';
const endAlbum = 'https://striveschool-api.herokuapp.com/api/deezer/album';

const endArtist = 'https://striveschool-api.herokuapp.com/api/deezer/artist';

const headerImg = document.getElementById('bgArtist');
const headerArtist = document.getElementById('nomeArtista');
const content = document.getElementById('content');
const mainImgs = document.querySelectorAll('main img');
const Avatar = document.getElementById('Avatar');
let imgSrc = '';

let tracklist = '';

const getTracks = function () {
  document.getElementById('hide').classList.toggle('d-none');
  fetch(tracklist)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('errore');
      }
    })
    .then((data1) => {
      console.log(data1);
      content.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        let duration = data1.data[i].duration;
        let minutes = Math.floor(duration / 60);
        if (minutes < 10) {
          minutes = '0' + minutes.toString();
        } else {
          minutes = minutes;
        }

        let seconds = Math.floor(duration % 60);
        if (seconds < 10) {
          seconds = '0' + seconds.toString();
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
    <div class="d-flex flex-column flex-grow-1 ms-4 flex-xxl-row">
      <a href='javascript:void(0)' class='click text-decoration-none text-white'
        onclick="player('${title}', '${artist}', '${imageUrl}')">
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

      document.getElementById('show').classList.remove('d-none');
    })

    .catch((er) => {
      console.log(er);
    });
};

const getArtist = function () {
  fetch(endArtist + '/' + artistId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('errore');
      }
    })
    .then((data) => {
      console.log(data);
      tracklist = data.tracklist;
      console.log(tracklist);
      headerImg.setAttribute('src', data.picture_big);
      Avatar.setAttribute('src', data.picture_big);
      headerArtist.innerText = `${data.name}`;

      getTracks();
    })
    .catch((er) => {
      console.log(er);
    });
};

getArtist();

// funzione di ricerca
const showBarBtn = document.getElementById('showBar');
const searchBar = document.getElementById('searchBar');
const showBarMob = document.getElementById('showBarMob');
const risultatiRicerca = document.getElementById('risultatiRicerca');
const searchForm = document.getElementById('searchForm');
const searchInput = document.querySelector('form input');
const Risultati = document.getElementById('Risultati');

showBarBtn.addEventListener('click', (e) => {
  e.preventDefault();
  searchBar.classList.toggle('d-none');
});

showBarMob.addEventListener('click', (e) => {
  e.preventDefault();
  searchBar.classList.toggle('d-none');
});

/* searchForm.addEventListener("submit", (e) => {
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
                   <a href='javascript:void(0)' class='text-decoration-none text-white'
                   
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
}); */

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  Risultati.classList.remove('d-none');
  fetch(endSearch + searchInput.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('errore');
      }
    })
    .then((data) => {
      console.log(data);
      risultatiRicerca.innerHTML = '';
      for (let i = 0; i < data.data.length; i++) {
        let minutes = Math.floor(data.data[i].duration / 60);
        let seconds = Math.floor(data.data[i].duration % 60);
        if (minutes < 10) {
          minutes = '0' + minutes.toString();
        } else {
          minutes = minutes;
        }
        if (seconds < 10) {
          seconds = '0' + seconds.toString();
        } else {
          seconds = seconds;
        }

        let title = data.data[i].title_short.replace(/'/g, "\\'");
        let artist = data.data[i].artist.name.replace(/'/g, "\\'");
        let imageUrl = data.data[i].album.cover_big;

        risultatiRicerca.innerHTML += `
       <div class="row align-items-center my-3">
                  <div class="col col-3">
                    <a href='./album.html?id=${data.data[
                      i
                    ].album.id.toString()}'><img
                      alt="cover"
                      src=${imageUrl}
                      class="w-100"
                    /></a>
                  </div>
                  <div class="col col-6">
                   <a href='javascript:void(0)' class='text-decoration-none text-white'
                   onclick="player('${title}', '${artist}', '${imageUrl}')"
                   > <h2>${title}</h2></a>
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
  Risultati.classList.add('d-none');
  risultatiRicerca.innerHTML = '';
};
//Funzione per caricare sulla barra player un altra traccia
const addTitile = document.querySelector('click');

const player = function (title, artist, imageUrl) {
  document.getElementById('playerImg').src = imageUrl;
  document.getElementById('playerTitle').innerText = title;
  document.getElementById('playerArtist').innerText = artist;
};

const goBack = function () {
  window.history.back();
};

const showMore = function () {
  fetch(tracklist)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('errore');
      }
    })
    .then((data1) => {
      console.log(data1);
      for (let i = 5; i < data1.data.length; i++) {
        let duration = data1.data[i].duration;
        let minutes = Math.floor(duration / 60);
        if (minutes < 10) {
          minutes = '0' + minutes.toString();
        } else {
          minutes = minutes;
        }

        let seconds = Math.floor(duration % 60);
        if (seconds < 10) {
          seconds = '0' + seconds.toString();
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
    <div class="d-flex flex-column flex-grow-1 ms-4 flex-xxl-row">
      <a href='javascript:void(0)' class='click text-decoration-none text-white'
        onclick="player('${title}', '${artist}', '${imageUrl}')">
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

      document.getElementById('show').classList.toggle('d-none');
      document.getElementById('hide').classList.toggle('d-none');
    })

    .catch((er) => {
      console.log(er);
    });
};
