const Asset = require("../models/Asset");
const Maintenance = require("../models/Maintenance");

const maintenanceController = {
  getAllMaintenanceRecords: async (req, res) => {
    try {
      // Find assets with currentStatus set to "Maintaining"
      const maintainingAssets = await Asset.find({
        currentStatus: "Maintaining",
      });

      // Fetch maintenance records for maintaining assets
      const maintenanceRecords = await Maintenance.find({
        asset: { $in: maintainingAssets.map((asset) => asset._id) },
      });

      res.status(200).json(maintenanceRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createMaintenance: async (req, res) => {
    const { assetId, description, cost } = req.body;

    try {
      // Find the asset based on the provided ID
      const asset = await Asset.findById(assetId);

      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }

      // Create the maintenance record with asset details
      const newMaintenance = new Maintenance({
        asset: asset._id,
        assetName: asset.name,
        date: new Date(), // Set the date as needed
        description: description, // Set the description from user input
        cost: cost,
      });

      // Save the maintenance record
      const savedMaintenance = await newMaintenance.save();

      // Update the asset's currentStatus to "Maintaining"
      asset.currentStatus = "Maintaining";
      await asset.save();

      res.status(201).json(savedMaintenance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateMaintenance: async (req, res) => {
    const { id } = req.params;
    try {
      const updateMaintenance = await Maintenance.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      if (!updateMaintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
      }
      res.status(200).json(updateMaintenance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteMaintenance: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteMaintenance = await Maintenance.findByIdAndDelete(id);
      if (!deleteMaintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
      }
      res.status(200).json({ message: "Maintenance deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMaintenanceById: async (req, res) => {
    const { id } = req.params;
    try {
      const getMaintenanceById = await Maintenance.findById(id);
      if (!getMaintenanceById) {
        return res.status(404).json({ message: "Maintenance not found" });
      }
      res.status(200).json(getMaintenanceById);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //...
};

module.exports = maintenanceController;
