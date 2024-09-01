(function () {
  let skipCount = 20;
  const countDiv = document.getElementById("count");
  const todoContainer = document.getElementById("todoContainer");
  const btn = document.getElementById("loadMoreBtn");

  function fetchTodos(skip) {
    fetch(`https://dummyjson.com/todos?limit=20&skip=${skip}`)
      .then((res) => res.json())
      .then((response) => {
        response.todos.forEach((item) => {
          let todo = document.createElement("li");
          todo.innerText = item.todo;
          todoContainer.appendChild(todo);
          countDiv.innerText = `Count: ${skip}/${response.total}`;
        });
      })
      .catch();
  }

  btn.addEventListener("click", () => {
    fetchTodos(skipCount);
    skipCount += 20;
  });

  fetchTodos(0);
})();
