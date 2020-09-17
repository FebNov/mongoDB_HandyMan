const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  jobName: { type: String, required: true },
  description: { type: String, default: "people " },
  services: {
    type: [{ type: String, ref: "Service" }],
    select: false,
  },
});

const Model = mongoose.model("Job", schema);

module.exports = Model;
