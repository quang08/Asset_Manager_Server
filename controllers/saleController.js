const Sale = require("../models/Sale");

const saleController = {
  createSale: async (req, res) => {
    const newSale = new Sale(req.body);
    try {
      const savedSale = await newSale.save();
      res.status(201).json(savedSale);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    // Implement createSale controller function
  },
  // Implement other controller functions for CRUD operations
  GetallSales: async (req, res) => {
    try {
      const Sales = await Sale.find();
      res.status(200).json(Sales);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 

  updateSale: async (req, res) => {
    const { id } = req.params;
    try {
      const updateSale = await Sale.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateSale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.status(200).json(updateSale);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteSale: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteSale = await Sale.findByIdAndDelete(id);
      if (!deleteSale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.status(200).json({ message: "Sale deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getSaleById: async (req, res) => {
    const { id } = req.params;
    try {
      const getSaleById = await Sale.findById(id);
      if (!getSaleById) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.status(200).json(getSaleById);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = saleController;
