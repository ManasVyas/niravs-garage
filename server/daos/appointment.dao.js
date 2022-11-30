const Appointment = require("../models/appointment.model");

const findAppointments = () => Appointment.find();

const createAppointment = (appointment) => {
  const newAppointment = new Appointment({
    date: appointment.date,
    userId: appointment.userId,
    contactNumber: appointment.contactNumber,
    carId: appointment.carId,
    mechanicId: appointment.mechanicId,
    status: appointment.status,
    description: appointment.description,
    cost: appointment.cost,
  });
  return newAppointment.save();
};

const findAppointmentById = (id) => Appointment.findById(id);

const updateAppointment = (id, appointment) => {
  const updatedAppointment = {
    date: appointment.date,
    userId: appointment.userId,
    contactNumber: appointment.contactNumber,
    carId: appointment.carId,
    mechanicId: appointment.mechanicId,
    status: appointment.status,
    description: appointment.description,
    cost: appointment.cost,
  };
  return Appointment.findByIdAndUpdate(id, updatedAppointment, {
    useFindAndModify: false,
  });
};

const deleteAppointment = (id) => Appointment.findByIdAndDelete(id);

const findAppointmentByUser = (userId) => Appointment.find({ userId });

const appointmentDao = {
  findAppointments,
  createAppointment,
  findAppointmentById,
  updateAppointment,
  deleteAppointment,
  findAppointmentByUser,
};

module.exports = appointmentDao;
