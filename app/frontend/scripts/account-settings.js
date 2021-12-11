'use strict';

const url = 'http://localhost:3000';

// get user data from session storage
const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
const loggedInUserId = loggedInUser.user_id;

const settingInputForm = document.querySelector('.setting-input');
const menuItem = document.getElementsByClassName('setting-item');

console.log('menuItem', menuItem);

const generalFields = { name: 'Name', email: 'Email'};
const passwordFields = { currentPassword: 'Current Password', newPassword: 'New Password', checkPassword: 'Confirm New Password'};
const deleteFields = { confirm: `Type 'delete' to confirm`};


//Toggle between input forms with class name of the seleted item in menu
const generateInputForm = () => {
    Object.values(menuItem).forEach((selectedItem) => {
        selectedItem.addEventListener('click', () => {
            if (selectedItem.classList.contains("general")) {
                settingInputForm.innerHTML = '';
                createFormByFieldList(generalFields, true);
            }
            else if (selectedItem.classList.contains("password")) {
                settingInputForm.innerHTML = '';
                createFormByFieldList(passwordFields, false);
            }
            else if (selectedItem.classList.contains("delete")) {
                settingInputForm.innerHTML = '';
                createFormByFieldList(deleteFields, false);
            }

        });
    });
    
    
}

const createFormByFieldList = (fieldList, haveUpload) => {
    const form = document.createElement('form');
    form.id = 'add_activity_form';

    //Creating input field for each item in field list:
    Object.keys(fieldList).forEach((key) => {
        const label = document.createElement('label');
        label.innerHTML = fieldList[key];

        const input = document.createElement('input');
        input.classList.add('activity_input');
        input.type = 'text';
        input.name = key;

        form.appendChild(label);
        form.appendChild(input);
    });

    // add field if having file upload
    if (haveUpload){
        const label = document.createElement('label');
        label.innerHTML = 'Upload an image';

        const upload = document.createElement('input');
        upload.classList.add('activity_input');
        upload.type = 'file';
        upload.placeholder = 'Choose file';
        upload.accept = 'image/*';
        upload.name = 'user_filename';

        form.appendChild(label);
        form.appendChild(upload);
    }; 

    const button = document.createElement('button');
    button.type = 'submit';
    button.classList.add('activity_input');
    button.innerHTML = 'Save changes';
    button.id = 'save-profile-btn';

    form.appendChild(button);

    settingInputForm.appendChild(form);
};     


generateInputForm();
