'use strict';
//import necessary libraries:
require('dotenv').config();
const express = require('express');
const authRoute = require('./backend/routes/authRoute');
const activityRoute = require('./backend/routes/activityRoute.js');
//var userRoute = require('./backend/routes/userRoute.js');
//var activityRoute = require('./backend/routes/activityRoute.js');
const cors = require('cors');
const passport = require('./backend/utils/pass');

//TODO: error handling, passport, thumbnails
//start new express application:
const app = express();
const port = 3000;

app.use(cors());

app.use(express.static('uploads')); 
app.use('/thumbnails', express.static('thumbnails'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRoute);
//app.use('/user', userRoute);
app.use('/activity', activityRoute);

app.get('/', (req,res) => {
	res.json("Welcome to Nutitivity site")
});

app.use((req, res, next)=>{
    //  const err = new Error('Not found');
    //  err.status = 404;
    const err = httpError('Not found', 404);
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({message: err.message || "internal error"});
});


app.listen(port, () => console.log(`Example app listening on port ${port}`));
