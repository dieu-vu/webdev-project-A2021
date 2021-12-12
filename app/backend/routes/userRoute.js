//User Route:
'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const {checkToken} = require('../controllers/userController');
const { body, validationResult } = require('express-validator');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
	if(file.mimetype.includes('image')){
		cb(null, true);
	};
	cb(null, false);
};
// Use disk storage to control storing files:
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    }
  })

const upload = multer({storage: storage, fileFilter});

router.get('/', userController.user_list_get);

router.route('/:id')
    .get(userController.user_get)
    .put(
        upload.single('user_filename'),
        body('name', 'minimum 3 characters'),
		body('email', 'email is not valid').isEmail(),
		userController.user_put)
    .delete(userController.user_delete);

router.route('/:id/passwordChange')
    .get(userController.user_get)
    .put(
        body('newPassword').matches('(?=.*[A-Z]).{8,}'),
        body('checkPassword').matches('(?=.*[A-Z]).{8,}'),
        userController.user_update_password
    );

router.get('/token', checkToken);

module.exports = router;