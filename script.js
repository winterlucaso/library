// To Do:
// - add switch for isRead on book cards
// - link reader stats to individual book stats
// - add a "remove" button to book cards

const myLibrary = [];

const form = document.getElementById('form');
const table = document.querySelector("table");
const booksContainer = document.querySelector("#container-books");

const addBookBtn = document.getElementById("addBookBtn");
const addBookDialog = document.getElementById("addBookDialog");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");

const totalBooks = document.querySelector("#total-books");

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

// -- Form Stuff --
// Add Book Button
addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal();
});

// Confirm Button
confirmBtn.addEventListener('click', (e) => {
    // Receive form inputs
    const bookTitle = document.getElementById("book_title");
    const bookAuthor = document.getElementById("book_author");
    const bookPages = document.getElementById("book_pages");
    const bookReadStatus = document.getElementById("book_read_status");

    // Create book instance
    let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookReadStatus.value);

    addBookToLibrary(book); // add to myLibrary array
    clearLibraryDOM(); // clear DOM
    addLibraryToDOM(); // reload DOM from myLibrary array

    // Clears form
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookReadStatus.value = "";

    addBookDialog.close(); // Close modal

    e.preventDefault(); // We don't want to submit this fake form
});

// Cancel Button
cancelBtn.addEventListener('click', (e) => {
    addBookDialog.close();
    // e.preventDefault();
});

// Add book to myLibrary array
function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log("Adding '" + book.title + "' at index: " + (myLibrary.length - 1))
    console.log(myLibrary);
}

// clears DOM
function clearLibraryDOM() {
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.lastChild);
    }
}

// adds entire myLibrary to DOM
function addLibraryToDOM() {
    for (let book = 0; book < myLibrary.length; book++) {
        myLibrary[book].id = book; // assign a data value to the book
        addBookToDOM(myLibrary[book]);
    }
}

// Create HTML book elements and add to DOM
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
    bookRemoveBtn.addEventListener('click', (e) => { // Adds event listener to removeBtn
        console.log("Removing '" + book.title + "' at index: " + bookRemoveBtn.dataset.bookNum);
        removeBookFromLibrary(bookRemoveBtn.dataset.bookNum); // Removes book
    });
    bookRow.append(bookRemoveCell);
    bookRemoveCell.append(bookRemoveBtn);
}

// Removes book from myLibrary and rebuilds DOM
function removeBookFromLibrary(num) {
    myLibrary.splice(num, 1);
    clearLibraryDOM();
    addLibraryToDOM();
    updateStats();
}

function updateStats() {
    totalBooks.innerText = myLibrary.length;
}

// Script

// Starter Book
let starterBook = new Book("The Hobbit", "J. R. R. Tolkein", 310, "Read");

addBookToLibrary(starterBook); // add to myLibrary array
clearLibraryDOM(); // clear DOM
addLibraryToDOM(); // reload DOM from myLibrary array
updateStats();
