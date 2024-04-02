const Purchase = require("../models/Purchase");

const purchaseController = {
  createPurchase: async (req, res) => {
    const newPurchase = new Purchase(req.body);
    try {
      const savedPurchase = await newPurchase.save();
      res.status(201).json(savedPurchase);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // Implement other controller functions for CRUD operations

  GetallPurchases: async (req, res) => {
    try {
      const Purchases = await Purchase.find();
      res.status(200).json(Purchases);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 

  updatePurchase: async (req, res) => {
    const { id } = req.params;
    try {
      const updatePurchase = await Purchase.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatePurchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      res.status(200).json(updatePurchase);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deletePurchase: async (req, res) => {
    const { id } = req.params;
    try {
      const deletePurchase = await Purchase.findByIdAndDelete(id);
      if (!deletePurchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPurchaseById: async (req, res) => {
    const { id } = req.params;
    try {
      const getPurchaseById = await Purchase.findById(id);
      if (!getPurchaseById) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      res.status(200).json(getPurchaseById);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },



};

module.exports = purchaseController;
