// installed dependencies:
// npm install express express-session pg passport passport-local pug dotenv

const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const indexRouter = require("./routers/indexRouter.js")
require("dotenv").config();
// const { body, validationResult } = require("express-validator");



const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
// This ^^ is needed to access req.body from the form submission

app.use(express.static("public"));
app.set("views", __dirname);
app.set("view engine", "pug");

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
  console.log(`.`);
  console.log(`.`);
  console.log(`.`);
  console.log(`.`);
  console.log(`MAY THE FORCE BE WITH YOU`);
});
