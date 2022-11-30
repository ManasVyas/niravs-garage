const router = require("express").Router();
const itemController = require("../controllers/item.controller");
const upload = require("../fileUploadMW");

router.get("/", itemController.findItems);
router.get("/:id", itemController.findItemById);
router.post("/add", upload.single("file"), itemController.createItem);
router.put("/update", upload.single("file"), itemController.updateItem);
router.delete("/delete/:id", itemController.deleteItem);

module.exports = router;