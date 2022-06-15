const jwt = require('jsonwebtoken');

const generateAuthToken = (user)=>{
    return jwt.sign(
        {
            user_id: user.user_id,
            role_id: user.type_id,
        },
        process.env.JWT_SESSION_SECRET,
        {
            expiresIn: "30m",
            algorithm: 'HS256'
        }
    );
}

module.exports = {
    generateAuthToken
};