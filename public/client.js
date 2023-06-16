const deleteTodoButton = document.querySelectorAll("#delete-todo");

deleteTodoButton.forEach((element) => {
  element.addEventListener("click", deleteTodo);
});

async function deleteTodo() {
  const dTodo = this.parentNode.childNodes[1].innerText;
  try {
    const res = await fetch("/deleteItem", {
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
