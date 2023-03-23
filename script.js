/* eslint max-classes-per-file: ["error", 2] */
const booksList = document.getElementById('library');
const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const time = document.getElementById('time');
const list = document.getElementById('list');
const formSection = document.getElementById('BookList');
const contact = document.getElementById('contact');
const listLink = document.getElementById('listLink');
const formLink = document.getElementById('formLink');
const contactLink = document.getElementById('contactLink');

formSection.style.display = 'none';
contact.style.display = 'none';

function Form() {
  formSection.style.display = 'block';
  contact.style.display = 'none';
  list.style.display = 'none';
}

function Contact() {
  contact.style.display = 'block';
  formSection.style.display = 'none';
  list.style.display = 'none';
}

function List() {
  list.style.display = 'block';
  formSection.style.display = 'none';
  contact.style.display = 'none';
}

formLink.addEventListener('click', Form);
contactLink.addEventListener('click', Contact);
listLink.addEventListener('click', List);

setInterval(() => {
  const date = new Date();
  time.innerHTML = date.toLocaleTimeString();
}, 1000);

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }
}

class Books {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    this.saveBks();
    this.renderBks();
  }

  removeBk(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  saveBks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  getBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
    return [];
  }

  renderBks() {
    booksList.innerHTML = '';
    this.books.forEach((book) => {
      booksList.innerHTML += `
          <li class="book-item">
              <p> ${book.title} by ${book.author} </p>
              <button class="remove-btn" data-id="${book.id}" onclick="remove(${book.id})"> Remove </button>
          </li>
          `;
    });
  }
}

const books = new Books();

const remove = (id) => {
  books.removeBk(id);
  books.saveBks();
  books.renderBks();
};

form.onsubmit = (e) => {
  e.preventDefault();
  books.addBook(new Book(title.value, author.value));
  List();
  form.reset();
};

books.getBooks();
books.renderBks();
const removeBtns = document.querySelectorAll('.remove-btn');
removeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    remove(btn.dataset.id);
    books.saveBks();
    books.renderBks();
  });
});
