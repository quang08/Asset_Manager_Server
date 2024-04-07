const Asset = require("../models/Asset");
const Sale = require("../models/Sale");

const saleController = {
  createSale: async (req, res) => {
    const { assetId, salePrice, buyer } = req.body;

    try {
      const asset = await Asset.findById(assetId);

      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }

      const newSale = new Sale({
        asset: asset._id,
        assetName: asset.name,
        saleDate: new Date(),
        salePrice: salePrice,
        buyer: buyer,
      });

      const savedSale = await newSale.save();

      asset.currentStatus = "Sold";
      await asset.save();

      res.status(201).json(savedSale);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  GetallSales: async (req, res) => {
    try {
      const soldAssets = await Asset.find({
        currentStatus: "Sold",
      });

      const salesRecords = await Sale.find({
        asset: { $in: soldAssets.map((asset) => asset._id) },
      });

      res.status(200).json(salesRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateSale: async (req, res) => {
    const { id } = req.params;
    try {
      const updateSale = await Sale.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateSale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.status(200).json(updateSale);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteSale: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteSale = await Sale.findByIdAndDelete(id);
      if (!deleteSale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.status(200).json({ message: "Sale deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getSaleById: async (req, res) => {
    const { id } = req.params;
    try {
      const getSaleById = await Sale.findById(id);
      if (!getSaleById) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.status(200).json(getSaleById);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = saleController;
