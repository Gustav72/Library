import "./styles/style.css";
import "./styles/normalize.css";
import logo from "./assets/library-outline.svg";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr_yTCIIio_3BUdzApsYlyfj10_liJkt8",
  authDomain: "library-f807c.firebaseapp.com",
  projectId: "library-f807c",
  storageBucket: "library-f807c.appspot.com",
  messagingSenderId: "684727164898",
  appId: "1:684727164898:web:0bd572f50fcc1d97bae3bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let myLibrary = []; //Array for books
let i = 0;
const form = document.querySelector("form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function doNothing() {}

window.switchStatus = function (j) {
  let status = document.getElementById("finish" + j);
  if (status.innerText == "yes") {
    status.innerText = "no";
    status.style.color = "red";
    myLibrary[j - 1].read = "no";
  } else {
    status.innerText = "yes";
    status.style.color = "green";
    myLibrary[j - 1].read = "yes";
  }
};

window.remove = function (row) {
  document.getElementById(row).remove(); //delete from DOM
  delete myLibrary[row - 1]; //delete from array
};

window.addBookToLibrary = function () {
  i++;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  const checkedRadioButton = document.querySelector(
    'input[name="read"]:checked'
  );
  let read = checkedRadioButton ? checkedRadioButton.value : "";

  if (title == "" || author == "" || pages == "" || read == "") return;

  let newBook = new Book(title, author, pages, read);

  newBook.title = title;
  newBook.author = author;
  newBook.pages = pages;
  newBook.read = read;

  myLibrary.push(newBook);

  const table = document.querySelector("tbody");

  const row = document.createElement("tr");

  let cell1 = document.createElement("td");
  let cell2 = document.createElement("td");
  let cell3 = document.createElement("td");
  let cell4 = document.createElement("td");
  let cell5 = document.createElement("td");

  row.setAttribute("id", i);

  cell5.setAttribute("onclick", "remove(" + i + ")");

  cell4.setAttribute("onclick", "switchStatus(" + i + ")");
  cell4.setAttribute("id", "finish" + i);

  cell1.innerText = newBook.title;
  cell2.innerText = newBook.author;
  cell3.innerText = newBook.pages;
  cell4.innerText = newBook.read;
  cell5.innerText = "✖";

  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  row.appendChild(cell4);
  row.appendChild(cell5);

  table.appendChild(row);

  newBook.title = document.getElementById("title").value;
  newBook.author = document.getElementById("author").value;
  newBook.pages = document.getElementById("pages").value;
  newBook.read = document.getElementById("read").value;

  if (read == "yes")
    document.getElementById("finish" + i).style.color = "green";
  else document.getElementById("finish" + i).style.color = "red";

  form.reset();

  console.log(read);
};

//thank you for checking out my code!
