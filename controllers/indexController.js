const userQueries = require("../database/queries/userQueries");

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

// **********************************************************************

// Next up:
// Password encryption
// Make password required

// **********************************************************************

exports.getIndex = async (req, res) => {
  console.log(`getIndex controller function called`);
  const users = await userQueries.fetchUsers();
  console.log(`fetched users from query function`);
  console.log(`users.length: ${users.length}`);
  users.forEach((user) => {
    console.log(`user.first_name: ${user.first_name}`);
  });
  res.render("./views/pages/home", {
    title: "Home",
    users,
  });
};

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
      return res.status(400).render("./views/pages/home", {
        title: "Home",
        submission,
        errors: errors.array(),
      });
    } else {
      console.log(`Submission passed validation`);
      await userQueries.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password,
        true,
        false
      );
      res.redirect("/");
    }
  },
];
