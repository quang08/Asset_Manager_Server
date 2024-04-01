const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

router.post("/", saleController.createSale);
// Define other routes for sale CRUD operations

module.exports = router;
