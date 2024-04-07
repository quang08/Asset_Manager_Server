const Maintenance = require("../models/Maintenance");
const Asset = require('../models/Asset');


const maintenanceController = {
   getAllMaintenanceRecords: async (req, res) =>{
    try {
      // Find assets with currentStatus set to "Maintaining"
      const maintainingAssets = await Asset.find({ currentStatus: "Maintaining" });
  
      // Iterate over maintainingAssets and create maintenance records
      const maintenancePromises = maintainingAssets.map(async (asset) => {
        // Create a new maintenance record for the asset
        const newMaintenance = new Maintenance({
          asset: asset._id,
          type: "Routine maintenance", // Adjust the type as needed
          date: new Date(), // Set the current date or adjust as needed
          description: "Routine maintenance description", // Provide a description
          cost: 0, // Set the cost as needed
        });
  
        // Save the new maintenance record
        return await newMaintenance.save();
      });
  
      // Execute all maintenance creation promises
      const maintenanceRecords = await Promise.all(maintenancePromises);
  
      res.status(200).json(maintenanceRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  



  createMaintenance: async (req, res) => {
    const newMaintenance = new Maintenance(req.body);
    try {
      const savedMaintenance = await newMaintenance.save();
      res.status(201).json(savedMaintenance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateMaintenance: async (req, res) => {
    const { id } = req.params;
    try {
      const updateMaintenance = await Maintenance.findByIdAndUpdate(id, req.body, {
        new: true,
      });
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
