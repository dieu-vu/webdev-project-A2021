'use strict';
// url for backend connection - change when uploading to server
const url = 'http://localhost:3000';

// After tokens removed - redirection to login.html
(async () => {
    try {
        const response = await fetch(url + '/auth/logout');
        const json = await response.json();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        alert('You have logged out');
        location.href = 'login.html';
    } catch (e) {
        console.log(e.message);
    }
})();
