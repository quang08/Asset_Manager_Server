const Asset = require("../models/Asset");
const Maintenance = require("../models/Maintenance");

const populateMaintenances = async () => {
    try {
      // Find all assets with currentStatus set to "Maintaining"
      const maintainingAssets = await Asset.find({ currentStatus: "Maintaining" }).maxTimeMS(30000); // Set timeout to 30 seconds
  
      // Iterate over each maintaining asset
      for (const asset of maintainingAssets) {
        // Create a maintenance record for the asset
        const maintenance = new Maintenance({
            asset: asset._id, // Reference to the asset
            date: new Date(), // Set the maintenance date
            description: asset.description, // Provide a description
            cost: 1000, // Specify the maintenance cost
          });
  
        // Save the maintenance record to the database
        await maintenance.save();
      }
  
      console.log("Maintenances collection populated successfully.");
    } catch (error) {
      console.error("Error populating Maintenances collection:", error);
    }
  };
  
  // Call the function to populate the Maintenances collection
  populateMaintenances();
  