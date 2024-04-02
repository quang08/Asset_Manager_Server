const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");

router.post("/", purchaseController.createPurchase);
router.get("/", purchaseController.GetallPurchases);
router.put("/:id", purchaseController.updatePurchase);
router.delete("/:id", purchaseController.deletePurchase);
router.get("/:id", purchaseController.getPurchaseById);

//...

module.exports = router;
