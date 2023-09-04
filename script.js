// To Do:
// - add switch for isRead on book cards
// - link reader stats to individual book stats
// - add a "remove" button to book cards

const form = document.getElementById('form');
const table = document.querySelector("table");

const addBookBtn = document.getElementById("addBookBtn");
const addBookDialog = document.getElementById("addBookDialog");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");

const myLibrary = [];

// -- Book Constructor --
class Book {
    constructor (title, author, pageCount, isRead) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.isRead = isRead;
    }
}

// -- Form Stuff --
// Receive Book Button
addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal();
});

confirmBtn.addEventListener('click', (e) => {
    console.log("submit recognized");

    // Receive form inputs
    const bookTitle = document.getElementById("book_title");
    const bookAuthor = document.getElementById("book_author");
    const bookPages = document.getElementById("book_pages");
    const bookReadStatus = document.getElementById("book_read_status");

    // Create book instance
    let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookReadStatus.value);

    addBookToLibrary(book); // add to myLibrary array
    addBookCard(book); // add card to DOM

    // Clears form
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookReadStatus.value = "";

    addBookDialog.close(); // Close modal

    e.preventDefault(); // We don't want to submit this fake form
});

cancelBtn.addEventListener('click', (e) => {
    addBookDialog.close();
    // e.preventDefault();
});

// Add book to myLibrary array
function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

// Create book card and add to DOM
function addBookCard(book) {
    const bookRow = document.createElement('tr');
    // bookRow.classList.add("book");
    table.appendChild(bookRow);

    const bookTitle = document.createElement('td');
    // bookTitle.classList.add("book-title");
    bookTitle.innerText = book.title;
    bookRow.append(bookTitle);

    const bookAuthor = document.createElement('td');
    // bookAuthor.classList.add("book-author");
    bookAuthor.innerText = book.author;
    bookRow.append(bookAuthor);

    const bookPageCount = document.createElement('td');
    // bookPageCount.classList.add("book-page-count");
    bookPageCount.innerText = book.pageCount;
    bookRow.append(bookPageCount);

    const bookReadStatus = document.createElement('td');
    // bookReadStatus.classList.add("book-read-status");
    bookReadStatus.innerText = book.isRead;
    bookRow.append(bookReadStatus);


}