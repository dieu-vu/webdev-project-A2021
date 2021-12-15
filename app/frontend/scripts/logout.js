'use strict';
const url = 'https://localhost:8000'; // url for backend connection

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
