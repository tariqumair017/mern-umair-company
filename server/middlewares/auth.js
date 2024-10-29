const jwt = require("jsonwebtoken"); 
const User = require("../models/user");
// import dotenv from "dotenv";
// dotenv.config(); 


const auth = async (req, res, next) => {
  // get token from header
  const token = req.header("authorization");

  // check if token exists
  if (!token) {
    return res.status(401).json({ success: false, message: "no-token" });
  }

  let jwtToken = token.replace("Bearer", "").trim();

  // Verify token
  try {
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) { 
        return res.status(401).json({success: false, message: "Token Expired" });
      } else { 
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      }
    });
  } catch (error) { 
    res.status(500).json({success: false, message: "Server Error" });
  }
};


module.exports = auth;