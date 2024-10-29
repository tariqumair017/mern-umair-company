const express = require("express");
const router = express.Router(); 
const User = require("../models/user"); 
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const {signupSchema, loginSchema} = require("../validators/auth");

 
router.post("/register", validate(signupSchema), async (req, res) => {
    try { 
      const { username, email, phone, password } = req.body;
  
      const userExist = await User.findOne({ email: email });
  
      if (userExist) {
        return res.status(400).json({ success: false, message: "email already exists" });
      }
  
      const userCreated = await User.create({ username, email, phone, password });
  
      // res.status(201).json({ message: "User registered successfully" });
      res.status(201).json({
        success: true,
        message: "Registration Successful",
        // token: await userCreated.generateToken(),
        // userId: userCreated._id.toString(),
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post("/login", validate(loginSchema), async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({success: false, message: "Invalid credentials" });
      }
  
      // const user = await bcrypt.compare(password, userExist.password);
      const isPasswordValid = await userExist.comparePassword(password);
  
      if (isPasswordValid) {
        res.status(200).json({
          success: true,
          message: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({success: false, message: "Invalid email or passord " });
      }
    } catch (error) {
      res.status(500).json({success: false, message: "Internal server error" });
    }
});

router.get("/loggedin-user", auth, async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id).select("-password"); 
    if (!user) {
      return res.status(400).json({success: false, message: "user not found" });
    }   
    res.status(200).json({ success: true, user: user }); 
  } catch (error) {
    res.status(500).json({success: false, message: "Internal server error" });
  }
});

module.exports = router;