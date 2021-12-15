// For checking if user is logged in or not
(async () => {
    'use strict';
    const url = 'https://localhost:8000'; // url for backend connection

    // check sessionStorage and if token || user does not exist - reload login.html
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        location.href = 'login.html';
        return;
    }
    // check if token valid
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user/token', fetchOptions);
        if (!response.ok) {
            location.href = 'logout.html';
        } else {
            const json = await response.json();
            sessionStorage.setItem('user', JSON.stringify(json.user));
        }
    } catch (e) {
        console.log(e.message);
    }
})();
