'use strict';

const url = 'http://localhost:3000';

// get user data from session storage
const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
const loggedInUserId = loggedInUser.user_id;

// Check if user is an admin to give access to admin page
if (loggedInUser.role === 0) {
    document.querySelector('.admin-option').style.display = "block";
}

const settingInputForm = document.querySelector('.setting-input');
const menuItem = document.getElementsByClassName('setting-item');

const generalFields = {name: 'Name', email: 'Email', fieldId: 'general'};
const passwordFields = {
    currentPassword: 'Current Password', newPassword: 'New Password',
    checkPassword: 'Confirm New Password', fieldId: 'password'
};
const deleteFields = {confirm: `Type your email to confirm`, fieldId: 'delete'};


//Toggle between input forms with class name of the seleted item in menu
const generateInputForm = () => {
    Object.values(menuItem).forEach((selectedItem) => {
        createFormByFieldList(generalFields, true, false);
        handleGeneralForm();
        selectedItem.addEventListener('click', async () => {
            settingInputForm.innerHTML = '';
            if (selectedItem.classList.contains("general")) {
                createFormByFieldList(generalFields, true, false);
                console.log("Created form");
                await handleGeneralForm();
            } else if (selectedItem.classList.contains("password")) {
                createFormByFieldList(passwordFields, false, false);
                await handlePasswordForm();
            } else if (selectedItem.classList.contains("delete")) {
                createFormByFieldList(deleteFields, false, true);
                await handleDeleteForm();
            }
        });
    });
}


// Create form when menu item is selected:
const createFormByFieldList = (fieldList, haveUpload, ifDelete) => {
    console.log("Creating form")
    settingInputForm.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Change Account settings';

    const form = document.createElement('form');
    form.classList.add('setting_input_form'); // CSS CLASS OF THE FORM
    form.id = fieldList['fieldId'];

    if (ifDelete) {
        const header = document.createElement('h3');
        header.id = 'delete-header';
        header.innerHTML = 'Account deletion'
        const warning = document.createElement('p');
        warning.class = 'delete';
        warning.innerHTML = 'All your profile and activity data will be permanently deleted.'

        form.appendChild(header);
        form.appendChild(warning);
    }

    //Creating input field for each item in field list:
    Object.keys(fieldList).forEach((key) => {
        if (key !== 'fieldId') {
            const label = document.createElement('label');
            label.innerHTML = fieldList[key];

            const input = document.createElement('input');
            input.classList.add('description_input'); // CSS CLASS OF THE INPUT
            input.type = 'text';
            input.name = key;

            //Require input for password change:
            if (key.toLowerCase().includes('password')) {
                input.required = true;
                input.type = 'password';
            }
            form.appendChild(label);
            form.appendChild(input);
        }
    });

    // add field if having file upload
    if (haveUpload) {
        const label = document.createElement('label');
        label.innerHTML = 'Upload an image';

        const upload = document.createElement('input');
        upload.classList.add('description_input');
        upload.type = 'file';
        upload.placeholder = 'Choose file';
        upload.accept = 'image/*';
        upload.name = 'user_filename';
        upload.id = 'file-id';

        form.appendChild(label);
        form.appendChild(upload);
    }

    const button = document.createElement('button');
    button.type = 'submit';
    button.innerHTML = 'Save changes';
    button.classList.add('admin_button'); // CSS ID OF THE BUTTON

    form.appendChild(button);

    settingInputForm.appendChild(h2);
    settingInputForm.appendChild(form);
};


// handle general edit form events:
const handleGeneralForm = async () => {
    let submittedForm = document.querySelector('#general');
    submittedForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const data = new FormData(submittedForm);

        //Check if form data is having all blank fields:
        let isEmpty = true;
        for (var pair of data.entries()) {
            console.log(pair[1]);
            if (pair[1] !== "" && pair[1].name !== "") {
                isEmpty = false;
            }
        }
        //Fill the existing data to form if the user leaves fields blank
        if (data.get('email') === "") {
            data.set('email', loggedInUser.email);
        }
        if (data.get('name') === "") {
            data.set('name', loggedInUser.name);
        }
        if (document.getElementById('file-id').files.length !== 0) {
            data.filename = document.getElementById('file-id').files[0].name;
        }
        const options = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: data,
        };

        const response = await fetch(url + `/user/${loggedInUserId}`, options);
        const json = await response.json();
        console.log(json);
        if (isEmpty) {
            alert("You submitted a blank form");
        } else if (!response.ok) {
            alert("Error " + response.statusText + " occurred when updating profile");
        } else {
            alert(json.message);
        }
        if (json.error) {alert(json.error.message)}

        location.href = 'account-settings.html';
    });
}


const handlePasswordForm = async () => {
    const passwordForm = document.querySelector('#password');
    passwordForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const data = serializeJson(passwordForm);

        //Check if new password confirmation matching:
        const matchingPassword = data["newPassword"] !== data["checkPassword"];
        if (matchingPassword) {
            alert('New passwords must match');
        } else {
            const options = {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            };
            const response = await fetch(url + `/user/${loggedInUserId}/passwordChange`, options);
            const json = await response.json();

            if (!response.ok) {
                alert("Error " + response.status + " occurred when updating password");
            } else {
                alert(json.message);
            }
            if (json.error) {
                alert(json.error.message)
            }

            location.href = 'account-settings.html';
        }
    });
};

const handleDeleteForm = () => {
    const deleteForm = document.querySelector('#delete');
    deleteForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const data = serializeJson(deleteForm);
        console.log(data);

        if (data["confirm"] === "") {
            alert("Please confirm");
        } else if (data["confirm"] === loggedInUser.email) {
            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            };
            const response = await fetch(url + `/user/${loggedInUserId}`, options);
            const json = await response.json();

            if (!response.ok) {
                alert("Error " + response.status + " occurred when updating password");
            } else {
                alert(json.message);
            }
            if (json.error) {
                alert(json.error.message)
            }
            console.log('deletion confirmed');
            location.href = 'login.html';

        } else {
            alert("Please type your email to confirm");
        }
    });
};

generateInputForm();