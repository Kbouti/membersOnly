const userQueries = require("../database/queries/userQueries");

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
