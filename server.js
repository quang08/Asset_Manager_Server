const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/db");
const assetRoutes = require("./routes/AssetRoutes");
const maintenanceRoutes = require("./routes/MaintenanceRoutes");
const purchaseRoutes = require("./routes/PurchaseRoutes");
const saleRoutes = require("./routes/SaleRoutes");
const authRouter = require("./routes/AuthRoutes")

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/assets", assetRoutes);



app.use("/maintenance", maintenanceRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/sale",saleRoutes);
app.use("/auth",authRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));