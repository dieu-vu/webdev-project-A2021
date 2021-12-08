//User controller:
const userModel = require('../models/userModel.js');
const {httpError} = require('../utils/errors');
const { body, validationResult } = require('express-validator');

//const users = userModel.users;

// User list is for admin only:
const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
	const newUsers = users.map((user)=> {
		delete user.password;
		return user;
	});
	res.json(newUsers);
};

//User get return the user and all related activities:
const user_get = async (req, res, next) => {
	const user = await userModel.getUser(req.params.id, next); //TODO: Update this to get user_id from req.user
	if (!user) {
		const err = httpError('User not found', 404);
		next(err);
		return;
	}
	delete user.password;
    user.ownActivity = await userModel.getOwnActivity(user);
    user.participateActivity = await userModel.getParticipatingActivity(user);
	res.json(user);
};


// user_put allows user to edit their profile:
const user_put = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		console.error('user_put validation', errors.array());
		const err = httpError('data not valid', 400);
		next(err);
		return;
	}
	const user = req.body;
    user.user_id = parseInt(req.user.user_id); 
	console.log('USER_PUT', user);
	

    const updated = await userModel.editUser(user);
    res.send(updated);
};

const checkToken = (req, res, next) => {
	if (!req.user) {
		next(httpError('token not valid', 400));
	} else {
		res.json({ user: req.user });
	}
};

module.exports = {
	user_list_get,
	user_get,
	user_put,
	checkToken,
};
