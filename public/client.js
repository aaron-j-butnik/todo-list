const deleteTodoButton = document.querySelectorAll("#delete-todo");
const completedTodoClick = document.querySelectorAll(".todo-item span");

deleteTodoButton.forEach((element) => {
  element.addEventListener("click", deleteTodo);
});

completedTodoClick.forEach((element) => {
  element.addEventListener("click", completedTodo);
});

async function deleteTodo() {
  const dTodo = this.parentNode.childNodes[1].innerText;
  try {
    const res = await fetch("/deleteTodo", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoItemDelete: dTodo }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function completedTodo() {
  const cTodo = this.parentNode.childNodes[1].innerText;
  try {
    const res = await fetch("/completedTodo", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoItemCompleted: cTodo }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
