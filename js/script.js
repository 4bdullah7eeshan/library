const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}


Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};


function displayBooks() {
    /*
    Here, I am essentially clearing all the existing table rows and then recreating it from scratch.
    I might tackle this in a better way.
    */
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    // Clear header row
    const headerRow = document.createElement("tr");
    const titleHeader = document.createElement("th");
    const authorHeader = document.createElement("th");
    const pagesHeader = document.createElement("th");
    const readStatusHeader = document.createElement("th");
    const manageHeader = document.createElement("th");
    
    titleHeader.textContent = "Title";
    authorHeader.textContent = "Author";
    pagesHeader.textContent = "Pages";
    readStatusHeader.textContent = "Read Status";
    manageHeader.textContent = "Manage"

    headerRow.appendChild(titleHeader);
    headerRow.appendChild(authorHeader);
    headerRow.appendChild(pagesHeader);
    headerRow.appendChild(readStatusHeader);
    headerRow.appendChild(manageHeader);
    
    table.appendChild(headerRow);

    if (myLibrary.length === 0) {
        const emptyRow = document.createElement("tr");
        const emptyCell = document.createElement("td");

        // Span all columns
        emptyCell.colSpan = "5";  // Adjust colSpan based on the number of columns
        emptyCell.classList.add("empty");
        emptyCell.textContent = "Currently there are no books in your library!";
        emptyRow.appendChild(emptyCell);
        table.appendChild(emptyRow);
    } else {
        for (i = 0; i < myLibrary.length; i++) {
            const bookRow = document.createElement("tr");

            const titleCell = document.createElement("td");
            const authorCell = document.createElement("td");
            const pagesCell = document.createElement("td");
            const readStatusCell = document.createElement("td");
            const manageBookCell = document.createElement("td");

            titleCell.textContent = myLibrary[i].title;
            authorCell.textContent = myLibrary[i].author;
            pagesCell.textContent = myLibrary[i].pages;
            readStatusCell.textContent = myLibrary[i].read;

            const deleteBookButton = document.createElement("button")
            //deleteBookButton.textContent = "Delete";
            deleteBookButton.innerHTML = '<i class="mdi mdi-delete"></i>'; // MDI delete icon
            deleteBookButton.addEventListener("click", () => {
                myLibrary.pop(myLibrary[i]);
                displayBooks();
            })

            manageBookCell.appendChild(deleteBookButton);

            bookRow.appendChild(titleCell);
            bookRow.appendChild(authorCell);
            bookRow.appendChild(pagesCell);
            bookRow.appendChild(readStatusCell);
            bookRow.appendChild(manageBookCell);

            table.appendChild(bookRow);
        }
    }
};


const addNewBookButton = document.querySelector("#add");
const dialog = document.querySelector("dialog");
const closeDialogButton = document.querySelector("dialog button");
const submitButton = document.querySelector("#sub");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const yes = document.querySelector("#yes");
const no = document.querySelector("#no");

const table = document.querySelector("table");

const headerRow = document.createElement("tr");
const titleHeader = document.createElement("th");
const authorHeader = document.createElement("th");
const pagesHeader = document.createElement("th");
const readStatusHeader = document.createElement("th");
const manageHeader = document.createElement("th");


titleHeader.textContent = "Title";
authorHeader.textContent = "Author";
pagesHeader.textContent = "Pages";
readStatusHeader.textContent = "Read Status";
manageHeader.textContent = "Manage";

headerRow.appendChild(titleHeader);
headerRow.appendChild(authorHeader);
headerRow.appendChild(pagesHeader);
headerRow.appendChild(readStatusHeader);
headerRow.appendChild(manageHeader);

const emptyRow = document.createElement("tr");
const emptyCell = document.createElement("td");

        // Span all columns
emptyCell.colSpan = "5";  // Adjust colSpan based on the number of columns
emptyCell.classList.add("empty");
emptyCell.textContent = "Currently there are no books in your library!";
emptyRow.appendChild(emptyCell);

table.appendChild(headerRow);
table.appendChild(emptyRow);


// "Show the dialog" button opens the dialog modally

addNewBookButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

submitButton.addEventListener("click", () => {
    const book = new Book(title.value, author.value, pages.value, yes.checked ? "yes" : "no");
    addBookToLibrary(book);
    displayBooks();
    dialog.close();

});


