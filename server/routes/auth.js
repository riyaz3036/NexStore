const express = require('express');
const {Register, Login } = require('../controllers/AuthController');

const router = express.Router();


//to register
router.post('/register',Register);


//to login
router.post('/login',Login);

module.exports = router;

