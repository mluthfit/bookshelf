const allBook = 'ALL_BOOKS';
let data = [];

const createObjectBook = (title, author, year, isCompleted) => {
  return {
    id: +new Date(),
    title,
    author,
    year: parseInt(year),
    isCompleted,
  };
}

const createBookView = (newBook) => {
  const unreadBook = document.getElementById('listBookUnread');
  const readBook = document.getElementById('listBookRead');

  if (newBook.isCompleted) {
    let view = `
      <div class="book" id=${newBook.id}>
        <h4>${newBook.title}</h4>
        <p>Author: ${newBook.author}</p>
        <p>Year: ${newBook.year}</p>
        <span class="action-btn">
          <i id="moveToUnread" class="fas fa-arrow-up"></i>
          <i id="deleteBook" class="fas fa-trash"></i>
        </span>
      </div>
    `;

    readBook.innerHTML += view;
  } else {
    let view = `
      <div class="book" id=${newBook.id}>
        <h4>${newBook.title}</h4>
        <p>Author: ${newBook.author}</p>
        <p>Year: ${newBook.year}</p>
        <span class="action-btn">
          <i id="moveToDone" class="fas fa-check"></i>
          <i id="deleteBook" class="fas fa-trash"></i>
        </span>
      </div>
    `;
    unreadBook.innerHTML += view;
  }

}

const renderAllBooks = () => {
  for (let i = 0; i < data.length; i++) {
    createBookView(data[i]);

    if (data[i].isCompleted) hiddenEmptyRead(true);
    else hiddenEmptyUnread(true);
  }

  addEventTrash();
  addEventMoveToUnread();
  addEventMoveRead();
}

const hiddenEmptyRead = (isHidden) => {
  document.getElementById('emptyRead').hidden = isHidden;
}

const hiddenEmptyUnread = (isHidden) => {
  document.getElementById('emptyUnread').hidden = isHidden;
}

const searchBookObjectById = (id) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) return i;
  }
  return -1;
}

const searchBookViewById = (id) => {
  if (document.getElementById(id)) return document.getElementById(id);
  return false;
}

const onBeforeRender = () => {
  const unreadBook = document.getElementById('listBookUnread');
  const readBook = document.getElementById('listBookRead');

  unreadBook.innerHTML = `
    <div class="book" id="emptyUnread">
      <h4>Empty</h4>
    </div>
  `;

  readBook.innerHTML = `
    <div class="book" id="emptyRead">
      <h4>Empty</h4>
    </div>
  `;
}

const renderbookByTitle = (title) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].title.toLowerCase().includes(title.toLowerCase())) {
      createBookView(data[i]);

      if (data[i].isCompleted) hiddenEmptyRead(true);
      else hiddenEmptyUnread(true);
    }
  }

  addEventTrash();
  addEventMoveToUnread();
  addEventMoveRead();
}

const renderData = () => {
  const searchTitle = document.getElementById('searchTitle');
  if (searchTitle.value) renderbookByTitle(searchTitle.value);
  else renderAllBooks();
}