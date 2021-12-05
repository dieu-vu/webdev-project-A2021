//User controller:
const userModel = require('../models/userModel.js');

//const users = userModel.users;

const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
	const newUsers = users.map((user)=> {
		delete user.password;
		return user;
	});
	res.json(newUsers);
};

const user_get = async (req, res) => {
	const user = userModel.getUser(req.params.id);
	delete user.password;
	res.json(user);
};

const user_put = async (req, res) => {
	const user = req.body;
    console.log('USER_PUT', user);
    user.user_id = req.params.id;
    const updated = await userModel.user_put(user);
    console.log('USER_PUT', user);
    res.send(updated);
};

module.exports = {
	user_list_get,
	user_get,
	user_put,
};
