const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
  type: { type: String },
  date: { type: Date, required: true },
  description: { type: String },
  cost: { type: Number },
});

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;
