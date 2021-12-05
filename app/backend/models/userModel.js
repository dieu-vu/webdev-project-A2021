//User model:
const pool = require('../database/db');
const promisePool = pool.promise();


// Compare given email to emails in database, and return a match
const getUserLogin = async (params) => {
    try {
        console.log(params);
        const [rows] = await promisePool.execute(
            'SELECT * FROM p_user WHERE email = ?;',
            params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};


// Send user registration values to database
const registerUser = async (user) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO projectdb.p_user (email, name, password) VALUES (?,?,?)',
            [user.email, user.name, user.password]);
        console.log('model register user', rows);
        return rows.insertId;
    } catch (e) {
        console.error('model register user', e.message);
    }
};

// Get user data from database
const getUser = async(userId) => {
    query = 'SELECT * FROM p_user WHERE user_id = ?';
    try {
        const [results] = await promisePool.execute(query, [userId]);
        console.log('model get user by id', results);
        return results[0];
    } catch (e) {
        console.error('model get user by id ERROR', e.message);
    };
};


module.exports = {
    getUserLogin,
    registerUser,
};
