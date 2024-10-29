  
const adminAuth = async (req, res, next) => {
    
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }
 
  if (!user.isAdmin) {
    return res.status(401).json({ success: false, message: "Access Denied, Unauthorize User" });
  } 

  next();
};


module.exports = adminAuth;