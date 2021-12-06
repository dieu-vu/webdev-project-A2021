'use strict';
const express = require('express');
const multer = require('multer');
const fileFilter = (req, file, cb) => {
    if(file.mimetype.includes('image')){
        cb(null, true);
    }else{
        cb(null, false);
    }
};
const upload = multer({dest: './backend/uploads/', fileFilter});
const { activity_get, activity_delete, activity_list_get, activity_post, activity_update, activity_get_by_date, activity_get_by_location, activity_get_by_type, get_participants_by_activity, activity_get_by_user, participation_get_by_user, participation_post, last_24_hours_activity_list_get } = require('../controllers/activityController');
const router = express.Router(); 
const {body} = require('express-validator');

router.route('/')
    .get(activity_list_get)
    .post(upload.single('activity_pic'),activity_post)
    .put(activity_update)


router.route('/:activityId')
    .get(activity_get)
    .delete(activity_delete)

router.get('/last24hours/list', last_24_hours_activity_list_get) 

router.get('/searchDate/:searchDate', activity_get_by_date)

router.get('/searchLocation/:searchLocation', activity_get_by_location)

router.get('/searchType/:searchType', activity_get_by_type)

router.get('/participants/:activityId', get_participants_by_activity)

router.get('/usersActivities/:userId', activity_get_by_user)

router.get('/usersParticipation/:userId', participation_get_by_user)

router.post('/participation/:activityId', participation_post)



module.exports = router;  