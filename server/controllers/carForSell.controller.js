const carForSellDao = require("../daos/carForSell.dao");

const createCarForSell = async (req, res) => {
  try {
    const data = await carForSellDao.createCarForSell(req.body, req.file.path);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCarsForSell = async (req, res) => {
  try {
    const data = await carForSellDao.findCarsForSell();
    if (data.length === 0)
      return res.status(200).json({ success: true, data: [] });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCarForSellById = async (req, res) => {
  try {
    const data = await carForSellDao.findCarForSellById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not found!" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCarForSell = async (req, res) => {
  try {
    const data = carForSellDao.findCarForSellById(req.body._id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not Found!" });
    const carForSell = await carForSellDao.updateCarForSell(
      req.body._id,
      req.body,
      req.file ? req.file.path : data.image
    );
    res.status(200).json({ success: true, data: carForSell });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCarForSell = async (req, res) => {
  try {
    const data = await carForSellDao.findCarForSellById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not Found!" });
    const carForSell = await carForSellDao.deleteCarForSell(req.params.id);
    res.status(200).json({ success: true, data: carForSell });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const carForSellController = {
  createCarForSell,
  findCarsForSell,
  findCarForSellById,
  updateCarForSell,
  deleteCarForSell,
};

module.exports = carForSellController;
