const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");

router.get("/", assetController.getAllAssets);
router.post("/", assetController.createAsset);
router.get("/:id", assetController.getAssetById);
router.put("/:id", assetController.updateAsset);
router.delete("/:id", assetController.deleteAsset);
router.get("/:id/status", assetController.getAssetStatus);

module.exports = router;
