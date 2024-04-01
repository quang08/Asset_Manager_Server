const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
  purchaseDate: { type: Date, required: true },
  purchaseCost: { type: Number, required: true },
  shop: { type: String, required: true },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
