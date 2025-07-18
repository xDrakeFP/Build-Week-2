const save = document
  .querySelector('form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    const nomeUtente = document.getElementById('nomeUtente').value;
    localStorage.setItem('nomeUtente', nomeUtente);
    window.location.href = 'index.html';
  });

const nome = function () {
  const nomeUtente = localStorage.getItem('nomeUtente');
  if (nomeUtente) {
    const user = document.getElementById('user');
    user.innerText = nomeUtente;
  }
};

const deleteName = function () {
  localStorage.removeItem('nomeUtente');
};
