const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  purchaseDate: { type: Date },
  purchaseCost: { type: Number },
  currentStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
