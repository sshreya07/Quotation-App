const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect } = require('../middleware/auth');

const { login, getMe } = require('../controllers/auth');

router.post('/login', [
    check('email','Please provide a valid email').isEmail(),
    check('password','Please provide a password').exists()
] , login);

router.get('/login', protect, getMe );

module.exports = router;