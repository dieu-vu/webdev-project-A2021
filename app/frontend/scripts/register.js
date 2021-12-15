// file for login functionality
'use strict';
const url = 'https://localhost:8000'; // url for backend connection
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
        alert("Error " + response.statusText + " occurred when updating profile");
        window.location.href = ('register.html');
    } else if (!json.emailValid) {
        window.location.href = ('register.html');
    } else {
        window.location.href = ('login.html');
    }
});
