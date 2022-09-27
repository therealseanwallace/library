/* eslint-disable no-plusplus */
// eslint-disable-next-line prefer-const
let bookArray = [];
const selectBookDiv = document.querySelector('.books');

const modal = document.querySelector('.modal');

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

function clearBooks() {
  while (selectBookDiv.firstChild) {
    selectBookDiv.removeChild(selectBookDiv.lastChild);
  }
}

function drawBooks() {
  clearBooks();
  bookArray.forEach((item) => { // Create a div for every book
    const newCard = document.createElement('div');
    newCard.classList.add('book-card');
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
  });
}

function newBook() {
  const form = document.getElementById('new-book-form');
  const newTitle = new Book(form[0].value, form[1].value, form[2].value, form[3].value);
  bookArray.push(newTitle);
  console.log(bookArray);
  drawBooks();
}

(() => {
  const newTitle = document.querySelector('.new-book');
  const closeButton = document.querySelector('.close-button');
  const submit = document.querySelector('.submit-button');
  newTitle.addEventListener('click', toggleModal);
  closeButton.addEventListener('click', toggleModal);
  window.addEventListener('click', windowOnClick);
  submit.addEventListener('click', newBook);
  submit.addEventListener('click', toggleModal);
})();

(() => {
  newBook('The Lord of the Rings', 'JRR Tolkien', 1178, 1954);
})();
