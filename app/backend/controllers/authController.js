// Controller file for authentication
const {registerUser} = require('../models/userModel');
const { httpError } = require('../utils/errors');
const {validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const passport = require('passport');


// User login



// User registration -- TODO add bcrypt and validation
const user_register = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const err = httpError('data not valid', 400);
        next(err);
        return;
    }
    const user = req.body;
    console.log('add user data', req.body);
    const id = await registerUser(user);
    res.json({message: `user added with id: ${id}`});
};

module.exports = {
    user_register,
};
