import { showModal, hideModal } from "./modal.js"; //This modal will show when an item is deleted

const listDiv = document.getElementById("list");
const newInputButton = listDiv.querySelector("#new-todo-button");
const todoList = listDiv.querySelector("#items-list");
const todoInput = listDiv.querySelector("#todo-input");
const newInputValue = listDiv.querySelector("#todo-input");
let todoItems = document.querySelectorAll("li");

let toDoArray = [];

let updateIds = () => { //When creating and deleting list items, we want to make sure their ids are up to date!
  let todoItems = document.querySelectorAll("li");
  let i = 0;
  todoItems.forEach((el) => {
    el.id = i;
    i++;
  });
};

let createItemsFromStorage = () => { //If there are any items in the local storage, we will use this function to render them
  console.log(toDoArray);
  toDoArray.forEach((todo) => {
    const newTodo = document.createElement("li");
    // newTodo.textContent = todoInput.value;
    newTodo.id = toDoArray.length;
    newTodo.classList.add("todo-item");
    newTodo.innerHTML = `${todo} <button class="delete-button" id="btn${toDoArray.length}">X</button>`;
    let toDoButton = newTodo.querySelector(".delete-button");
    toDoButton.addEventListener("click", handleDeleteEvent);
    todoList.appendChild(newTodo);
    todoItems = document.querySelectorAll("li");
    updateIds();
  });
};

let storageInit = () => { //Initialize the app storage
  if (localStorage.length > 0) {
    toDoArray = JSON.parse(localStorage.getItem("toDoArray")); //Retrive the toDoArray value from the local storage
    createItemsFromStorage(); //Render the items to list items
    updateIds();
  } else {
    toDoArray = [];
  }
};

let localStorageSetter = () => { //When we create a new item the up to date array needs to be updated in the local storage
  localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
};

let renderTodo = (todos) => { //This function is responsible for rendering new todos
  let newTodo = todos[todos.length - 1];
  newTodo = document.createElement("li");
  // newTodo.textContent = todoInput.value;
  newTodo.id = toDoArray.length;
  newTodo.classList.add("todo-item");
  newTodo.innerHTML = `${todoInput.value} <button class="delete-button">X</button>`;
  showModal();
  setTimeout(() => {
    hideModal();
  }, 400);
  localStorageSetter();
  let toDoButton = newTodo.querySelector(".delete-button");
  toDoButton.addEventListener("click", handleDeleteEvent);
  todoList.appendChild(newTodo);
  todoItems = document.querySelectorAll("li");
  updateIds();
};

let sendInputDataHandler = () => { //The event handler of the new todo button
  if (todoInput.value.length >= 1) {
    toDoArray.push(todoInput.value);
    renderTodo(toDoArray);
    todoInput.value = "";
  }
};

let toDoArrayUpdater = (id) => { //Splice the remove item from the array and update it in the local storage
  toDoArray.splice(id, 1);
  localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
};


let handleDeleteEvent = (event) => { //The logic for deleting a todo
  showModal();
  setTimeout(() => {
    hideModal();
  }, 400);
  let liId = event.target.closest("li").id;
  let deleteId = document.getElementById(`${liId}`);
  deleteId.parentElement.removeChild(deleteId);
  toDoArrayUpdater(liId);
  updateIds();
};

storageInit();

newInputButton.addEventListener("click", sendInputDataHandler);

newInputValue.addEventListener("keydown", (evt) => { //ENTER key event listener
  if (evt.keyCode === 13) {
    sendInputDataHandler(evt);
  }
});