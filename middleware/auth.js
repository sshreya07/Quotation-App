const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

//protecting routes
exports.protect = async (req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    //check if token
    if(!token){
        return res.status(401).json({
            msg: 'No Authorization for this route'
        })
    }

    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = await User.findById(decoded.id);

        next();
        
    } catch (err) {
        return res.status(401).json({
            msg: 'No Authorization for this route'
        })
    }

}