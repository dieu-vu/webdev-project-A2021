// Controller file for authentication
'use strict'
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {validateEmailRegister, registerUser} = require('../models/userModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const {makeThumbnail} = require("../utils/resize");


// User login with token
const login = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('local params', err, user, info);
        console.log(req.body);
        if (err || !user) {
            next(httpError('username / password incorrect', 400));
            return;
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                next(httpError('login error', 400));
                return;
            }
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({user, token});
        });
    })(req, res, next);
};

// Logout
const logout = (req, res) => {
    req.logout();
    res.json({message: 'logout'});
};


// User registration with thumbnails
const user_register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = httpError('data not valid', 400);
        next(err);
        return;
    }

    // Resizing the image with thumbnail
    try {
        const user = req.body;
        user.email = req.body.email;
        user.name = req.body.name;
        user.password = bcrypt.hashSync(req.body.password, 12);

        // Add NULL to filename field for undefined file or not file at all
        if (!req.file) {
            user.user_filename = null;
        } else {
            const thumb = await makeThumbnail(req.file.path, req.file.filename);
            user.user_filename = req.file.filename;
        }

        //Validating if email address is existing in database:
        const validEmail = await validateEmailRegister(user);
        if (validEmail) {
            const id = await registerUser(user);
            res.json({message: `Successfully registered!`, emailValid: true});
        } else {
            res.json({message: `Email address is taken!`, emailValid: false});
        }
    } catch (e) {
        console.log('register error', e.message);
        const err = httpError('Error registering user', 400);
        next(err);
        return;
    }
    console.log('add user data', req.body);
};

module.exports = {
    login,
    logout,
    user_register,
};
