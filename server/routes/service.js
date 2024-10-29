const express = require("express");
const router = express.Router();
const Service = require("../models/service"); 
 

router.get("/get-all", async (req, res) => {
    try { 
      let allServices = await Service.find();
      return res.status(200).json({success: true, services: allServices });
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, message: "services not found" });
    }
});

module.exports = router;