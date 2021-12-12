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

const { activity_get, activity_delete, activity_list_get, activity_post, activity_update, activity_get_by_date, activity_get_by_location, activity_get_by_type, get_participants_by_activity, activity_get_by_user, participation_get_by_user, participation_post, last_24_hours_activity_list_get, participation_status_get, participation_delete, comment_get, comment_post } = require('../controllers/activityController');
const router = express.Router(); 
const {body} = require('express-validator');

router.route('/')
    .get(activity_list_get)
    .post(upload.single('activity_pic'),activity_post)
    .put(activity_update)


router.route('/:activityId')
    .get(activity_get)
    .delete(activity_delete)

router.route('/participation/:activityId')
    .post(participation_post)
    .delete(participation_delete)

router.route('/comment/:activityId')
    .get(comment_get)
    .post(comment_post)

router.post('/comments/:activityId', comment_post)

router.get('/last24hours/list', last_24_hours_activity_list_get) 

router.get('/searchDate/:searchDate', activity_get_by_date)

router.get('/searchLocation/:searchLocation', activity_get_by_location)

router.get('/searchType/:searchType', activity_get_by_type)

router.get('/participants/:activityId', get_participants_by_activity)

router.get('/usersActivities/:userId', activity_get_by_user)

router.get('/usersParticipation/:userId', participation_get_by_user)

router.get('/participationStatus/:activityId', participation_status_get)



module.exports = router;  