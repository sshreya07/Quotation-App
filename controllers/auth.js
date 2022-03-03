const User = require('../models/User');
const { validationResult } = require('express-validator');



//@desc     login the users
//@route    POST request from /api/v1/auth/login       
//@access   Public
exports.login = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if(!user){
            return res.status(401).json({
                msg: 'Invalid Credentials'
            })
        }

        const isMatch = user.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({
                msg: 'Invalid Credentials'
            })
        }

        sendTokenResponse(user, 200, res);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            msg: 'server error'
        })
    }

}


//@desc     get Logged In user
//@route    GET request from /api/v1/auth/login       
//@access   Private
exports.getMe = async (req, res, next) => {
    
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    })

}


//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    //create token
    const token = user.getSignedJwtToken();

    res
        .status(statusCode)
        .json({
        success: true,
        token
    })
}