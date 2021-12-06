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
const upload = multer({dest:'./uploads/user/', fileFilter});

router.get('/', userController.user_list_get);

router.route('/:id')
    .get(userController.user_get)
    .put(
        upload.single('user'),
        body('name').not().isEmpty(),
		body('email').isEmail().not().isEmpty(),
		userController.user_put);

router.get('/token', checkToken);

module.exports = router;