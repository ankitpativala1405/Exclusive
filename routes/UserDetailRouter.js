const { Router } = require("express");
const UserDetailController = require("../controller/userdetailController");

const UserDetailRouter = Router();

UserDetailRouter.get("/",UserDetailController.Get)
UserDetailRouter.post("/",UserDetailController.Create)
UserDetailRouter.patch("/:id",UserDetailController.Update)
UserDetailRouter.delete("/:id",UserDetailController.delete)

module.exports = UserDetailRouter;
