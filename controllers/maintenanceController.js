const Maintenance = require("../models/Maintenance");

const maintenanceController = {
  getAllMaintenance: async (req, res) => {
    try {
      const maintenance = await Maintenance.find();
      res.status(200).json(maintenance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
//...
};

module.exports = maintenanceController;
