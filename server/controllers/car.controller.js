const carDao = require("../daos/car.dao");

const createCar = async (req, res) => {
  try {
    const data = await carDao.createCar(req.body, req.file.path);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCars = async (req, res) => {
  try {
    const data = await carDao.findCars();
    if (data.length === 0)
      return res.status(200).json({ success: true, data: [] });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCarById = async (req, res) => {
  try {
    const data = await carDao.findCarById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not found!" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const data = carDao.findCarById(req.body._id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not Found!" });
    const car = await carDao.updateCar(
      req.body._id,
      req.body,
      req.file ? req.file.path : data.image
    );
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const data = await carDao.findCarById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not Found!" });
    const car = await carDao.deleteCar(req.params.id);
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCarByUser = async (req, res) => {
  try {
    const data = await carDao.findCarByUser(req.params.userId);
    if (!data || !data.length)
      return res
        .status(404)
        .json({ success: false, msg: "User doesn't own any car!" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const carController = {
  createCar,
  findCars,
  findCarById,
  updateCar,
  deleteCar,
  findCarByUser,
};

module.exports = carController;
