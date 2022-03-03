const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { createUser } = require('../controllers/users');

router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email','Please provide a valid email').isEmail(),
    check('password','Please provide a password with 6 or more characters').isLength({min:6})
] , createUser);

module.exports = router;
