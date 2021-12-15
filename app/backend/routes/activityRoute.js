'use strict';
const express = require('express');
const multer = require('multer');
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
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

const {
    activity_get,
    activity_delete,
    activity_list_get,
    activity_post,
    activity_update,
    activity_get_by_date,
    activity_get_by_location,
    activity_get_by_type,
    get_participants_by_activity,
    activity_get_by_user,
    participation_get_by_user,
    participation_post,
    last_24_hours_activity_list_get,
    participation_status_get,
    participation_delete,
    comment_get,
    comment_post
} = require('../controllers/activityController');
const router = express.Router();
const {body} = require('express-validator');
//get, post and modify 
router.route('/')
    .get(activity_list_get)
    .post(upload.single('activity_pic'),
     body('name').notEmpty(),
     body('location').notEmpty(),
     body('description').notEmpty(),
     body('VET', 'input time is not valid').matches(/^\d{4}-(0[0-9]|1[0-3])-[0-3]\dT([0-1][0-9]|2[0-3]):[0-5]\d/),
     activity_post)

//get and delete activity by activity id
router.route('/:activityId')
    .get(activity_get)
    .delete(activity_delete)
//post and delete participation by activity id
router.route('/participation/:activityId')
    .post(participation_post)
    .delete(participation_delete)
//get and post comment by activity id
router.route('/comment/:activityId')
    .get(comment_get)
    .post(
     body('comment').notEmpty(),
     comment_post)
//get last 24 hours activity list
router.get('/last24hours/list', last_24_hours_activity_list_get) 
//search activity by date
router.get('/searchDate/:searchDate', activity_get_by_date)
//search activity by location
router.get('/searchLocation/:searchLocation', activity_get_by_location)
//search activity by type
router.get('/searchType/:searchType', activity_get_by_type)
//get participation list by activity id
router.get('/participants/:activityId', get_participants_by_activity)
//get activity list by user id
router.get('/usersActivities/:userId', activity_get_by_user)
//get participation list by user id
router.get('/usersParticipation/:userId', participation_get_by_user)

router.get('/participationStatus/:activityId', participation_status_get)


module.exports = router;