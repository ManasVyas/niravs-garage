const Order = require("../models/order.model");

const findOrders = () => Order.find();

const createOrder = (order) => {
  const newOrder = new Order({
    userId: order.userId,
    username: order.username,
    productId: order.productId,
    productName: order.productName,
    price: order.price,
  });
  return newOrder.save();
};

const findOrderById = (id) => Order.findById(id);

const updateOrder = (id, order) => {
  const updatedOrder = {
    userId: order.userId,
    username: order.username,
    productId: order.productId,
    productName: order.productName,
    price: order.price,
  };
  return Order.findByIdAndUpdate(id, updatedOrder, {
    useFindAndModify: false,
  });
};

const deleteOrder = (id) => Order.findByIdAndDelete(id);

const orderDao = {
  findOrders,
  createOrder,
  findOrderById,
  updateOrder,
  deleteOrder,
};

module.exports = orderDao;
