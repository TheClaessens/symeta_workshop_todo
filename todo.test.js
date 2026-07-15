// Test suite for the pure todo logic. Runs with Node's built-in runner —
// no dependencies, no install:  node --test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { addTodo, toggleTodo, deleteTodo, clearCompleted, remaining } = require("./todo.js");

test("addTodo appends a new, uncompleted item", () => {
  const todos = addTodo([], "buy milk");
  assert.equal(todos.length, 1);
  assert.equal(todos[0].text, "buy milk");
  assert.equal(todos[0].done, false);
});

test("addTodo trims whitespace and ignores empty input", () => {
  assert.equal(addTodo([], "   ").length, 0);
  assert.equal(addTodo([], "  hi  ")[0].text, "hi");
});

test("toggleTodo flips the done flag of the matching item", () => {
  let todos = addTodo([], "a");
  const id = todos[0].id;
  todos = toggleTodo(todos, id);
  assert.equal(todos[0].done, true);
});

test("deleteTodo removes the matching item", () => {
  let todos = addTodo(addTodo([], "a"), "b");
  const id = todos[0].id;
  todos = deleteTodo(todos, id);
  assert.equal(todos.length, 1);
  assert.equal(todos[0].text, "b");
});

test("clearCompleted keeps only the active items", () => {
  let todos = addTodo(addTodo([], "a"), "b");
  todos = toggleTodo(todos, todos[0].id);
  todos = clearCompleted(todos);
  assert.equal(todos.length, 1);
  assert.equal(todos[0].text, "b");
});

test("remaining counts the active (not-yet-done) items", () => {
  let todos = addTodo(addTodo(addTodo([], "a"), "b"), "c");
  todos = toggleTodo(todos, todos[0].id); // complete one
  assert.equal(remaining(todos), 2);
});
