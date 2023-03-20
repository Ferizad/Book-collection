const list = document.getElementById('list');
const form = document.getElementById('book-form');

let books = [];

function Books() {
  localStorage.setItem('books', JSON.stringify(books));
}

function getSetBooks() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
  return [];
}

function renBooks() {
  list.innerHTML = '';
  books.forEach((book) => {
    list.innerHTML += `
        <li> 
        <h3> ${book.title} </h3>
        <h3> ${book.author} </h3>
        <button onclick="remove(${book.id})">Remove</button>
        <hr/>
        </li>
        `;
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const newBook = {
    id: books.length + 1,
    title: title || 'No title',
    author: author || 'No author',
  };
  books.push(newBook);
  Books();
  renBooks();
  form.reset();
};

//  eslint-disable-next-line no-unused-vars

function remove(id) {
  books = books.filter((book) => book.id !== id);
  Books();
  renBooks();
}

getSetBooks();
renBooks();
remove();
