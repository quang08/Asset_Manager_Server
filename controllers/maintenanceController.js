const Maintenance = require("../models/Maintenance");

const maintenanceController = {
  getAllMaintenancerecords: async (req, res) => {
    try {
      const maintenance = await Maintenance.find();
      res.status(200).json(maintenance);
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
