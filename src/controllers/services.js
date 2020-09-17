const JobModel = require("../models/jobs");
const ServiceModel = require("../models/services");

async function getAllServices(req, res) {
  const services = await ServiceModel.find().exec();
  return res.json(services);
}

async function getService(req, res) {
  const { id } = req.params;
  const service = await ServiceModel.findById(id).exec();
  if (!service) {
    return res.status(404).json("Service Not Found");
  }
  return res.json(service);
}

async function addService(req, res) {
  const { id, serviceName } = res.body;
  const service = new ServiceModel({ id, serviceName });
  const existId = await ServiceModel.findByEmail(id).exec();
  if (existId) {
    return res.status(409).json("Id Existed");
  }
  await service.save;
  return res.json(service);
}

async function deleteService(req, res) {
  const { id } = req.params;
  const service = await ServiceModel.findByIdAndDelete(id).exec();
  if (!service) {
    return res.status(404).json("service Not Found");
  }
  return res.sendStatus(204);
}

async function updateService(req, res) {
  const { id } = req.params;
  const { serviceName } = req.body;

  const service = await ServiceModel.findByIdAndUpdate(
    id,
    { serviceName },
    { new: true }
  ).exec();

  if (!service) {
    return res.status(404).json("service Not Found");
  }
  await service.save();
  return res.json(service);
}

function addJobToService() {}
function removeJobFromService() {}
module.exports = {
  getAllServices,
  getService,
  addService,
  deleteService,
  updateService,
  addJobToService,
  removeJobFromService,
};
