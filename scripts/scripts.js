// eslint-disable-next-line prefer-const
let bookArray = [];

// Book constructor function //
function Book(title, author, pageCount, published) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.published = published;
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
}

function drawBooks() {
  
}

function clearBooks() {
  const selectBookDiv = document.querySelector('.books');
  while (selectBookDiv.firstChild) {
    selectBookDiv.removeChild(selectBookDiv.lastChild);
  }
}

// Modal and event listeners //
const modal = document.querySelector('.modal');

function toggleModal() {
  modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}


(() => {
  const newTitle = document.querySelector('.new-book');
  const closeButton = document.querySelector('.close-button');
  const submit = document.querySelector('.submit-button');
  newTitle.addEventListener('click', toggleModal);
  closeButton.addEventListener('click', toggleModal);
  window.addEventListener('click', windowOnClick);
  submit.addEventListener('click', newBook);
})();
