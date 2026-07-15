// Browser glue: wires the DOM to the pure logic in todo.js (window.TodoLogic).
// State lives in memory and is persisted to localStorage.

const STORAGE_KEY = "lab-todos";
const { addTodo, toggleTodo, deleteTodo, clearCompleted, remaining } = window.TodoLogic;

/** @type {{ id: number, text: string, done: boolean }[]} */
let todos = load();

const form = document.getElementById("new-todo-form");
const input = document.getElementById("new-todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("count");
const clearDone = document.getElementById("clear-done");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  todos = addTodo(todos, input.value);
  input.value = "";
  input.focus();
  save();
  render();
});

clearDone.addEventListener("click", () => {
  todos = clearCompleted(todos);
  save();
  render();
});

function render() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todos = toggleTodo(todos, todo.id);
      save();
      render();
    });

    const label = document.createElement("span");
    label.textContent = todo.text;

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "×";
    del.setAttribute("aria-label", "Delete todo");
    del.addEventListener("click", () => {
      todos = deleteTodo(todos, todo.id);
      save();
      render();
    });

    li.append(checkbox, label, del);
    list.appendChild(li);
  });

  const n = remaining(todos);
  count.textContent = `${n} item${n === 1 ? "" : "s"} left`;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

render();
