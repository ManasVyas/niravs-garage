const router = require("express").Router();
const serviceController = require("../controllers/service.controller");
const upload = require("../fileUploadMW");

router.get("/", serviceController.findServices);
router.get("/:id", serviceController.findServiceById);
router.post("/add", upload.single("file"), serviceController.createService);
router.put("/update", upload.single("file"), serviceController.updateService);
router.delete("/delete/:id", serviceController.deleteService);

module.exports = router;
