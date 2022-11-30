const router = require("express").Router();
const orderController = require("../controllers/order.controller");

router.get("/", orderController.findOrders);
router.get("/:id", orderController.findOrderById);
router.post("/add", orderController.createOrder);
router.put("/update", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;