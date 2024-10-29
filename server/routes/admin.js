const express = require("express");
const router = express.Router(); 
const User = require("../models/user"); 
const Contact = require("../models/contact"); 
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const adminAuth = require("../middlewares/admin-auth");
const {signupSchema, loginSchema} = require("../validators/auth");


// *-------------------------------
//*  Users Routes
// *-------------------------------
  
router.get("/users", auth, adminAuth, async (req, res, next) => {
  try { 
    const users = await User.find({}, { password: 0 });  
    if(users.length == 0){
        return res.status(404).json({success: false, message: "No Users Found" });
    }
    res.status(200).json({ success: true, users: users }); 
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", auth, adminAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, { password: 0 });
    res.status(200).json({ success: true, user: user }); 
  } catch (error) {
    next(error);
  }
});

router.patch("/users/update/:id", auth, adminAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    res.status(200).json({ success: true, user: updatedData }); 
  } catch (error) {
    next(error);
  }
});

router.delete("/users/delete/:id", auth, adminAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ success: true, message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
});


// *-------------------------------
//*  Contacts Routes
// *-------------------------------

router.get("/contacts", auth, adminAuth, async (req, res) => {
    try { 
      const contacts = await Contact.find();  
      if(contacts.length == 0){
          return res.status(404).json({success: false, message: "No Contacts Found" });
      }
      res.status(200).json({ success: true, contacts: contacts }); 
    } catch (error) {
      next(error);
    }
});

router.delete("/contacts/delete/:id", auth, adminAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ success: true, message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
});
  

module.exports = router;