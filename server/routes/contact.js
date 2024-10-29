const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const validate = require("../middlewares/validate");
const { contactSchema } = require("../validators/contact");
 

router.post("/store", validate(contactSchema), async (req, res) => {
    try {
      const response = req.body;
      await Contact.create(response);
      return res.status(200).json({success: true, message: "Message send successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, message: "Message not delivered" });
    }
});

module.exports = router;