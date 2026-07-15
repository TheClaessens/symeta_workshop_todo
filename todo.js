// Pure todo logic — no DOM, no storage. Used by both the browser (app.js)
// and the test suite (todo.test.js). Each function takes the current todos
// array and returns a new array, so the logic is easy to test in isolation.
//
// UMD wrapper: exposes window.TodoLogic in the browser and module.exports
// under Node, so the same file works in both without a build step.
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.TodoLogic = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  function addTodo(todos, text) {
    const trimmed = text.trim();
    if (!trimmed) return todos;
    // NOTE: id is derived from the current length.
    return [...todos, { id: todos.length, text: trimmed, done: false }];
  }

  function toggleTodo(todos, id) {
    return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTodo(todos, id) {
    return todos.filter((t) => t.id !== id);
  }

  function clearCompleted(todos) {
    return todos.filter((t) => !t.done);
  }

  function remaining(todos) {
    return todos.filter((t) => t.done).length;
  }

  return { addTodo, toggleTodo, deleteTodo, clearCompleted, remaining };
});
