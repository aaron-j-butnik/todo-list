const deleteTodoButton = document.querySelectorAll("#delete-todo");
const markCompleted = document.querySelectorAll(".todo-item span");
const markUncompleted = document.querySelectorAll(".todo-item span.completed");

deleteTodoButton.forEach((element) => {
  element.addEventListener("click", deleteTodo);
});

markCompleted.forEach((element) => {
  element.addEventListener("click", markCompletedTodo);
});

markUncompleted.forEach((element) => {
  element.addEventListener("click", unmarkCompletedTodo);
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

async function markCompletedTodo() {
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

async function unmarkCompletedTodo() {
  const unTodo = this.parentNode.childNodes[1].innerText;
  try {
    const res = await fetch("/uncompletedTodo", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoItemUncompleted: unTodo }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
