// file for login functionality
'use strict';
const url = 'http://localhost:3000'; // url for backend connection
const registerForm = document.querySelector('#register-form');

// submit register form
registerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(registerForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
        },
        body: data,
    };

    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();
    alert(json.message);
    console.log('register response', json);
    if (!response.ok) {
        window.location.href('register.html');
    } else {
        window.location.href = ('login.html');
    }
});
