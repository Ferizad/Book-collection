/* eslint max-classes-per-file: ["error", 2] */
const list = document.getElementById('list');
const form = document.getElementById('book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');

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
    this.svBooks();
    this.renBooks();
  }

  remBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  svBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  getBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
    return [];
  }

  renBooks() {
    list.innerHTML = '';
    this.books.forEach((book) => {
      list.innerHTML += `
          <li class="book-item">
              <p> ${book.title} by ${book.author} </p>
              <button class="btn" data-id="${book.id}" onclick="remove(${book.id})"> Remove </button>
          </li>
          `;
    });
  }
}

const books = new Books();

const remove = (id) => {
  books.remBook(id);
  books.svBooks();
  books.renBooks();
};

form.onsubmit = (e) => {
  e.preventDefault();
  books.addBook(new Book(title.value, author.value));
  form.reset();
};

books.getBooks();
books.renBooks();
const removeBtns = document.querySelectorAll('.btn');
removeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    remove(btn.dataset.id);
    books.svBooks();
    books.renBooks();
  });
});
