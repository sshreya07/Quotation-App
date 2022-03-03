const mongoose = require('mongoose');


//thought model
const ThoughtSchema = new mongoose.Schema({

    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'user',
    //     required: true
    // },

    title:{
        type: String,
        required: [true, 'Please add thought']
    },

    desc:{
        type: String,
        required: [true, 'Please describe']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('thought', ThoughtSchema)