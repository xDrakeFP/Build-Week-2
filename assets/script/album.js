window.addEventListener('scroll', function () {
  if (window.innerWidth <= 768) {
    var scrollPosition = window.scrollY;
    var imgAlbum = document.querySelector('.img-album');
    var scale = 1 - scrollPosition / 500; // regola il valore 500 per adattarlo alle tue esigenze
    if (scale < 0) scale = 0;
    imgAlbum.style.transform = 'scale(' + scale + ')';
  }
});
