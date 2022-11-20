const Car = require("../models/car.model");

const findCars = () => Car.find();

const createCar = (car, image) => {
  const newCar = new Car({
    name: car.name,
    registration: car.registration,
    userId: car.userId,
    image,
  });
  return newCar.save();
};

const findCarById = (id) => Car.findById(id);

const updateCar = (id, car, image) => {
  const updatedCar = {
    name: car.name,
    registration: car.registration,
    userId: car.userId,
    image,
  };
  return Car.findByIdAndUpdate(id, updatedCar, {
    useFindAndModify: false,
  });
};

const deleteCar = (id) => Car.findByIdAndDelete(id);

const findCarByUser = (userId) => Car.find({ userId });

const carDao = {
  findCars,
  createCar,
  findCarById,
  updateCar,
  deleteCar,
  findCarByUser,
};

module.exports = carDao;
