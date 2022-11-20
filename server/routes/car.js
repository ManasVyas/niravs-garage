const router = require("express").Router();
const carController = require("../controllers/car.controller");
const upload = require("../fileUploadMW");

router.get("/", carController.findCars);
router.get("/:id", carController.findCarById);
router.post("/add", upload.single("file"), carController.createCar);
router.put("/update", upload.single("file"), carController.updateCar);
router.delete("/delete/:id", carController.deleteCar);
router.get("/user/:userId", carController.findCarByUser);

module.exports = router;