// file for login and register functionality
'use strict';
const url = 'http://localhost:3000'; // url for backend connection

// select existing html elements
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');

// submit login form
loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(loginForm); // Creates minified JSON file, without spaces or line break between values.
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();
    console.log('login response', json);
    // if not an existing user
    if (!json.user) {
        alert(json.message);
    } else {
        // save token and login
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('user', JSON.stringify(json.user));
        location.href = 'home.html';
    }
});

// submit register form
registerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(registerForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    };
    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();
    alert(json.message);
    console.log('register response', json);
    location.href('login.html');
});
