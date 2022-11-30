const appointmentDao = require("../daos/appointment.dao");

const createAppointment = async (req, res) => {
  try {
    const data = await appointmentDao.createAppointment(req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findAppointments = async (req, res) => {
  try {
    const data = await appointmentDao.findAppointments();
    if (data.length === 0)
      return res.status(200).json({ success: true, data: [] });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findAppointmentById = async (req, res) => {
  try {
    const data = await appointmentDao.findAppointmentById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Appointment not found!" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const data = appointmentDao.findAppointmentById(req.body._id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Appointment not Found!" });
    const appointment = await appointmentDao.updateAppointment(
      req.body._id,
      req.body
    );
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const data = await appointmentDao.findAppointmentById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Appointment not Found!" });
    const appointment = await appointmentDao.deleteAppointment(req.params.id);
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findAppointmentByUser = async (req, res) => {
  try {
    const data = await appointmentDao.findAppointmentByUser(req.params.userId);
    if (!data || !data.length)
      return res
        .status(404)
        .json({ success: false, msg: "User doesn't have any appointment!" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const appointmentController = {
  createAppointment,
  findAppointments,
  findAppointmentById,
  updateAppointment,
  deleteAppointment,
  findAppointmentByUser,
};

module.exports = appointmentController;
