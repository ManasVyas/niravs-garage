const orderDao = require("../daos/order.dao");

const createOrder = async (req, res) => {
  try {
    const data = await orderDao.createOrder(req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findOrders = async (req, res) => {
  try {
    const data = await orderDao.findOrders();
    if (data.length === 0)
      return res.status(200).json({ success: true, data: [] });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findOrderById = async (req, res) => {
  try {
    const data = await orderDao.findOrderById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Order not found!" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const data = orderDao.findOrderById(req.body._id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Order not Found!" });
    const order = await orderDao.updateOrder(
      req.body._id,
      req.body
    );
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const data = await orderDao.findOrderById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Order not Found!" });
    const order = await orderDao.deleteOrder(req.params.id);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const orderController = {
  createOrder,
  findOrders,
  findOrderById,
  updateOrder,
  deleteOrder,
};

module.exports = orderController;
