// Class Book

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Class UI

class UI {
    static displayBook() {

        const books = Store.getBook();

        // books.forEach((book) => UI.addBookToList(book));
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        let row = document.createElement('tr');

        let list = document.getElementById('book-list');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete" 
            style="font-family: cursive";>X</a></td>
        `;

        list.appendChild(row);
    }

    // ----- Remove Book
    static removeBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    // ---- clear field
    static clearField() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    // ----- showALERT  
    static showAlert(msg, value) {
        let div = document.createElement('div');
        div.className = `alert alert-${value}`;

        div.appendChild(document.createTextNode(msg));

        let container = document.querySelector('.container');

        let form = document.getElementById('book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// ----- Store Data 
class Store {
    static getBook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBooks(isbn) {
        const books = Store.getBook();
        books.forEach((book, index) => {
            if (book.isbn == isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBook);

// ADD Book Listiner

document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let isbn = document.getElementById('isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill the block', 'danger');
    } else {
        let book = new Book(title, author, isbn);

        UI.addBookToList(book);

        Store.addBook(book);

        UI.clearField();

        UI.showAlert('Book Added.', 'success');
    }

})

// Remove Book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.removeBook(e.target);
    // console.log(e.target);
    UI.showAlert('Book Deleted.', 'success');

    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
})