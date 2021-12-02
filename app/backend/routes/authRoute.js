// Router file for authentication
'use strict';
// catRoute
const express = require('express');
const {body} = require('express-validator');
const {user_register} = require('../controllers/authController');
const router = express.Router(); // Creating a router







// TODO Consider making data sanitation for checking if e-mail is in use
// User registration route with server side validation
router.post('/register',
    body('email').isEmail(),
    body('name').isLength({min: 3}),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    user_register
);

module.exports = router;