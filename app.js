/////// app.js

// const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// require("dotenv").config();

const pool = require("./database/pool");

const app = express();
app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(`app get / route reached`);
  res.render("views/pages/index", { title: "Home", user: req.user });
});

app.listen(3000, () => console.log("app listening on port 3000!"));

app.post(
  "/logIn",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

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
  






// // ******************************************************************************************************************************
// // ******************************************************************************************************************************
// // ******************************************************************************************************************************
// // ******************************************************************************************************************************
// IGNORE BELOW THIS LINE
// // ******************************************************************************************************************************
// // ******************************************************************************************************************************
// // ******************************************************************************************************************************
// // ******************************************************************************************************************************

// // installed dependencies:
// // npm install express express-session pg passport passport-local pug dotenv

// // const { Pool } = require("pg");
// const express = require("express");
// const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// // const indexRouter = require("./routers/indexRouter.js");
// require("dotenv").config();

// const pool = require("./database/pool.js");
// const app = express();

// // app.use(express.urlencoded({ extended: true }));
// // This ^^ is used to access req.body from the form submission. Set to false later by provided instructions so commented out here

// app.use(express.static("public"));
// app.set("views", __dirname);
// app.set("view engine", "ejs");

// app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));

// app.get("/", async (req, res) => {
//     console.log(`get App function called`);
//     console.log(`req.user: ${req.user}`);
//     res.render("./views/pages/index", {
//       title: "Home",
//       user: req.user,
//     });
//   });

//   app.listen(process.env.PORT, () => {
//     console.log(`App is listening on port ${process.env.PORT}.`);
//   });

// // // Syntax from the lesson, does not reach the desired passport local strategy function but it loads and stops. I suspect it only isn't working because of pug
// app.post(
//     "/logIn",
//     passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/",
//     })
//   );

// // ******************************************************************************************************************************
// // The below function never gets called. Why not??
// passport.use(
//   new LocalStrategy(async (email, password, done) => {
//     console.log(`local strategy triggered`);
//     try {
//       const { rows } = await pool.query(
//         "SELECT * FROM users WHERE email = $1",
//         [email]
//       );
//       const user = rows[0];

//       if (!user) {
//         console.log(`username does not exist`);
//         return done(null, false, { message: "Incorrect email" });
//       }
//       if (user.password !== password) {
//         console.log(`incorrect password`);
//         return done(null, false, { message: "Incorrect password" });
//       }
//       console.log(`successfull login`);
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
//       id,
//     ]);
//     const user = rows[0];
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// // ******************************************************************************************************************************
// // Once we get authentication working we can re-organize routing to designated files
// // app.use("/", indexRouter);
