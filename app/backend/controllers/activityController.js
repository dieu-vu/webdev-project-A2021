'use strict';
const { validationResult } = require('express-validator');
const {insertActivity, getActivity, deleteActivity, getActivityByDate, getActivityByLocation, getActivityByActivityName, getAllValidActivity, updateActivity, getParticipantList, getAllUsersValidActivity, getAllUsersParticipation } = require('../models/activityModel');
const {httpError } = require('../utils/errors');

const activity_list_get = async (req, res, next) => {
    const activities = await getAllValidActivity(next);
    console.log('all activities', activities);
    if(activities.length < 1) {
        const err = httpError('No activity found', 404);
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
    // const activity = await getAllUsersValidActivity(req.user.userId, next);
    const activity = await getAllUsersValidActivity(req.params.userId, next);
    if(activity.length < 1) {
        const err = httpError('User does not have any valid activity', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const participation_get_by_user = async (req, res, next) => {
    // const activity = await getAllUsersValidActivity(req.user.userId, next);
    const activity = await getAllUsersParticipation(req.params.userId, next);
    if(activity.length < 1) {
        const err = httpError('User does not participate any activity', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const activity_get_by_date = async (req, res, next) => {
    const activity = await getActivityByDate(req.params.searchDate, next);
    if(activity.length < 1) {
        const err = httpError('No activity can be found on this date', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const activity_get_by_location = async (req, res, next) => {
    const activity = await getActivityByLocation(req.params.searchLocation, next);
    if(activity.length < 1) {
        const err = httpError('No activity can be found on this location', 404);
        next(err);
        return;
    } 
    res.json(activity);
};

const activity_get_by_type = async (req, res, next) => {
    const activity = await getActivityByActivityName(req.params.searchType, next);
    if(activity.length < 1) {
        const err = httpError('No activity can be found on this type', 404);
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

module.exports = {
    activity_list_get,
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
};