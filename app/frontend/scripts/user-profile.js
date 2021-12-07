'use strict';
const url = 'http://localhost:3000';

//TODO: ADD LOGOUT BUTTON

// Select html element of the activity list
const stack = document.querySelector('#user-activity');
// Select html element of user profile picture
const userInfo = document.querySelector('#user-info');
// Select html element of user edit profile info form:
const userEditForm = document.querySelector('#edit-profile-form');

// // get user data from session storage
const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
const loggedInUserId = loggedInUser.user_id;

// open and close side menu for editing user info:
const openMenu = () => {
    document.querySelector('.side-edit-menu').style.width = "20%";
    document.querySelector('.side-edit-menu').style.padding = "5%";
    stack.style.width = "50%";
    stack.style.float = "left";
    stack.style.marginLeft ='20%';
};
const closeMenu = () => {
    document.querySelector('.side-edit-menu').style.width = "0";
    document.querySelector('.side-edit-menu').style.padding = "0";
    stack.style.width = "80%";
    stack.style.float = "right";
}

// close side edit menu
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    closeMenu()});

// create user picture on profile page:
const createUserPic = (user) => {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('container-image');

    const img = document.createElement('img');
    img.src = url + '/thumbnails/user/' + user.filename;
    img.alt = user.name;
    img.classList.add('user-image');

    // user edit profile button:
    const editButton = document.createElement('button');
    editButton.classList.add('edit-profile-button');
    editButton.addEventListener('click', () => {
        openMenu()});
    const p2 = document.createElement('p');
    p2.innerHTML = user.name;

    imgContainer.appendChild(img);
    imgContainer.appendChild(editButton);

    userInfo.appendChild(imgContainer);
    userInfo.appendChild(p2);
};

// generate activity stack
const createActivityStack = (activities, headerText) => {
    const header = document.createElement('h2');
    header.innerHTML = headerText;

    const ul = document.createElement('ul');
    ul.id = 'activity_list';
    ul.classList.add = 'image-stack';

    ul.innerHTML = '';

    if (activities.length !==0){
        activities.forEach((activity) => {
            const img = document.createElement('img');
            img.src = 'http://placedog.net/200/300';
            //img.src = url + '/thumbnails/' + activity.filename;
            img.alt = activity.name;
            img.classList.add('activity-image');
            img.classList.add('trans');


            img.addEventListener('click', () => {
                location.href = 'activity.html?id=?' + activity.activity_id;
            });

            const figure = document.createElement('figure').appendChild(img);
            
            const h2 = document.createElement('h2');
            h2.innerHTML = activity.name;

            const p1 = document.createElement('p');
            p1.innerHTML = `Location: ${activity.location}`;

            const p2 = document.createElement('p');
            p2.innerHTML = activity.description;

            const li = document.createElement('li');
            li.classList.add('single-image');

            li.appendChild(h2);
            li.appendChild(figure);
            li.appendChild(p1);
            li.appendChild(p2);
            
            ul.appendChild(li);

            stack.appendChild(header);
            stack.appendChild(ul);

        });
    } else {
        const noActivityMessage = document.createElement('p');
        noActivityMessage.innerHTML = "No activities at the moment...";
        stack.appendChild(header);
        stack.appendChild(noActivityMessage);
        stack.style.color = '#FFFFFF80';
    }
};

// get profile data:
const getProfile = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
       
        console.log('LOGGED IN USER', loggedInUserId);
        const response = await fetch(url + `/user/${loggedInUserId}`, fetchOptions);
        const user = await response.json();
        console.log('USER', user);

        createUserPic(user);
        //Get list of all relevant activities of user in json response
        createActivityStack(user.ownActivity, 'My own activities');
        createActivityStack(user.participateActivity, 'Activities I participate in');

        console.log('participate', user.participateActivity);
    } catch (e) {
        console.log(e);
    }
};

getProfile();

// Submit user profile edit form:
userEditForm.addEventListener('submit', async (editEvent) => {
    editEvent.preventDefault();
    const data = serializeJson(userEditForm);

    // remove empty properties
    for (const [prop, value] of Object.entries(data)) {
        if (value === '') {
          delete data[prop];
        }
    }
    const fetchOptions = {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(data),
    };

    //TODO: Check if backend will handle user_id with login passport for put method
    const response = await fetch(url + '/user', fetchOptions);
    const json = await response.json();
    if (json.error) {alert(json.error.message)};
    location.href = 'user.html';
});
