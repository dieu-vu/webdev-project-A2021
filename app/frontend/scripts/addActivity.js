// file for add activity functionality
'use strict';

// get user data from session storage
const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
const loggedInUserId = loggedInUser.user_id;

// Check if user is an admin to give access to admin page
if (loggedInUser.role === 0) {
    document.querySelector('.admin-option').style.display = "block";
}

const addForm = document.querySelector('#add_activity_form');

addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addForm);
    console.log("form data");
    console.log(fd.get('VET'));
    const fetchOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
    };
    const response = await fetch(url + '/activity', fetchOptions);
    const json = await response.json();
    alert(json.message);
    location.href = 'user.html';

});