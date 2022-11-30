const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    date: { type: String, required: true },
    userId: { type: String, required: true },
    contactNumber: { type: String, required: true },
    carId: { type: String, required: true },
    mechanicId: { type: String },
    status: { type: String, required: true },
    description: { type: String },
    cost: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
