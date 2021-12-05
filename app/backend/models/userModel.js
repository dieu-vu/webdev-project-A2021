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
    const query = `SELECT * FROM p_user WHERE user_id = ?`;
    try {
        const [results] = await promisePool.execute(query, [userId]);
        console.log('model get user by id', results);
        return results[0];
    } catch (e) {
        console.error('model get user by id ERROR', e.message);
    };
};

const getAllUsers = async() => {
    try {
        const query = `SELECT * FROM p_user`;
        const [results] = await promisePool.query(query);
        console.log(results);
        return results;
    }
    catch (e) {
        console.error('getAllUser Error', e.message);
    }
};

const editUser = async(user) => {
    try {
    //Query user's role:
        const [users] = await promisePool.query(`SELECT role FROM P_user WHERE user_id = ?`, [cat.user_id]);
        const user_role = users[0].role;	
        console.log('USER_ROLE', user_role);
    } catch (e) {
        console.error('CHECK USER ROLE ERROR', e.message)
    }
    //If user is admin, can edit without checking owner matching with user_id:	
    query_normal = `UPDATE p_user SET name=?, email=?, password=? WHERE user_id=?`;
    query_admin = `UPDATE p_user SET name=?, email=?, password=? WHERE user_id=?`;
    try {
        if (user_role != 0){
            const [results] = await promisePool.execute(query_normal,
                [user.name, user.email, user.password, user.user_id]);
        } else {
            const [results] = await promisePool.execute(query_admin,
                [user.name, user.email, user.password, user.user_id]);
        }
        console.log('EDIT_USER', results);
        return results.affectedRows == 1;
    } catch (e) {
        console.error('USERMODEL EDIT ERROR', e.message);
    }
};


module.exports = {
    getUserLogin,
    registerUser,
    getUser,
    getAllUsers
};
