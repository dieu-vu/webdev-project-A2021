'use strict';
const { validationResult } = require('express-validator');
const {insertActivity, getActivity, deleteActivity, getActivityByDate, getActivityByLocation, getActivityByActivityName, getAllValidActivity, updateActivity, getParticipantList, getAllUsersValidActivity, getAllUsersParticipation, insertParticipation, getAllValidActivityInLast24Hours } = require('../models/activityModel');
const { httpError } = require('../utils/errors');


const activity_list_get = async (req, res, next) => {
    const activities = await getAllValidActivity(next);
    console.log('all activities', activities);
    if(activities.length < 1) {
        const err = httpError('No valid activity can be found at present!', 404);
        next(err);
        return;
    } 
    res.json(activities);
};

const last_24_hours_activity_list_get = async (req, res, next) => {
    const activities = await getAllValidActivityInLast24Hours(next);
    console.log('all activities', activities);
    if(activities.length < 1) {
        const err = httpError('Sorry, there is no activity posted within last 24 hours.', 404);
        next(err);
        return;
    } 
    res.json(activities);
};

const activity_get = async (req, res, next) => {
    const activity = await getActivity(req.params.activityId, next);
    if(!activity) {
        const err = httpError('Activity not found', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const activity_get_by_user = async (req, res, next) => {
    const activity = await getAllUsersValidActivity(req.user.user_id, next);
    if(activity.length < 1) {
        const err = httpError('User does not have any valid activity', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const participation_get_by_user = async (req, res, next) => {
    const activity = await getAllUsersValidActivity(req.user.user_id, next);
    if(activity.length < 1) {
        const err = httpError('User does not participate in any activity', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const activity_get_by_date = async (req, res, next) => {
    const activity = await getActivityByDate(req.params.searchDate, next);
    if(activity.length < 1) {
        const err = httpError('Sorry, there is no activity available on this date at this moment. Please try to search other date.', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const activity_get_by_location = async (req, res, next) => {
    const activity = await getActivityByLocation(req.params.searchLocation, next);
    if(activity.length < 1) {
        const err = httpError('Sorry, there is no activity available on this location at this moment. Please try to search other location.', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const activity_get_by_type = async (req, res, next) => {
    const activity = await getActivityByActivityName(req.params.searchType, next);
    if(activity.length < 1) {
        const err = httpError('Sorry, there is no such activity available at this moment. Please try to search other activity. Good luck.', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const get_participants_by_activity = async (req, res, next) => {
    const participants = await getParticipantList(req.params.activityId, next);
    if(participants.length < 1) {
        const err = httpError('No participants found', 404);
        next(err);
        return;
    } 
    res.json(participants);
};

const activity_post = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      console.error('activity_post validation', errors.array());
    const err = httpError('data not valid', 400)
    next(err);
    return;
    } 

    console.log('add activity data', req.body);
    console.log('filename', req.file);
    
    if(!req.file){
        const err = httpError('Invalid file', 400);
        next(err);
        return;
    }

    const activity = req.body;
    activity.filename = req.file.filename;
    activity.owner = req.user.user_id;
    const id = await insertActivity(activity, next);
    res.json({message: `activity added with id: ${id}`});
};

const activity_update = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.error('activity_update validation', errors.array());
      const err = httpError('data not valid', 400)
      next(err);
      return;
      } 
    const updated = await updateActivity(req.body);
    res.json({message: `Activity updated: ${updated}`});
};

const activity_delete = async (req, res, next) => {
    await deleteActivity(req.params.activityId);
    let activity_id = req.params.activityId;
    if(!activity_id){
        const err = httpError('Fail to delete activity', 400);
        next(err);
        return;
    };
    res.json({message: `Activity deleted`});
};

const participation_post = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      console.error('participation_post validation', errors.array());
    const err = httpError('data not valid', 400)
    next(err);
    return;
    } 
    console.log('add participation data', req.body);
    const newParticipation = await insertParticipation(req.user.user_id, req.params.activityId, next);
    res.json({message: `${newParticipation}`});
};

module.exports = {
    activity_list_get,
    last_24_hours_activity_list_get,
    activity_get,
    activity_post,
    activity_update,
    activity_delete,
    activity_get_by_date,
    activity_get_by_location,
    activity_get_by_type,
    get_participants_by_activity,
    activity_get_by_user,
    participation_get_by_user,
    participation_post,
}; 