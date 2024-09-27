const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndex);

indexRouter.post("/newUser", indexController.postNewUser)


module.exports = indexRouter;


