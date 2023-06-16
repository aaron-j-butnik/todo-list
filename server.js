const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const PORT = 3000;
require("dotenv").config();

let db;
let dbConnectionStr = process.env.DB_STRING;
let dbName = "todo-list";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  db.collection("todo-items")
    .find()
    .toArray()
    .then((data) => {
      res.render("index.ejs", { todoItems: data });
    })
    .catch((error) => console.error(error));
});

app.post("/addItem", (req, res) => {
  db.collection("todo-items")
    .insertOne({ todoItem: req.body.addTodoInput, completed: false })
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/completedTodo", (req, res) => {
  db.collection("todo-items")
    .updateOne(
      {
        todoItem: req.body.todoItemCompleted,
        completed: false,
      },
      { $set: { completed: true } }
    )
    .then((result) => {
      console.log("Todo item completed.");
      res.json("Todo item completed.");
    })
    .catch((error) => console.error(error));
});

app.delete("/deleteTodo", (req, res) => {
  db.collection("todo-items")
    .deleteOne({ todoItem: req.body.todoItemDelete })
    .then((result) => {
      console.log("Todo Item Deleted.");
      res.json("Todo Item Deleted.");
    });
});

app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on port ${PORT}.`);
});
