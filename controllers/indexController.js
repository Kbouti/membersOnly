const userQueries = require("../database/queries/userQueries");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("first_name")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
    body("last_name").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),

];


// Next we need to create a view that will render any errors that we get. 




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

exports.postNewUser = async (req, res) => {
  console.log(`postNewUser controller function called`);

  console.log(`req.body.firstName: ${req.body.firstName}`);
  await userQueries.createUser(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    true,
    false
  );
  // Sooooo is it time to validate and sanitize?? probably...

  res.redirect("/");
};
