// Controller file for authentication
'use strict'
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {registerUser} = require('../models/userModel');
const { httpError } = require('../utils/errors');
const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');


// User login with token
const login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('local params', err, user, info);
        console.log(req.body);
        if (err || !user) {
            next(httpError('username / password incorrect', 400));
            return;
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                next(httpError('login error', 400));
                return;
            }
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({ user, token });
        });
    })(req, res, next);
};


// User registration
// TODO error handling and thumbnails
const user_register = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const err = httpError('data not valid', 400);
        next(err);
        return;
    }

    req.body.password = bcrypt.hashSync(req.body.password, 12)
    const user = req.body;
    console.log('add user data', req.body);
    const id = await registerUser(user);
    res.json({message: `user added with id: ${id}`});
};

module.exports = {
    login,
    user_register,
};
