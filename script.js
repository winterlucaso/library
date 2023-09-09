// To Do:
// - link reader stats to individual book stats
// - improve UI of form
// - fix form submitting with empty inputs

const myLibrary = [];

const table = document.querySelector("table");
const booksContainer = document.querySelector("#container-books");

// ----- Book Constructor -----
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
// addBook and form inputs
const addBookBtn = document.getElementById("addBookBtn");
const addBookDialog = document.getElementById("addBookDialog");
const form = document.getElementById('form');
const bookTitle = document.getElementById("book_title");
const bookAuthor = document.getElementById("book_author");
const bookPages = document.getElementById("book_pages");
const bookReadStatus = document.getElementById("book_read_status");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");

const bookTitleError = document.getElementById("book_title_error");
const bookAuthorError = document.getElementById("book_author_error");
const bookPagesError = document.getElementById("book_pages_error");

addBookBtn.addEventListener("click", () => { // addBookBtn EventListener
    addBookDialog.showModal();
});

form.addEventListener('submit', (e) => { // form submit EventListener
    if (!validateInputs()) {
        e.preventDefault();
    }
    else {
        let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookReadStatus.checked); // Create book instance

        addBookToLibrary(book);
        clearLibraryDOM();
        addLibraryToDOM();
        clearFormInputs();

        addBookDialog.close(); // Close modal
    };
});

cancelBtn.addEventListener('click', (e) => { // cancelBtn EventListener
    clearFormInputs();
    addBookDialog.close();
});

// ----- FUNCTIONS -----
function validateInputs() { // Return false if there are errors
    let errorState = false;
    if (bookTitle.value === "") {
        bookTitleError.innerText = "Please enter the title";
        errorState = true;
    } else {
        bookTitleError.innerText = "";
    }

    if (bookAuthor.value === "") {
        bookAuthorError.innerText = "Please enter the name of the author";
        errorState = true;
    } else {
        bookAuthorError.innerText = "";
    }

    if (bookPages.value === "") {
        bookPagesError.innerText = "Please enter a valid number";
        errorState = true;
    } else {
        bookPagesError.innerText = "";
    }

    if (errorState) {
        console.log("Validating: false");
        return false;
    }
    console.log("Validating: true");
    return true;
}

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
    const readStatusIcon = document.createElement('img');
    if (book.isRead) {
        readStatusIcon.setAttribute('src', './icon/check-icon.svg');
        readStatusIcon.setAttribute('alt', 'check icon');
        readStatusIcon.classList.add("read-status-icon");
    }
    else {
        readStatusIcon.setAttribute('src', './icon/x-icon.svg');
        readStatusIcon.setAttribute('alt', 'x icon');
        readStatusIcon.classList.add("read-status-icon");
    }
    // bookReadStatus.innerText = book.isRead;
    bookRow.append(bookReadStatus);
    bookReadStatus.append(readStatusIcon);

    const bookRemoveCell = document.createElement('td'); // RemoveBtn
    const bookRemoveBtn = document.createElement('button');
    bookRemoveBtn.classList.add("remove-btn");
    bookRemoveBtn.dataset.bookNum = book.id; // Attaches data value to the removeBtn
    const trashIcon = document.createElement('img');
    trashIcon.setAttribute('src', './icon/trash-can-icon.svg');
    trashIcon.setAttribute('alt', 'trash can icon');
    trashIcon.classList.add("trash-icon");

    bookRemoveBtn.addEventListener('click', (e) => {
        console.log("Removing '" + book.title + "' at index: " + bookRemoveBtn.dataset.bookNum);
        removeBookFromLibrary(bookRemoveBtn.dataset.bookNum);
    });
    bookRow.append(bookRemoveCell);
    bookRemoveCell.append(bookRemoveBtn);
    bookRemoveBtn.append(trashIcon);
}

function clearFormInputs() {
    bookTitle.value = ""; 
    bookAuthor.value = "";
    bookPages.value = "";
    bookReadStatus.checked = "";

    bookTitleError.innerText = "";
    bookAuthorError.innerText = "";
    bookPagesError.innerText = "";
}

// ----- Stats -----
const totalBooks = document.querySelector("#total-books"); // Tracks total books in library

function updateStats() { // Updates sidebar stats
    totalBooks.innerText = myLibrary.length;
}

// ----- Script -----
// Starter Books
let starterBook = new Book("The Hobbit", "J. R. R. Tolkien", 310, true);

addBookToLibrary(starterBook); // add to myLibrary array
clearLibraryDOM(); // clear DOM
addLibraryToDOM(); // reload DOM from myLibrary array
updateStats(); // update stats

let starterBook2 = new Book("The Hollywood Standard: The Complete and Authoritative Guide to Script Format and Style (Hollywood Standard: The Complete & Authoritative Guide to)", "Christopher Riley", 208, true);

addBookToLibrary(starterBook2); // add to myLibrary array
clearLibraryDOM(); // clear DOM
addLibraryToDOM(); // reload DOM from myLibrary array
updateStats(); // update stats
