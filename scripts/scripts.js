/* eslint-disable no-plusplus */
// eslint-disable-next-line prefer-const
let bookArray = [];
const selectBookDiv = document.querySelector('.books');
const modal = document.querySelector('.modal');

function insertDemoBook() {
  bookArray[0] = {
    title: 'The Lord of the Rings',
    author: 'JRR Tolkien',
    pageCount: 1178,
    pubDate: 1954,
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

function drawBooks() {
  let bookRef = 0;
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
    newCard.append(thisTitle, thisAuthor, thisPages, thisPubDate);
    selectBookDiv.append(newCard);
    bookRef++;
  });
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

function Book(title, author, pageCount, pubDate) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.pubDate = pubDate;
  this.read = false;
  function toggleRead() {
    this.read = !this.read;
  }
}

function newBook() {
  const form = document.getElementById('new-book-form');
  const newTitle = new Book(form[0].value, form[1].value, form[2].value, form[3].value);
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
