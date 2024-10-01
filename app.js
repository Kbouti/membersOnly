// installed dependencies:
// npm install express express-session pg passport passport-local pug dotenv

// const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const indexRouter = require("./routers/indexRouter.js");
require("dotenv").config();

const pool = require("./database/pool.js");
const app = express();

// app.use(express.urlencoded({ extended: true }));
// This ^^ is used to access req.body from the form submission. Set to false later by provided instructions so commented out here

app.use(express.static("public"));
app.set("views", __dirname);
app.set("view engine", "pug");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}.`);
});

// ******************************************************************************************************************************
// The below function never gets called. Why not??
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
        console.log(`username does not exist`);
        return done(null, false, { message: "Incorrect email" });
      }
      if (user.password !== password) {
        console.log(`incorrect password`);
        return done(null, false, { message: "Incorrect password" });
      }
      console.log(`successfull login`);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// // Syntax from the lesson, does not reach the desired passport local strategy function but it loads and stops. I suspect it only isn't working because of pug
app.post(
  "/logIn",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// Cake's way (resulted in headers sent error)
// app.post("/logIn", async (req, res, next) => {
//   const middleware = passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/",
//   });

//   middleware(req, res, next);
//   res.redirect("/");
// });

// My attempt to chain some console.log statements. This does not stop loading. Different result from above, it leaves some promise unfulfilled
// app.post(
//   "/logIn",
//   function () {
//     console.log(`first function`);
//   },
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/",
//   }),
//   async (req, res) => {
//     console.log(`third function`);
//   }
// );



app.get("/", async (req, res) => {
  console.log(`get App function called`);
  console.log(`req.user: ${req.user}`);
  res.render("./views/pages/home", {
    title: "Home",
    user: req.user,
  });
});

// ******************************************************************************************************************************
// Once we get authentication working we can re-organize routing to designated files
// app.use("/", indexRouter);

