'use strict';
const url = 'http://localhost:3000/';

// Select html element of the activity list
const ul = document.querySelector('#activity_list');
ul.className = 'image-stack';


// // get user data from session storage
// const user = JSON.parse(sessionStorage.getItem('user'));

// create user picture on profile page:
const userPic = document.querySelector('#user-pic')
const createUserPic = (user) => {
    const img = document.createElement('img');
    img.src = 'http://placekitten.com/200/300'
    // img.src = url + '/thumbnails/user/' + user.filename;
    img.alt = user.name;
    img.classList.add('user-image');
};

// generate activity stack
const createActivityStack = (activities) => {
    ul.innerHTML = '';
    activities.forEach((activity) => {
        const img = document.createElement('img');
        img.src = url + '/thumbnails/activity/' + activity.filename;
        img.alt = activity.name;
        img.classList.add('activity-image');

        img.addEventListener('click', () => {
            location.href = 'activity.html?id=?' + activity.activity_id;
        });

        const figure = document.createElement('figure').appendChild(img);
        
        const li = document.createElement('li');
        li.classList.add('single-image');
        li.appendChild(figure);

        ul.appendChild(li);
    });
};

// get profile data:
const getProfile = async () => {
    try {
        // TODO: implement with passport/session
        // const fetchOptions = {
        //     headers: {
        //         Authorization: 'Bearer' + sessionStorage.getItem('token'),
        //     },
        // };
        const response = await fetch(url+ '/user', fetchOpstions);
        const user = await response.json();

        createUserPic(user);

        //TODO: Get list of all relevant activities of user in json response
        //createActivityStack(user.activities);

    } catch (e) {
        console.log(e.message);
    }
};

getProfile();
