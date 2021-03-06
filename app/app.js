'use strict';
//import necessary libraries:
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const authRoute = require('./backend/routes/authRoute');
const activityRoute = require('./backend/routes/activityRoute');
const userRoute = require('./backend/routes/userRoute');

const {httpError} = require("./backend/utils/errors");
const passport = require('./backend/utils/pass');
const app = express(); // start new express application
const port = 3000;

//Load node modules by environment variables:
var environment = process.env.NODE_ENV || 'development';
if (environment == 'production') {
	require('./backend/utils/production')(app, process.env.PORT || 3000, process.env.HTTPS_PORT || 8000);
} else {
	require('./backend/utils/localhost')(app, process.env.HTTPS_PORT || 8000, process.env.HTTP_PORT || 3000);
}

app.use(cors());
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('./frontend'));
app.use(express.static('./backend/uploads'));
app.use('./thumbnails', express.static('thumbnails'));

app.use('/auth', authRoute);
app.use('/guest_activity',activityRoute);
app.use('/activity', passport.authenticate('jwt', {session: false}), activityRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);


app.get('/', async (req,res) => {
    if (req.secure) {
        res.sendFile("frontend/login.html", {root: __dirname});
    } else {
        res.sendFile("frontend/login.html", {root: __dirname});
    }
});


// Handling error
app.use((req, res, next)=>{
    const err = httpError('Not found', 404);
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({message: err.message || "internal error"});
});

