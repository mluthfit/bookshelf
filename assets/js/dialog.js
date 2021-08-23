const dialogBox = document.getElementById('dialog');
const invalid = document.getElementById('invalid');
const success = document.getElementById('success');

invalid.addEventListener('click', function() {
  dialogBox.style.display = "none";
});

success.addEventListener('click', function() {
  const id = success.parentNode.parentNode.parentNode.getAttribute('id');
  const bookIndex = searchBookObjectById(id);

  data.splice(bookIndex, 1);
  localStorage.setItem(allBook, JSON.stringify(data));

  dialogBox.style.display = "none";
  onBeforeRender();
  renderData();
  checkEmpty();
});

window.onclick = function(event) {
  if (event.target == dialogBox) {
    dialogBox.style.display = "none";
  }
}