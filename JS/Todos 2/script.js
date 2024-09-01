(function () {
  const todoText = document.getElementsByClassName("todo-input")[0];
  const addTodoBtn = document.getElementsByClassName("add-todo")[0];
  const todoContainer = document.getElementsByClassName("todo-container")[0];

  fetchStoredTodos();
  todoText.focus();

  addTodoBtn.addEventListener("click", () => {
    addNewTodo();
  });

  todoText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addNewTodo();
    }
  });

  function addNewTodo() {
    if (todoText.value) {
      createTodoHTML(todoText.value, false);
      storeItem(todoText.value);
      todoText.value = "";
      todoText.focus();
    }
  }

  function createTodoHTML(title, isCompleted) {
    const newTodo = document.createElement("li");
    const checkbox = document.createElement("input");
    const text = document.createElement("div");
    const deleteBtn = document.createElement("button");

    newTodo.setAttribute("class", "todo");
    checkbox.setAttribute("type", "checkbox");
    isCompleted && checkbox.setAttribute("checked", true);
    checkbox.addEventListener("change", finishTodo);
    text.textContent = title;
    text.setAttribute("class", "todo-text");
    isCompleted && text.classList.toggle("strikethrough");
    deleteBtn.setAttribute("class", "delete-todo");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTodo);

    newTodo.appendChild(checkbox);
    newTodo.appendChild(text);
    newTodo.appendChild(deleteBtn);
    todoContainer.appendChild(newTodo);
  }

  function fetchStoredTodos() {
    const storedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
    storedTodos.forEach((todo) => createTodoHTML(todo.title, todo.isCompleted));
  }

  function storeItem(textContent) {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    localStorage.setItem(
      "todoList",
      JSON.stringify([...todoList, { title: textContent, isCompleted: false }])
    );
  }

  function finishTodo(e) {
    const text = e.target.nextSibling;
    text.classList.toggle("strikethrough");
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList = todoList.map((todo) =>
      todo.title === text.textContent
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    );
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  function deleteTodo(e) {
    const todo = e.target.parentElement;
    const { textContent } = e.target.previousSibling;
    todoContainer.removeChild(todo);
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList = todoList.filter((todo) => todo.title !== textContent);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    todoText.focus();
  }
})();
