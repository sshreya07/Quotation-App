const express = require('express');
const router = express.Router();
// const { protect } = require('../middleware/auth');

const {
    getThoughts,
    createThought,
    updateThought,
    deleteThought
} = require('../controllers/thought');

const { check } = require('express-validator');


router.route('/')
    .get( getThoughts)
    .post([
        check('title', 'Please add title').not().isEmpty(),
        check('desc', 'Please add description').not().isEmpty()
    ] , createThought);


router.route('/:id')
    .put( updateThought)
    .delete(deleteThought);

module.exports = router;