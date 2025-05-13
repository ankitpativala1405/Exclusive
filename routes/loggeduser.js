const { Router } = require("express");
const LoggedController = require("../controller/loggedController");

const LoggedRouter = Router();
LoggedRouter.get("/", LoggedController.getAll);
LoggedRouter.post("/", LoggedController.post);
LoggedRouter.delete("/:username", LoggedController.delete);

module.exports = LoggedRouter;
