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
