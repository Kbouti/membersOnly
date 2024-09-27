exports.indexGet = async (req, res) => {
  console.log(`indexGet controller function called`);

  res.render("./views/pages/home", {
    title: "Home"
    // Here go any parameters we want to pass to the view
  });
};
