// installed dependencies:
// npm install express express-session pg passport passport-local pug dotenv

const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));

app.set("views", __dirname);
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("./views/pages/home", {title: "Bingo"});
});


app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
  console.log(`.`);
  console.log(`.`);
  console.log(`.`);
  console.log(`.`);
  console.log(`MAY THE FORCE BE WITH YOU`);
});
