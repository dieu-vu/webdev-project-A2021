'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');

const promisePool = pool.promise();
//Get some specific info including participants number of each activity from all valid activities
const getAllValidActivity = async (next) => {
    try {
        const [rows] = await promisePool.query('SELECT T1.owner, T1.owner_id, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, cast(T1.VET AS datetime) as VET, T2.participantNum FROM (SELECT p_user.name as owner,activity.owner as owner_id, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET');
        return rows;
    } catch (event) {
        console.error('Get all activity error', event.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//Get some specific info including participants number of each activity from all valid activities posted within last 24 hours
const getAllValidActivityInLast24Hours = async (next) => {
    try {
        const [rows] = await promisePool.query('SELECT T1.owner,T1.owner_id, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner,activity.owner as owner_id, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET AND date_sub(CURRENT_TIMESTAMP, interval 1 day) <= T1.VST');
        return rows;
    } catch (event) {
        console.error('Get all activity error', event.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//Get some specific info including participants number of each activity from all valid activities posted by specific user
const getAllUsersValidActivity = async (userId, next) => {
    try {
        const [rows] = await promisePool.query('SELECT T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.owner AS owner_id, activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET AND T1.owner_id = ?', [userId]);
        return rows;
    } catch (event) {
        console.error('Get all users activity error', event.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//Get some specific info including participants number of each activity from all valid activities participated by specific user
const getAllUsersParticipation = async (userId, next) => {
    try {
        const [rows] = await promisePool.query('SELECT T3.owner, T3.activity, T3.id, T3.location, T3.description, T3.filename, T3.VST, T3.VET, T3.participantNum  FROM (SELECT T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET)AS T3, participate_in WHERE T3.id = participate_in.activity AND participate_in.participant = ?', [userId]);
        return rows;
    } catch (event) {
        console.error('Get all users participation error', event.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

//Get some specific info including participants number of each activity from all valid activities by activity id

const getActivity = async (activityId, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT T1.owner, T1.owner_id, T1.name AS activity, T1.activity_id as id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.owner as owner_id, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET AND T1.activity_id = ?', [activityId]);
        return rows[0]
    } catch (e) {
        console.error('model get activity by id', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//Get some specific info including participants number of each activity from all valid activities searched by specific date
const getActivityByDate = async (searchDate, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT T3.owner, T3.activity, T3.id, T3.location, T3.description, T3.filename, T3.VST, T3.VET, T3.participantNum from (SELECT cast(T1.VET as date) as date, T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET) as T3 WHERE ? = T3.date', [searchDate]);
        console.log('Get activity by date result', rows);
        return rows;
    } catch (e) {
        console.error('model get activity by date', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//Get some specific info including participants number of each activity from all valid activities search by location(key word matching)
const getActivityByLocation = async (searchLocation, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM (SELECT T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET) AS T3 WHERE T3.location LIKE ?', ['%' + searchLocation + '%']);
        console.log('Get activity by location result', rows);
        return rows;
    } catch (e) {
        console.error('model get activity by location', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//Get some specific info including participants number of each activity from all valid activities search by type of activity(key word matching)
const getActivityByActivityName = async (searchActivityName, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM (SELECT p_user.name as owner, activity.name AS activity,activity.activity_id AS id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM activity INNER JOIN p_user ON activity.owner = p_user.user_id) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) AS participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET AND T1.activity LIKE ?', ['%' + searchActivityName + '%']);
        console.log('Get activity by activity name result', rows);
        return rows;
    } catch (e) {
        console.error('model get activity by activity name', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//Get participants list of an specific activity
const getParticipantList = async (activityId, next) => {
    try {
        const [rows] = await promisePool.query('SELECT p_user.name, participate_in.activity FROM p_user INNER JOIN participate_in ON p_user.user_id = participate_in.participant WHERE participate_in.activity = ?', [activityId]);
        return rows;
    } catch (e) {
        console.error('Get all participants in an activity error', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

//Insert an new activity
const insertActivity = async (activity, next) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO activity (name, location, description, filename, owner, VET) VALUES (?,?,?,?,?,?)',
            [activity.name, activity.location, activity.description, activity.filename, activity.owner, activity.VET]);
        console.log('model insert activity', rows);
        return rows.insertId;
    } catch (e) {
        console.error('model insert activity', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//User join a new activity
const insertParticipation = async (participantId,activityId, next) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO participate_in (participant, activity) VALUES (?,?)',
            [participantId, activityId]);
        console.log('model insert participation', rows);
        return rows
    } catch (e) {
        console.error('model insert participation', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};


//Update an activity
const updateActivity = async (activity) => {
    try {
        const [rows] = await promisePool.execute('UPDATE activity SET name = ?, location = ?, description = ? , owner = ?, VET = ? WHERE activity_id = ?',
            [activity.name, activity.location, activity.description, activity.owner, activity.VET]);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('model update activity', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//Delete an activity
const deleteActivity = async (activityId) => {
    try {
        const [rows] = await promisePool.execute('DELETE FROM activity WHERE activity_Id = ?', [activityId]);
        console.log('model delete activity', rows);
        return true;

    } catch (e) {
        console.error('model delete activity', e.message);
    }
};
//check if user joined in an specific activity or not
const checkParticipationStatus = async (userId, activityId, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT participant,activity FROM participate_in WHERE participant = ? AND activity = ?', [userId, activityId]);
        return rows;

    } catch (e) {
        console.error('get participant', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//quit an activity
const deleteParticipation = async (userId,activityId, next) => {
    try {
        const [rows] = await promisePool.execute('DELETE FROM participate_in WHERE participant = ? AND activity = ?', [userId, activityId]);
        console.log('model delete participation', rows);
        return true;

    } catch (e) {
        console.error('model delete activity', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//get all comments of specific activity
const getCommentsByActivityId = async (activityId, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT p_user.name as user, p_user.user_id, activity.name as activity,comment_in.u_comment as comment,comment_in.p_time as time FROM p_user INNER JOIN comment_in ON p_user.user_id = comment_in.participant_id INNER JOIN activity ON comment_in.activity_id = activity.activity_id WHERE comment_in.activity_id = ? GROUP BY comment_in.comment_id ORDER BY comment_in.p_time DESC', [activityId]);
        console.log('model delete participation', rows);
        return rows;

    } catch (e) {
        console.error('model get comment', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};
//post comment to a specific activity
const insertCommentsByActivityId = async (userId, activityId, comment, next) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO comment_in (participant_id, activity_id, u_comment) VALUES (?,?,?)',
            [userId, activityId, comment.comment]);
        console.log('model insert comment', rows);
        return rows.insertId;

    } catch (e) {
        console.error('model insert comment', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

module.exports = {
    getAllValidActivity,
    getAllValidActivityInLast24Hours,
    getActivity,
    insertActivity,
    insertParticipation,
    updateActivity,
    deleteActivity,
    getActivityByDate,
    getActivityByLocation,
    getActivityByActivityName,
    getParticipantList,
    getAllUsersValidActivity,
    getAllUsersParticipation,
    checkParticipationStatus,
    deleteParticipation,
    getCommentsByActivityId,
    insertCommentsByActivityId,
};