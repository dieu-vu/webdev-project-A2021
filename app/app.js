'use strict';

//import necessary libraries:
const cors = require('cors');
const express = require('express');
//TODO: error handling, passport, thumbnails

//start new express application:
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
	res.send("Welcome to Nutitivity site")
});
//place holder for route modules:
//var authRoute = require('./routes/authRoute.js');
//var userRoute = require('./routes/userRoute.js');
//var activityRoute = require('./routes/activityRoute.js');
	
//app.use('/auth', authRoute);
//app.use('/user', userRoute);
//app.use('/activity', activityRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
