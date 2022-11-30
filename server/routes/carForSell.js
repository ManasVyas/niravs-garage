const router = require("express").Router();
const carForSellController = require("../controllers/carForSell.controller");
const upload = require("../fileUploadMW");

router.get("/", carForSellController.findCarsForSell);
router.get("/:id", carForSellController.findCarForSellById);
router.post(
  "/add",
  upload.single("file"),
  carForSellController.createCarForSell
);
router.put(
  "/update",
  upload.single("file"),
  carForSellController.updateCarForSell
);
router.delete("/delete/:id", carForSellController.deleteCarForSell);

module.exports = router;
