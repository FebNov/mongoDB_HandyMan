const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    uppercase: true,
    alias: "code",
  },
  serviceName: { type: String, required: true },
  description: { type: String, default: "people " },
  needInfo: { type: Array, required: true },
  // tradies: {},
  jobs: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    select: false,
  },
});

const Model = mongoose.model("Service", schema);

module.exports = Model;
