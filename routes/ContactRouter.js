const { Router } = require("express");
const ContactController = require("../controller/ContactController");
const ContactRouter = Router();


ContactRouter.get("/", ContactController.Get);
ContactRouter.post("/", ContactController.Post);
ContactRouter.delete("/:id", ContactController.delete);


module.exports = ContactRouter;
