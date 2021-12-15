//User model:
const pool = require('../database/db');
const promisePool = pool.promise();


//Check existing email in database
const emailValidateQuery = 'SELECT * FROM `p_user` WHERE email LIKE ?';
const validateEmailRegister = async (user) => {
    try {
        const [rows] = await promisePool.query(emailValidateQuery, [user.email]);
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

const validateEmailUpdate = async (user) => {
    try {
        const [rows] = await promisePool.query(emailValidateQuery + ' AND user_id != ?', 
            [user.email, user.user_id]);
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

// Get list of own activities and participating activities for the user json sent to user page frontend:

const ownerAndParticipantNumQuery = `SELECT DISTINCT activity AS activity_id, 
COUNT(DISTINCT participant) AS num_participant 
FROM participate_in GROUP BY activity_id`;

const getOwnActivity = async (user) => {
    const query = `SELECT a.*, u.name as owner_name, p.num_participant AS num_participant
    FROM activity AS a
    LEFT JOIN p_user AS u
    ON a.owner = u.user_id
    LEFT JOIN (${ownerAndParticipantNumQuery}) AS p
    ON a.activity_id = p.activity_id
    WHERE a.owner = ?
    AND (ISNULL(a.VET) OR a.VET > CURRENT_DATE());`;
    try {
        const [results] = await promisePool.query(query, [user.user_id]);
        return results;
    } catch (e) {
        console.error('UserModel getOwnActivity ERROR', e.message);
    }
};

const getParticipatingActivity = async (user) => {
    try {
        const query = `SELECT p.*, a.*, u.name AS owner_name, 
        p_summary.num_participant AS num_participant
        FROM participate_in AS p 
        LEFT JOIN activity AS a 
        ON p.activity = a.activity_id
        LEFT JOIN p_user as u
        ON u.user_id = a.owner
        LEFT JOIN (${ownerAndParticipantNumQuery}) AS p_summary
        ON a.activity_id = p_summary.activity_id
        WHERE p.participant = ? AND (ISNULL(a.VET) OR a.VET > CURRENT_DATE())`;
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

// Update user password:
const updatePassword = async (user) => {
    try {
        const query = `UPDATE p_user SET password= ? WHERE user_id = ?`;
        const [rows] = await promisePool.execute(query, [user.newPassword, user.user_id]);
        console.log('model change pw', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.log('USER MODEL UPDATE PW ERROR', e.message);
    }
};

// Update user role to/from mode:
const changeUserModRole = async (userId, newRole) => {
    try {
        const query = `UPDATE p_user SET role = ? WHERE user_id = ?`;
        const [rows] = await promisePool.execute(query, [newRole, userId]);
        console.log('User model change mod role', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.log('USER MODEL CHANGE MOD ROLE ERROR', e.message);
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
    validateEmailRegister,
    validateEmailUpdate,
    registerUser,
    getUser,
    getAllUsers, 
    editUser,
    getOwnActivity,
    getParticipatingActivity,
    getUserLogin,
    updatePassword,
    changeUserModRole,
    deleteUser,
};
