const itemDao = require("../daos/item.dao");

const createItem = async (req, res) => {
  try {
    const data = await itemDao.createItem(req.body, req.file.path);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findItems = async (req, res) => {
  try {
    const data = await itemDao.findItems();
    if (data.length === 0)
      return res.status(200).json({ success: true, data: [] });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findItemById = async (req, res) => {
  try {
    const data = await itemDao.findItemById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Item not found!" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const data = itemDao.findItemById(req.body._id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Item not Found!" });
    const item = await itemDao.updateItem(
      req.body._id,
      req.body,
      req.file ? req.file.path : data.image
    );
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const data = await itemDao.findItemById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Item not Found!" });
    const item = await itemDao.deleteItem(req.params.id);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const itemController = {
  createItem,
  findItems,
  findItemById,
  updateItem,
  deleteItem,
};

module.exports = itemController;
