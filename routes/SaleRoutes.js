const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

router.get("/", saleController.GetallSales);
router.post("/", saleController.createSale);
router.get("/:id", saleController.getSaleById);
router.put("/:id", saleController.updateSale);
router.delete("/:id", saleController.deleteSale);
// Define other routes for sale CRUD operations

module.exports = router;
