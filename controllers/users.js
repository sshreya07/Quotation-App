const User = require('../models/User');
const { validationResult } = require('express-validator');

//@route    POST api/users
//@desc     register a user
//@access   Public
exports.createUser = async (req, res, next) => {

    // console.log(req.body);
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; 
    
   try {
        let user = await User.findOne({ email });

        if (user) {
        return res.status(400).json({ msg: 'User already exist' })
        }

        //create user
        user = await User.create({
            name, 
            email,
            password,
        });     //create data in our database


        sendTokenResponse(user, 201, res);


   } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            msg: 'server error'
        })
   }

    
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