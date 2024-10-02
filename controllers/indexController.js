const userQueries = require("../database/queries/userQueries");
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const invalidEmail = "Email must be valid.";
const passwordNoMatch = "Passwords must match";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .isEmail()
    .withMessage(invalidEmail)
    .custom(async (email) => {
      const existingUsers = await userQueries.getUserByEmail(email);
      if (existingUsers.length > 0) {
        return Promise.reject(`Email already in use`);
      }
    }),
  body("password").trim(),
  body("confirmPassword")
    .trim()
    .custom((confirmPassword, { req }) => {
      console.log(`confirmPassword: ${confirmPassword}`);
      console.log(`req.body.password: ${req.body.password}`);
      if (confirmPassword != req.body.password) {
        console.log(`passwords do not match`);
        return Promise.reject(passwordNoMatch);
      }
      console.log(`passwords do match`);
      return true;
    }),
];


exports.getIndex = async (req, res) => {
  console.log(`getIndex controller function called`);
  const users = await userQueries.fetchUsers();
  res.render("./views/pages/index", {
    title: "Home",
    user: req.user,
    users,
  });
};

const passport = require("passport");

exports.postLogin = async (req, res, next) => {
    const middleware = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
      });
      middleware(req, res);
    next
}


exports.getNewUser = async (req, res, next) => {
    res.render("./views/pages/newUser", {title: "Sign Up"});
}

exports.getExistingUser = async (req, res, next) => {
    res.render("./views/pages/existingUser", {title: "Log In"});
}

exports.getLogout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
}



exports.postNewUser = [
  validateUser,
  async (req, res) => {
    console.log(`postNewUser controller function called`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`validation error`);
      const submission = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      };
      return res.status(400).render("./views/pages/index", {
        title: "Home",
        submission,
        errors: errors.array(),
      });
    } else {
      console.log(`Submission passed validation, time to hash`);

      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return err;
          } else {
            try {
                await userQueries.createUser(
                    req.body.firstName,
                    req.body.lastName,
                    req.body.email,
                    req.body.loginCode,
                    hashedPassword,
                  );
              res.redirect("/");
            } catch (err) {
              return next(err);
            }
          }
        });
    }
  },
];

exports.postNewMessage = async (req, res) => {
    console.log(`post new message route reached`);
    res.send("done");
}