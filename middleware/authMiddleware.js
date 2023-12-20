const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    let token;
  
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select(-'password');
        next()
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorized, token failed ");
      }
    } else {
      res.status(401).json("Not Authorized, no token ")
      // throw new Error("Not Authorized, no token ");
    }
  };
  
  const admin = (req,res,next)=>{
      if(req.user && req.user.isAdmin){
          next()
      }else{
          res.status(401);
          throw new Error("Not Authorized as admin ");
      }
  } 
  
  module.exports={protect, admin}