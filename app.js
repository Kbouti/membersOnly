// installed dependencies:
// npm install express express-session pg passport passport-local pug dotenv

const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const indexRouter = require("./routers/indexRouter.js");
require("dotenv").config();



const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
// This ^^ is needed to access req.body from the form submission

app.use(express.static("public"));
app.set("views", __dirname);
app.set("view engine", "pug");

// ******************************************************************************************************************************
// ******************************************************************************************************************************
// Passport requirements...
// Not yet working. 


const pool = require("./database/pool.js");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

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
        return done(null, false, { message: "Incorrect email" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
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

app.post("/logIn", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// app.post("/logIn", async (req, res) => {
//   console.log(`app post reached`);
//   console.log(`req.body: ${JSON.stringify(req.body)}`);

//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/",
//   })
// //   Okayyy so it is getting email and password....
// //   res.redirect("/");
// });

const userQueries = require("./database/queries/userQueries.js");

app.get("/", async (req, res) => {
  console.log(`get App function called`);

  console.log(`req.user: ${req.user}`);

  const users = await userQueries.fetchUsers();
  res.render("./views/pages/home", {
    title: "Home",
    user: req.user,
    users,
  });
});

// ******************************************************************************************************************************

// app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
  console.log(`.`);
  console.log(`.`);
  console.log(`.`);
  console.log(`.`);
  console.log(`MAY THE FORCE BE WITH YOU`);
});
