const Service = require("../models/service.model");

const findServices = () => Service.find();

const createService = (service, image) => {
  const newService = new Service({
    name: service.name,
    cost: service.cost,
    description: service.description,
    image,
  });
  return newService.save();
};

const findServiceById = (id) => Service.findById(id);

const updateService = (id, service, image) => {
  const updatedService = {
    name: service.name,
    cost: service.cost,
    description: service.description,
    image,
  };
  return Service.findByIdAndUpdate(id, updatedService, {
    useFindAndModify: false,
  });
};

const deleteService = (id) => Service.findByIdAndDelete(id);

const serviceDao = {
  findServices,
  createService,
  findServiceById,
  updateService,
  deleteService,
};

module.exports = serviceDao;
