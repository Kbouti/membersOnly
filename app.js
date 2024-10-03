/////// app.js

// const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
// require("dotenv").config();

const indexRouter = require("./routers/indexRouter");
const pool = require("./database/pool");

const app = express();



app.use(express.static("public"));
app.set("views", __dirname);
app.set("view engine", "pug");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.listen(3000, () => console.log("app listening on port 3000!"));

app.use("/", indexRouter);

// ******************************************************************************************
passport.use(
    new LocalStrategy(async (email, password, done) => {
      console.log(`local strategy triggered`);
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        const user = rows[0];
  
        if (!user) {
          console.log(`email does not exist`);
          return done(null, false, { message: "Incorrect email" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log(`incorrect password`);
          return done(null, false, { message: "Incorrect password" })
        }
        console.log(`successfull login`);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        id,
      ]);
      const user = rows[0];
  
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
