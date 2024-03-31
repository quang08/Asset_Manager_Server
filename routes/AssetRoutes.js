const express = require('express');
const router = express.Router();
const assetControllers = require("../controllers/assetController");

router.get("/", assetControllers.getAllAssets);

module.exports = router;