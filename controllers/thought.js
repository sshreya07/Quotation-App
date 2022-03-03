const Thought = require('../models/Thought');
const { validationResult } = require('express-validator');


//@desc     Get all thoughts
//@routes   GET request from /api/thought
//@access   public
exports.getThoughts = async (req, res, next) => {

    try {
        const thoughts = await Thought();

        res.status(200).json({
            success: true,
            thoughts
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            msg: 'server error'
        })
    }

}


//@desc     Create new thoughts
//@routes   POST request from /api/thoughts
//@access   Private
exports.createThought = async (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }

    // const user = await User.findById(req.user.id); //extracting user id from JWT by protecting the route

    // req.body.user = user.id;

    try {
        const thought = await Thought.create(req.body);             //Create data in our database
        res.status(201).json({success: true, data:thought});

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: `${err.message}`
        })
    }

}


//@desc     Update a thought
//@routes   PUT request from /api/thoughts/:id
//@access   Private
exports.updateThought = async(req, res, next) => {

    let thought = await Thought.findById(req.params.id)
    
    //make sure user is thought owner
    if(thought.user.toString() !== req.user.id){
        return res.status(401).json({
            success: false,
            msg:  `User has no Authorizations for updation of thought`
        })
    }

    thought = await Thought.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({success: true, data: thought});

}


//@desc     Delete a thought
//@routes   DELETE request from /api/thoughts/:id
//@access   Private
exports.deleteThought = async( req, res, next) => {

    let thought = await Thought.findById(req.params.id)
    
    //make sure user is thought owner
    if(thought.user.toString() !== req.user.id){
        return res.status(401).json({
            success: false,
            msg: `User has no Authorizations for deletion of thought`
        })
    }

    await thought.remove();

    res.status(200).json({success: true, data: {}});
}