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
  const selectRead = document.querySelector(`.read-container${bookDataId}`);
  const selectUnread = document.querySelector(`.unread-container${bookDataId}`);
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
  let colorCode = 0;
  clearBooks();
  bookArray.forEach((item) => {
    colorCode++;
    const newCard = document.createElement('div');
    newCard.classList.add('book-card');
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title-div');
    switch (colorCode) {
      case 1:
        titleDiv.classList.add('chinese-black');
        break;
      case 2:
        titleDiv.classList.add('raisin-black');
        break;
      case 3:
        titleDiv.classList.add('black');
        break;
      default:
        titleDiv.classList.add('vampire-black');
        colorCode = 0;
        break;
    }
    const thisTitle = document.createElement('h3');
    thisTitle.textContent = item.title;
    const thisAuthor = document.createElement('h4');
    thisAuthor.textContent = item.author;
    titleDiv.append(thisTitle, thisAuthor);
    newCard.append(titleDiv);
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '<img src="images/close-thick.svg">';
    closeButton.addEventListener('click', deleteBook);
    newCard.append(closeButton);
    newCard.dataset.bookid = `${bookRef}`;
    const thisPages = document.createElement('p');
    thisPages.textContent = `Pages: ${item.pageCount}`;
    const thisPubDate = document.createElement('p');
    thisPubDate.textContent = `Publication date: ${item.pubDate}`;
    const readContainer = document.createElement('div');
    const unReadContainer = document.createElement('div');
    const readText = document.createElement('p');
    const unReadText = document.createElement('p');
    readContainer.classList.add(`read-container${bookRef}`, 'read-unread', 'read-container');
    unReadContainer.classList.add(`unread-container${bookRef}`, 'read-unread', 'unread-container');
    readContainer.append(readText);
    unReadContainer.append(unReadText);
    readText.innerHTML = `<span class="read${bookRef} read-display">Read</span>`;
    unReadText.innerHTML = `<span class="unread${bookRef} unread-display">Unread</span>`;
    const readButton = document.createElement('input');
    readButton.type = 'button';
    readButton.value = 'Toggle Read';
    readButton.addEventListener('click', toggleRead);
    newCard.append(thisPages, thisPubDate, readContainer, unReadContainer, readButton);
    selectBookDiv.append(newCard);
    if (item.read === true) {
      const hide = document.querySelector(`.unread-container${bookRef}`);
      hide.classList.add('hide');
    } else {
      const hide = document.querySelector(`read-container${bookRef}`);
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

function clearForm() {
  const selectForm = document.querySelectorAll('.new-book-input');
  console.log(selectForm);
  selectForm.forEach((input) => {
    console.log(input);
    // eslint-disable-next-line no-param-reassign
    input.value = '';
  });
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
  clearForm();
  drawBooks();
}

(() => {
  document.querySelector('.new-book-button').addEventListener('click', toggleModal);
  document.querySelector('.modal-close-button').addEventListener('click', toggleModal);
  const submit = document.querySelector('.submit-button');
  window.addEventListener('click', windowOnClick);
  submit.addEventListener('click', newBook);
  submit.addEventListener('click', toggleModal);
  clearForm();
})();
