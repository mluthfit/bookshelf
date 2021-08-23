window.addEventListener('load', function() {
  if (typeof(Storage) !== 'undefined') {
    onBeforeRender();
    if (localStorage.getItem(allBook) === null) {
      localStorage.setItem(allBook, '')
    } else {
      data = JSON.parse(localStorage.getItem(allBook));
      renderAllBooks();
    } 
  } else window.alert('Kamu tidak dapat mengakses web ini!');
});

const forms = document.getElementsByTagName('form');
forms[0].addEventListener('submit', function() {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const finished = document.getElementById('finishedReading').checked;

  const newBook = createObjectBook(title, author, year, finished);
  data.push(newBook);
  localStorage.setItem(allBook, JSON.stringify(data));
  
  document.getElementById('searchTitle').value = '';
  onBeforeRender();  
  renderAllBooks();

  title.value = '';
  author.value = '';
  year.value = '';
})

forms[1].addEventListener('submit', function() {
  event.preventDefault();
  onBeforeRender();
  renderData();
})

const addEventTrash = () => {
  const trashs = document.querySelectorAll('#deleteBook');

  for (let trash of trashs) {
    trash.addEventListener('click', function() {
      const id = trash.parentNode.parentNode.getAttribute('id');
      dialogBox.setAttribute('id', id);
      dialogBox.style.display = "flex";
    });
  }
}

const addEventMoveToUnread = () => {
  const moveUnreads = document.querySelectorAll('#moveToUnread');

  for (let moveUnread of moveUnreads) {
    moveUnread.addEventListener('click', function() {
      const id = moveUnread.parentNode.parentNode.getAttribute('id');
      const bookIndex = searchBookObjectById(id);
      data[bookIndex].isCompleted = false;
      localStorage.setItem(allBook, JSON.stringify(data));
      
      const bookView = searchBookViewById(id);
      bookView.remove();
      onBeforeRender();
      renderData();
      checkEmpty();
    });
  }
}

const addEventMoveRead = () => {
  const moveReads = document.querySelectorAll('#moveToDone');

  for (let moveRead of moveReads) {
    moveRead.addEventListener('click', function() {
      const id = moveRead.parentNode.parentNode.getAttribute('id');
      const bookIndex = searchBookObjectById(id);
      data[bookIndex].isCompleted = true;
      localStorage.setItem(allBook, JSON.stringify(data));
      
      const bookView = searchBookViewById(id);
      bookView.remove();
      onBeforeRender();
      renderData();
      checkEmpty();
    });
  }
}

const checkEmpty = () => {
  const listUnread = document.querySelectorAll('#listBookUnread .book');
  const listRead = document.querySelectorAll('#listBookRead .book');
  if (listUnread.length === 1) {
    hiddenEmptyUnread(false);
  }

  if (listRead.length === 1) {
    hiddenEmptyRead(false);
  }
}