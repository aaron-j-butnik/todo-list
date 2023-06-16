const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on port ${PORT}.`);
});
