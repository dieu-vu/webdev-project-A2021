'use strict';
const url = 'http://localhost:3000';

// Select html element of the activity list
const stack = document.querySelector('#user-activity')

// // get user data from session storage
// const user = JSON.parse(sessionStorage.getItem('user'));

// create user picture on profile page:
const userInfo = document.querySelector('#user-info')
const createUserPic = (user) => {
    const img = document.createElement('img');
    img.src = 'http://placedog.net/200/300';
    // img.src = url + '/thumbnails/user/' + user.filename;
    img.alt = user.name;
    img.classList.add('user-image');

    const figure = document.createElement('figure').appendChild(img);

    const p2 = document.createElement('p');
    p2.innerHTML = user.name;

    userInfo.appendChild(figure);
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
        const response = await fetch(url + '/user/1');
        const user = await response.json();

        createUserPic(user);
        //Get list of all relevant activities of user in json response
        createActivityStack(user.ownActivity, 'My own activities');
        createActivityStack(user.participateActivity, 'Activities I participate in');

        console.log('participate', user.participateActivity)

    } catch (e) {
        console.log(e.message);
    }
};

getProfile();
