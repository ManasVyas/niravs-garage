const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.findUsers);
router.get("/:id", userController.findUserById);
router.post("/add", userController.addUser);
router.put("/update", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
