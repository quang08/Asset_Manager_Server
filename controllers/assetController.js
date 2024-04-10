const Asset = require("../models/Asset");

const assetController = {
  getAllAssets: async (req, res) => {
    try {
      const assets = await Asset.find();
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createAsset: async (req, res) => {
    const newAsset = new Asset(req.body);
    try {
      const savedAsset = await newAsset.save();
      res.status(201).json(savedAsset);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAssetById: async (req, res) => {
    const { id } = req.params;
    try {
      const asset = await Asset.findById(id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.status(200).json(asset);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateAsset: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAsset = await Asset.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedAsset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.status(200).json(updatedAsset);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteAsset: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedAsset = await Asset.findByIdAndDelete(id);
      if (!deletedAsset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.status(200).json({ message: "Asset deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAssetStatus: async (req, res) => {
    const { id } = req.params;
    try {
      const asset = await Asset.findById(id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      const status = asset.currentStatus;
      res.status(200).json({ status });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};

module.exports = assetController;
