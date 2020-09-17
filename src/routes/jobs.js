const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
  addServiceToJob,
  removeServiceFromJob,
} = require("../controllers/jobs");

router.get("/", getAllJobs);
router.get("/:id", getJob);
router.post("/:", addJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
router.post("/:id/jobs/:", addServiceToJob);
router.delete("/:id", removeServiceFromJob);
module.exports = router;
