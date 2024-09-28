const userQueries = require("../database/queries/userQueries");

exports.getIndex = async (req, res) => {
  console.log(`getIndex controller function called`);

  const users = await userQueries.fetchUsers();
  console.log(`fetched users from query function`);
  console.log(`users.length: ${users.length}`);

  // **********************************************************************
  // Next up let's render each user info in our home view to see if it's working
  // **********************************************************************
  users.forEach((user) => {
    console.log(`user.first_name: ${user.first_name}`);
  });

  res.render("./views/pages/home", {
    title: "Home",
    users,
    // Here go any parameters we want to pass to the view
  });
};

exports.postNewUser = async (req, res) => {
  console.log(`postNewUser controller function called`);

  console.log(`req.body.firstName: ${req.body.firstName}`);

  // Sooooo is it time to validate and sanitize?? probably...

  res.render("./views/pages/home", {
    title: "Home",
  });
};
