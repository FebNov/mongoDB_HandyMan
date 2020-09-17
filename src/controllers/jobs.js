const { findById } = require("../models/jobs");
const JobModel = require("../models/jobs");
const ServiceModel = require("../models/services");

async function getAllJobs(req, res) {
  const jobs = await JobModel.find().exec();
  return res.json(jobs);
}

async function getJob(req, res) {
  const { id } = req.params;
  const job = await JobModel.findById(id).exec();
  if (!job) {
    return res.status(404).json("Job Not Found");
  }
  return res.json(job);
}

async function addJob(req, res) {
  const { id, jobName } = res.body;
  const job = new JobModel({ id, jobName });
  const existId = await JobModel.findByEmail(id).exec();
  if (existId) {
    return res.status(409).json("Job Existed");
  }
  await job.save;
  return res.json(job);
}

async function deleteJob(req, res) {
  const { id } = req.params;
  const job = await JobModel.findByIdAndDelete(id).exec();
  if (!job) {
    return res.status(404).json("Job Not Found");
  }
  return res.sendStatus(204);
}

async function updateJob(req, res) {
  const { id } = req.params;
  const { jobName } = req.body;

  const job = await JobModel.findByIdAndUpdate(
    id,
    { jobName },
    { new: true }
  ).exec();

  if (!Job) {
    return res.status(404).json("Job Not Found");
  }
  await job.save();
  return res.json(job);
}

async function addServiceToJob(req, res) {
  const { id, code } = req.params;
  const service = await ServiceModel.findByCode(code).exec();
  const job = await JobModel.findById(id).exec();
  if (!service || !job) {
    return res.status(404).json("service or job not found");
  }
  job.service.addToSet(service._id);
  service.job.addToSet(job._id);
  await job.save();
  await service.save();
  return res.json(job);
}
async function removeServiceFromJob(req, res) {
  const { id, code } = req.params;
  const service = await ServiceModel.findByCode(code).exec();
  const job = await JobModel.findById(id).exec();
  if (!service || !job) {
    return res.status(404).json("service or job not found");
  }

  job.service.pull(service._id);
  // if(job.service.map(i=>i.toString()).includes(service._id))

  service.job.pull(job._id);
  await job.save();
  await service.save();
  return res.json(job);
}
module.exports = {
  getAllJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
  addServiceToJob,
  removeServiceFromJob,
};
