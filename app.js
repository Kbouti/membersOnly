// installed dependencies:
// npm install express express-session pg passport passport-local ejs dotenv

const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require("dotenv").config();

