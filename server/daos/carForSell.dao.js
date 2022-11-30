const CarForSell = require("../models/carForSell.model");

const findCarsForSell = () => CarForSell.find();

const createCarForSell = (carForSell, image) => {
  const newCarForSell = new CarForSell({
    name: carForSell.name,
    registration: carForSell.registration,
    cost: carForSell.cost,
    quantity: carForSell.quantity,
    sold: carForSell.sold,
    image,
  });
  return newCarForSell.save();
};

const findCarForSellById = (id) => CarForSell.findById(id);

const updateCarForSell = (id, carForSell, image) => {
  const updatedCarForSell = {
    name: carForSell.name,
    registration: carForSell.registration,
    cost: carForSell.cost,
    quantity: carForSell.quantity,
    sold: carForSell.sold,
    image,
  };
  return CarForSell.findByIdAndUpdate(id, updatedCarForSell, {
    useFindAndModify: false,
  });
};

const deleteCarForSell = (id) => CarForSell.findByIdAndDelete(id);

const carForSellDao = {
  findCarsForSell,
  createCarForSell,
  findCarForSellById,
  updateCarForSell,
  deleteCarForSell,
};

module.exports = carForSellDao;
