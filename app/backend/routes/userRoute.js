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
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './backend/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') 
    }
  })

const upload = multer({storage: storage, fileFilter});

router.get('/', userController.user_list_get);

router.route('/:id')
    .get(userController.user_get)
    .put(
        upload.single('user_filename'),
        body('name').not().isEmpty(),
		body('email').isEmail().not().isEmpty(),
		userController.user_put);

router.get('/token', checkToken);

module.exports = router;