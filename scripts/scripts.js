/* eslint-disable no-plusplus */
// eslint-disable-next-line prefer-const
let bookArray = [];
const selectBookDiv = document.querySelector('.books');
const modal = document.querySelector('.modal');
let bookRef = 0;
function insertDemoBook() {
  bookArray[0] = {
    title: 'The Lord of the Rings',
    author: 'JRR Tolkien',
    pageCount: 1178,
    pubDate: 1954,
    read: true,
  };
}

function clearBooks() {
  while (selectBookDiv.firstChild) {
    selectBookDiv.removeChild(selectBookDiv.lastChild);
  }
}

function deleteBook(e) {
  const bookDataId = e.target.parentElement.getAttribute('data-bookid');
  console.log(bookDataId);
  const bookToDelete = document.querySelector(`[data-bookid="${bookDataId}"]`);
  bookToDelete.remove();
}

function toggleRead(e) {
  const bookDataId = e.target.parentElement.getAttribute('data-bookid');
  const selectRead = document.querySelector(`.read${bookDataId}`);
  const selectUnread = document.querySelector(`.unread${bookDataId}`);
  if (bookArray[bookDataId].read === true) {
    bookArray[bookDataId].read = false;
    selectRead.classList.add('hide');
    selectUnread.classList.remove('hide');
  } else {
    bookArray[bookDataId].read = true;
    selectRead.classList.remove('hide');
    selectUnread.classList.add('hide');
  }
  console.log(bookArray[bookDataId].read);
}

function drawBooks() {
  clearBooks();
  bookArray.forEach((item) => {
    const newCard = document.createElement('div');
    newCard.classList.add('book-card');
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '❌';
    closeButton.addEventListener('click', deleteBook);
    newCard.append(closeButton);
    newCard.dataset.bookid = `${bookRef}`;
    const thisTitle = document.createElement('h3');
    thisTitle.textContent = item.title;
    const thisAuthor = document.createElement('p');
    thisAuthor.textContent = `Author: ${item.author}`;
    const thisPages = document.createElement('p');
    thisPages.textContent = `Pages: ${item.pageCount}`;
    const thisPubDate = document.createElement('p');
    thisPubDate.textContent = `Publication date: ${item.pubDate}`;
    const readUnread = document.createElement('p');
    readUnread.innerHTML = `<span class="read${bookRef}">Read</span><span class="unread${bookRef}">Unread</span>`;
    const readButton = document.createElement('input');
    readButton.type = 'button';
    readButton.value = 'Toggle Read';
    readButton.addEventListener('click', toggleRead);
    newCard.append(thisTitle, thisAuthor, thisPages, thisPubDate, readUnread, readButton);
    selectBookDiv.append(newCard);
    if (item.read === true) {
      const hide = document.querySelector(`.unread${bookRef}`);
      hide.classList.add('hide');
    } else {
      const hide = document.querySelector(`.read${bookRef}`);
      hide.classList.add('hide');
    }
    bookRef++;
  });
  bookRef = 0;
}

function reset() {
  clearBooks();
  bookArray = [];
  insertDemoBook();
  drawBooks();
}

(() => {
  reset();
})();

function toggleModal() {
  modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

function Book(title, author, pageCount, pubDate, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.pubDate = pubDate;
  this.read = read;
}

function newBook() {
  const form = document.getElementById('new-book-form');
  const newTitle = new Book(
    form[0].value,
    form[1].value,
    form[2].value,
    form[3].value,
    form[4].checked,
  );
  bookArray.push(newTitle);
  console.log(bookArray);
  drawBooks();
}

(() => {
  document.querySelector('.new-book').addEventListener('click', toggleModal);
  document.querySelector('.close-button').addEventListener('click', toggleModal);
  const submit = document.querySelector('.submit-button');
  window.addEventListener('click', windowOnClick);
  submit.addEventListener('click', newBook);
  submit.addEventListener('click', toggleModal);
})();
