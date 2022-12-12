const jwt = require('jsonwebtoken')
const jwt_key = require('../../config').JWT_KEY
module.exports = (req,res,next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1],jwt_key)
        req.userData= decoded;
        next();   
    } catch (error) {
        return res.status(401).json({message: "Auth failed"})
    } 
}