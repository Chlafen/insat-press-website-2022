const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    const token = req.headers["x-access-token"];

    if(!token){
        // Not authed
        req.user = {
            user_id: -1,
            role_id: -1, // Guest
        }
        next();
    }
    else{
        jwt.verify(token, process.env.JWT_SESSION_SECRET, {algorithm: 'HS256'}, (err, user) =>{
            if(err){
                // TODO: Invalid token
                return res.status(403).json({error: "Invalid access token!"});
            }
            req.user = user;
            next();
        });
    }
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
};