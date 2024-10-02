const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndex);

indexRouter.post("/newUser", indexController.postNewUser);

indexRouter.post("/logIn", indexController.postLogin);

indexRouter.get("/logOut", indexController.getLogout);

indexRouter.post("/newMessage", indexController.postNewMessage);

module.exports = indexRouter;

