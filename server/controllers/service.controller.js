const serviceDao = require("../daos/service.dao");

const createService = async (req, res) => {
  try {
    const data = await serviceDao.createService(req.body, req.file.path);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findServices = async (req, res) => {
  try {
    const data = await serviceDao.findServices();
    if (data.length === 0)
      return res.status(200).json({ success: true, data: [] });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findServiceById = async (req, res) => {
  try {
    const data = await serviceDao.findServiceById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Service not found!" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const data = serviceDao.findServiceById(req.body._id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Service not Found!" });
    const service = await serviceDao.updateService(
      req.body._id,
      req.body,
      req.file ? req.file.path : data.image
    );
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const data = await serviceDao.findServiceById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Service not Found!" });
    const service = await serviceDao.deleteService(req.params.id);
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const serviceController = {
  createService,
  findServices,
  findServiceById,
  updateService,
  deleteService,
};

module.exports = serviceController;
