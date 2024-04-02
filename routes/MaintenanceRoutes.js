const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

router.get("/", maintenanceController.getAllMaintenancerecords);
router.post("/", maintenanceController.createMaintenance);
router.put("/:id", maintenanceController.updateMaintenance);
router.delete("/:id", maintenanceController.deleteMaintenance);
router.get("/:id", maintenanceController.getMaintenanceById);


//...

module.exports = router;
