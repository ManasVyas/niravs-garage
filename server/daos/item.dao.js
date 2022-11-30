const Item = require("../models/item.model");

const findItems = () => Item.find();

const createItem = (item, image) => {
  const newItem = new Item({
    name: item.name,
    description: item.description,
    cost: item.cost,
    quantity: item.quantity,
    sold: item.sold,
    image,
  });
  return newItem.save();
};

const findItemById = (id) => Item.findById(id);

const updateItem = (id, item, image) => {
  const updatedItem = {
    name: item.name,
    description: item.description,
    cost: item.cost,
    quantity: item.quantity,
    sold: item.sold,
    image,
  };
  return Item.findByIdAndUpdate(id, updatedItem, {
    useFindAndModify: false,
  });
};

const deleteItem = (id) => Item.findByIdAndDelete(id);

const itemDao = {
  findItems,
  createItem,
  findItemById,
  updateItem,
  deleteItem,
};

module.exports = itemDao;
