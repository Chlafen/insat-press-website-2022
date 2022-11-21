const jwt = require('jsonwebtoken');
const { Log } = require('../models');

const authMiddleware = (req, res, next)=>{
    const token = req.headers["x-access-token"];
    if(!token){
      // TODO: Not authed
      console.log("  No token provided");
      return res.status(401).json({error: "You need to signin!"});
    }

    jwt.verify(token, process.env.JWT_SESSION_SECRET, {algorithm: 'HS256'}, (err, user) =>{
        if(err){
            // TODO: Invalid token
            console.log('  JWT error:', err.message);
            return res.status(403).json({error: "Invalid access token!"});
        }
        console.log("  User authorized successfully...");
        console.log("  ", user);
        req.user = user;
        next();
    });
}

/**
 * 
 * @description adds user info to the request object
 */
const getUserId = (req, res, next) =>{
  const token = req.headers["x-access-token"];
  req.user = null;
  if(token){
    jwt.verify(token, process.env.JWT_SESSION_SECRET, {algorithm: 'HS256'}, (err, user) =>{
      if(!err){
        req.user = user;
      }
    });
  }
  next();
}

const verifyAccess = (role_id) =>{
    return (req, res, next) =>{
        if(!req.user){
            return res.status(401).json({error: "You need to signin!"});
        }
        console.log(req.user)

        if(req.user.role_id !== role_id){
            return res.status(403).json({error: "No permission."})
        }

        next();
    }
}

module.exports = {
    authMiddleware,
    verifyAccess,
    getUserId,
};