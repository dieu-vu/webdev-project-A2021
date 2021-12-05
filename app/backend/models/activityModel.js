'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getAllValidActivity = async (next) => {
    try {
        const [rows] = await promisePool.query('SELECT T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET');
        return rows;
    }catch(event) {
        console.error('Get all activity error', event.message );
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const getAllUsersValidActivity = async (userId, next) => {
    try {
        const [rows] = await promisePool.query('SELECT T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.owner AS owner_id, activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET AND T1.owner_id = ?',[userId]);
        return rows;
    }catch(event) {
        console.error('Get all users activity error', event.message );
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const getAllUsersParticipation = async (userId, next) => {
    try {
        const [rows] = await promisePool.query('SELECT T3.owner, T3.activity, T3.id, T3.location, T3.description, T3.filename, T3.VST, T3.VET, T3.participantNum  FROM (SELECT T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET)AS T3, participate_in WHERE T3.id = participate_in.activity AND participate_in.participant = ?',[userId]);
        return rows;
    }catch(event) {
        console.error('Get all users participation error', event.message );
        const err = httpError('Sql error', 500);
        next(err);
    }
};



const getActivity = async (activityId, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT T1.owner, T1.name AS activity, T1.activity_id as id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET AND T1.activity_id = ?', [activityId]);
        // const [rows1] = await promisePool.query('SELECT p_user.name, participate_in.activity FROM p_user INNER JOIN participate_in ON p_user.user_id = participate_in.participant WHERE participate_in.activity = ?',[activityId]);
        // console.log('Get activity by id result', rows);
        // return [rows[0],rows1];
        return rows[0]
    }catch(e) {
        console.error('model get activity by id', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const getActivityByDate = async (searchDate, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT T3.owner, T3.activity, T3.id, T3.location, T3.description, T3.filename, T3.VST, T3.VET, T3.participantNum from (SELECT cast(T1.VET as date) as date, T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET) as T3 WHERE ? = T3.date', [searchDate]);
        console.log('Get activity by date result', rows);
        return rows;
    }catch(e) {
        console.error('model get activity by date', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const getActivityByLocation = async (searchLocation, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM (SELECT T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET) AS T3 WHERE T3.location LIKE ?', ['%' + searchLocation + '%']);
        console.log('Get activity by location result', rows);
        return rows;
    }catch(e) {
        console.error('model get activity by location', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const getActivityByActivityName = async (searchActivityName, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM (SELECT T1.owner, T1.name AS activity, T1.activity_id AS id, T1.location, T1.description, T1.filename,T1.VST, T1.VET, T2.participantNum FROM (SELECT p_user.name as owner, activity.name,activity.activity_id,activity.location,activity.description,activity.filename,activity.VST,activity.VET FROM p_user, activity WHERE p_user.user_id = activity.owner) AS T1 INNER JOIN (SELECT activity.activity_id, COUNT(participate_in.participant) as participantNum FROM activity LEFT JOIN participate_in ON activity.activity_id = participate_in.activity GROUP BY activity.activity_id) AS T2 ON T1.activity_id = T2.activity_id WHERE CURRENT_TIMESTAMP <= T1.VET) AS T3 WHERE T3.description LIKE ?', ['%' + searchActivityName + '%']);
        console.log('Get activity by activity name result', rows);
        return rows;
    }catch(e) {
        console.error('model get activity by activity name', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const getParticipantList = async (activityId, next) => {
    try {
        const [rows] = await promisePool.query('SELECT p_user.name, participate_in.activity FROM p_user INNER JOIN participate_in ON p_user.user_id = participate_in.participant WHERE participate_in.activity = ?',[activityId]);
        return rows;
    }catch(e) {
        console.error('Get all participants in an activity error', e.message );
        const err = httpError('Sql error', 500);
        next(err);
    }
};


const insertActivity = async (activity, next) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO activity (name, location, description, filename, owner, VET) VALUES (?,?,?,?,?,?)',
        [activity.name, activity.location, activity.description , activity.filename, activity.owner, activity.VET]);
        console.log('model insert activity', rows);
        return rows.insertId;
    }catch(e) {
        console.error('model insert activity', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const insertParticipation = async (participantId,activityId, next) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO participate_in (participant, activity) VALUES (?,?)',
        [participantId, activityId]);
        console.log('model insert participation', rows);
        return rows
    }catch(e) {
        console.error('model insert participation', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const updateActivity = async (activity) => {
    try {
        const [rows] = await promisePool.execute('UPDATE activity SET name = ?, location = ?, description = ? , owner = ?, VET = ? WHERE activity_id = ?',
        [activity.name, activity.location, activity.description ,activity.owner, activity.VET]);
        return rows.affectedRows === 1;
    }catch(e) {
        console.error('model update activity', e.message);
        const err = httpError('Sql error', 500);
        next(err);
    }
};

const deleteActivity = async (activityId) => {
    try {
        const [rows] = await promisePool.execute('DELETE FROM activity WHERE activity_Id = ?',[activityId]);
        console.log('model delete activity', rows);
    return true;

    }catch(e) {
        console.error('model delete activity', e.message);
    }
};

module.exports = {
    getAllValidActivity,
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
};