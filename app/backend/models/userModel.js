//User model:
const pool = require('../database/db');
const promisePool = pool.promise();


//Check existing email in database
const validateEmail = async (user) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM `p_user` WHERE email LIKE ?', [user.email]);
        console.log('EMAIL VALIDATING', rows);
        if (rows.length === 0){
            console.log('email OK!');
            return true;
        } else {
            console.log('email existed!');
            return false;
        }
    } catch (e){
        console.error('EMAIL VALIDATING ERROR', e.message);
    }
};

// Send user registration values to database
const registerUser = async (user) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO p_user (email, name, password, user_filename) VALUES (?,?,?,?)',
            [user.email, user.name, user.password, user.user_filename]);
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
    }
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

//TODO: allow user to upload file
//TODO: auto fill with old information if json field is blank
const editUser = async(user) => {
    const query = `UPDATE p_user SET name=?, email=?, user_filename=? WHERE user_id=?`;
    try {
        const [results] = await promisePool.execute(query,
            [user.name, user.email, user.user_filename, user.user_id]);
        console.log('EDIT_USER', results);
        return results.affectedRows === 1;
    } catch (e) {
        console.error('userModel edit ERROR', e.message);
    }
};

const getOwnActivity = async (user) => {
    const query = `SELECT * FROM activity 
        WHERE owner = ? AND (ISNULL(VET) OR VET > CURRENT_DATE())`;
    try {
        const [results] = await promisePool.query(query, [user.user_id]);
        return results;
    } catch (e) {
        console.error('UserModel getOwnActivity ERROR', e.message);
    }
};

const getParticipatingActivity = async (user) => {
    try {
        const query = `SELECT p.*, a.* FROM participate_in AS p 
            LEFT JOIN activity AS a 
            ON p.activity = a.activity_id 
            WHERE p.participant = ? AND (ISNULL(VET) OR VET > CURRENT_DATE())`;
        const results = await promisePool.query(query, [user.user_id]);
        return results[0];
    } catch (e) {
        console.error('UserModel getParticipatingActivity ERROR', e.message);
    }
};


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



// Implement this for admin user only
const deleteUser = async (currentUser, deletedUserId) => {
    try {
    //Query user's role:
        const [users] = await promisePool.query(`SELECT role FROM p_user WHERE user_id = ?`, [currentUser.user_id]);
        const user_role = users[0].role;	
        console.log('USER_ROLE', user_role);
    } catch (e) {
        console.error('CHECK USER ROLE ERROR', e.message)
    }
    //If user is admin, can delete user:	
    try {
        const [row] = await promisePool.query(`DELETE FROM p_user WHERE user_id = ?`, [deletedUserId]);
        console.log('model delete user', row);
		return row.affectedRows === 1;
    } catch (e) {
        console.error('model delete user ERROR', e.message)
    }
};


module.exports = {
    validateEmail,
    registerUser,
    getUser,
    getAllUsers, 
    editUser,
    getOwnActivity,
    getParticipatingActivity,
    getUserLogin,
    deleteUser,
};
