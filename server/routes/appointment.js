const router = require("express").Router();
const appointmentController = require("../controllers/appointment.controller");

router.get("/", appointmentController.findAppointments);
router.get("/:id", appointmentController.findAppointmentById);
router.post("/add", appointmentController.createAppointment);
router.put("/update", appointmentController.updateAppointment);
router.delete("/delete/:id", appointmentController.deleteAppointment);
router.get("/user/:userId", appointmentController.findAppointmentByUser);

module.exports = router;