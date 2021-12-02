'use strict';
//import necessary libraries:
require('dotenv').config();
const express = require('express');
const authRoute = require('./backend/routes/authRoute');
//var userRoute = require('./backend/routes/userRoute.js');
//var activityRoute = require('./backend/routes/activityRoute.js');
const cors = require('cors');
const passport = require('./backend/utils/pass');

//TODO: error handling, passport, thumbnails
//start new express application:
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRoute);
//app.use('/user', userRoute);
//app.use('/activity', activityRoute);

app.get('/', (req,res) => {
	res.json("Welcome to Nutitivity site")
});


app.listen(port, () => console.log(`Example app listening on port ${port}`));
