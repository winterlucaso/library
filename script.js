// To Do:
// - add general functionality for isRead
// - link reader stats to individual book stats

const myLibrary = [];

const table = document.querySelector("table");
const booksContainer = document.querySelector("#container-books");

// -- Book Constructor --
class Book {
    constructor (title, author, pageCount, isRead, id) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.isRead = isRead;
        this.id = id;
    }
}

// ----- Form Stuff -----
// addBook, confirm, and cancel
const addBookBtn = document.getElementById("addBookBtn");
const addBookDialog = document.getElementById("addBookDialog");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");

// Receive form inputs
const form = document.getElementById('form');
const bookTitle = document.getElementById("book_title");
const bookAuthor = document.getElementById("book_author");
const bookPages = document.getElementById("book_pages");
const bookReadStatus = document.getElementById("book_read_status");

addBookBtn.addEventListener("click", () => { // addBookBtn EventListener
    addBookDialog.showModal();
});

confirmBtn.addEventListener('click', (e) => { // confirmBtn EventListener
    let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookReadStatus.checked); // Create book instance

    addBookToLibrary(book);
    clearLibraryDOM();
    addLibraryToDOM();
    clearFormInputs();

    addBookDialog.close(); // Close modal
    e.preventDefault(); // We don't want to submit this fake form
});

cancelBtn.addEventListener('click', (e) => { // Cancel Button
    clearFormInputs();
    addBookDialog.close();
    // e.preventDefault();
});

// ----- FUNCTIONS -----
function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log("Adding '" + book.title + "' at index: " + (myLibrary.length - 1))
    console.log(myLibrary);
}

function removeBookFromLibrary(num) {
    myLibrary.splice(num, 1);
    clearLibraryDOM();
    addLibraryToDOM();
    updateStats();
}

function clearLibraryDOM() {
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.lastChild);
    }
}

function addLibraryToDOM() {
    for (let book = 0; book < myLibrary.length; book++) {
        myLibrary[book].id = book; // Assign an id number to each book
        addBookToDOM(myLibrary[book]);
    }
}

function addBookToDOM(book) {
    const bookRow = document.createElement('tr'); // Table row
    booksContainer.appendChild(bookRow);

    const bookTitle = document.createElement('td'); // Title
    bookTitle.innerText = book.title;
    bookRow.append(bookTitle);

    const bookAuthor = document.createElement('td'); // Author
    bookAuthor.innerText = book.author;
    bookRow.append(bookAuthor);

    const bookPageCount = document.createElement('td'); // Page count
    bookPageCount.innerText = book.pageCount;
    bookRow.append(bookPageCount);

    const bookReadStatus = document.createElement('td'); // Read status
    bookReadStatus.innerText = book.isRead;
    bookRow.append(bookReadStatus);

    const bookRemoveCell = document.createElement('td'); // RemoveBtn
    const bookRemoveBtn = document.createElement('button');
    bookRemoveBtn.classList.add("remove-btn");
    bookRemoveBtn.innerText = "X";
    bookRemoveBtn.dataset.bookNum = book.id; // Attaches data value to the removeBtn
    bookRemoveBtn.addEventListener('click', (e) => {
        console.log("Removing '" + book.title + "' at index: " + bookRemoveBtn.dataset.bookNum);
        removeBookFromLibrary(bookRemoveBtn.dataset.bookNum);
    });
    bookRow.append(bookRemoveCell);
    bookRemoveCell.append(bookRemoveBtn);
}

function clearFormInputs() {
    bookTitle.value = ""; 
    bookAuthor.value = "";
    bookPages.value = "";
    bookReadStatus.checked = "";
}

// ----- Stats -----
const totalBooks = document.querySelector("#total-books"); // Tracks total books in library

function updateStats() { // Updates sidebar stats
    totalBooks.innerText = myLibrary.length;
}

// Script
// Starter Book
let starterBook = new Book("The Hobbit", "J. R. R. Tolkein", 310, "Read");

addBookToLibrary(starterBook); // add to myLibrary array
clearLibraryDOM(); // clear DOM
addLibraryToDOM(); // reload DOM from myLibrary array
updateStats(); // update stats
