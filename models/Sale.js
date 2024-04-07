const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
  assetName: { type: String },
  saleDate: { type: Date, required: true },
  salePrice: { type: Number, required: true },
  buyer: { type: String, required: true },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
