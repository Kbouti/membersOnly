const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndex);

indexRouter.post("/newUser", indexController.postNewUser)

// indexRouter.post(
//     "/logIn",
//     passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/"
//     })
//   );

module.exports = indexRouter;


// kevin.f.boutilier@gmail.com