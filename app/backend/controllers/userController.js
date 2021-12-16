//User controller:
const userModel = require('../models/userModel.js');
const {httpError} = require('../utils/errors');
const {body, validationResult} = require('express-validator');
const {makeThumbnail} = require('../utils/resize.js');
const {response} = require('express');
const bcrypt = require('bcryptjs');

// User list is for admin only:
const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
    const newUsers = users.map((user) => {
        delete user.password;
        return user;
    });
    res.json(newUsers);
};

//User get return the user and all related activities:
const user_get = async (req, res, next) => {
    const user = await userModel.getUser(req.params.id, next);
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
    if (!errors.isEmpty()) {
        console.error('user_put validation', errors.array());
        const err = httpError('data not valid', 400);
        next(err);
        return;
    }
    try {
        const user = req.body;
        console.log('USER PUT REQ', user);
        user.user_id = parseInt(req.user.user_id);
        user.email = req.body.email;
        user.name = req.body.name;

        const originalUser = await userModel.getUser(user.user_id);

        if (user.email === "blank@.invalid"){ user.email = originalUser.email };
        if (user.name === "blank") { user.name = originalUser.name };
        //If user upload a new picture, create thumbnail
        if (!req.file) {
            user.user_filename = req.user.user_filename;
            console.log('NO FILE IN PUT REQUEST', req.file)
        } else {
            const thumb = await makeThumbnail(req.file.path, req.file.filename);
            console.log('thumbnail_PUT', req.file.path, req.file.filename);
            user.user_filename = req.file.filename;
        }
        console.log('USER_PUT', user);

        //Validating if email address is existing in database and different from the current one
        const validEmail = await userModel.validateEmailUpdate(user);
        if (validEmail) {
            const updated = await userModel.editUser(user);
            res.json({message: `Successfully updated profile!`, emailValid: true});
        } else {
            res.json({message: `Email address is taken!`, emailValid: false});
        }
    } catch (e) {
        console.log('USER PUT ERROR', e.message);
        const err = httpError('Error updating user', 404);
        next(err);
    }
};


const user_update_password = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('user change password validation', errors.array());
        const err = httpError('data not valid', 400);
        next(err);
        return;
    }
    try {
        const reqUser = req.body;
        const user = await userModel.getUser(req.user.user_id, next);

        reqUser.user_id = parseInt(req.user.user_id);
        reqUser.password = req.body.currentPassword;
        reqUser.newPassword = bcrypt.hashSync(req.body.newPassword, 12);
        console.log(reqUser);
        console.log(user);

        //Check if the current password matching with the encrypted password in database
        if (await bcrypt.compare(reqUser.password, user.password)) {
            const updated = await userModel.updatePassword(reqUser);
            res.json({message: `Update password succeeded`});
        } else {
            res.json({message: `Update password failed, old password incorrect`});
        }

    } catch (e) {
        console.log('USER CHANGE PASSWORD ERROR', e.message);
        const err = httpError('Error update user password', 404);
        next(err);
    }
};

const user_change_role = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('user promote validation', errors.array());
        const err = httpError('data not valid', 400);
        next(err);
        return;
    }
    try {
        const promotedUserId = req.params.id;
        const user = await userModel.getUser(promotedUserId, next);
        console.log('promoted user current role', user.role);

        //Check if the user's curent role in database:
        if (user.role === 0) {
            res.json({message: `User is a mighty admin`});
        } else if (user.role === 2) {
            const updated = await userModel.changeUserModRole(promotedUserId, 1);
            res.json({message: `User demotion succeeded`});
            console.log("demoted role");
        } else {
            const updated = await userModel.changeUserModRole(promotedUserId, 2);
            res.json({message: `User promotion succeeded`});
            console.log("promoted role");
        }
    } catch (e) {
        console.log('USER PROMOTE ERROR', e.message);
        const err = httpError('Error update user role', 404);
        next(err);
    }
};

const user_delete = async (req, res) => {
    const deletedUserId = req.params.id;
    console.log('USER_DELETE', deletedUserId);
    const currentUser = req.user;
    const deleted = await userModel.deleteUser(currentUser, deletedUserId);
    res.json({message: `Account has been deleted.`});
    res.send(`removed user Id ${deleted}`);
};


const checkToken = (req, res, next) => {
    if (!req.user) {
        next(httpError('token not valid', 400));
    } else {
        res.json({user: req.user});
    }
};

module.exports = {
    user_list_get,
    user_get,
    user_put,
    user_update_password,
    user_change_role,
    user_delete,
    checkToken,
};
