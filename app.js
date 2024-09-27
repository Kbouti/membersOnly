// installed dependencies:
// npm install express express-session pg passport passport-local pug dotenv

const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require("dotenv").config();

const app = express();
app.set("views", __dirname);
app.set("view engine", "jade")