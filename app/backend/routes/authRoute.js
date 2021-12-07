// Router file for authentication
'use strict';
const express = require('express');
const {body} = require('express-validator');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({dest: './backend/uploads/', fileFilter});
const router = express.Router(); // Creating a router
const {login, logout, user_register} = require('../controllers/authController');

router.post('/login', login);
router.get('/logout', logout);


// TODO Consider making data sanitation for checking if e-mail is in use
// User registration route with server side validation
router.post('/register',
    upload.single('user_filename'),
    body('email').isEmail(),
    body('name').isLength({min: 3}),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    user_register
);

module.exports = router;