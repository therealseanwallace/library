function createNewBook() {
  console.log('createNewBook triggered');
}

let bookArray = [];
bookArray.push({
  name: 'The Lord of the Rings',
  author: 'JRR Tolkien',
  pages: '1178',
  published: '27/09/1954',
});



// Add event listeners //
const modal = document.querySelector('.modal');

(() => {
  const newBook = document.querySelector('.new-book');
  const closeButton = document.querySelector('.close-button');
  newBook.addEventListener('click', toggleModal);
  closeButton.addEventListener('click', toggleModal);
  window.addEventListener('click', windowOnClick);
})();

// Modal logic //

function toggleModal() {
  console.log('modal toggle clicked');
  modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}