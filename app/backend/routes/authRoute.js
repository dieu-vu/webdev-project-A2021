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

// Use disk storage to control storing files:
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    }
})

const upload = multer({storage: storage, fileFilter});

const {login, logout, user_register} = require('../controllers/authController');
const router = express.Router(); // Creating a router


router.post('/login', login);
router.get('/logout', logout);


// User registration route with server side validation
router.post('/register',
    upload.single('user_filename'),
    body('email').isEmail(),
    body('name').isLength({min: 3}),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    user_register
);

module.exports = router;