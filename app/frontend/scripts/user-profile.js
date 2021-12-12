'use strict';

const url = 'http://localhost:3000';


// Select html element of the activity list
const stack = document.querySelector('#user_activity');
// Select html element of user profile picture
const userInfo = document.querySelector('#user_info');
// Select html element of user edit profile info form:
const userEditForm = document.querySelector('#edit-profile-form');

// get user data from session storage
const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
const loggedInUserId = loggedInUser.user_id;

// Check if user is an admin to give access to admin page
if (loggedInUser.role === 0) {
    document.querySelector('.admin-option').style.display = "block";
}

// open and close side menu for editing user info:
const openMenu = () => {
    document.querySelector('.side-edit-menu').style.width = "20%";
    document.querySelector('.side-edit-menu').style.padding = "5%";
    stack.style.width = "60%";
    stack.style.float = "left";
    stack.style.marginLeft ='0%';
    stack.style.transition = 'all 0.3s ease-in-out';
};
const closeMenu = () => {
    document.querySelector('.side-edit-menu').style.width = "0";
    document.querySelector('.side-edit-menu').style.padding = "0";
    stack.style.width = "100%";
    stack.style.float = "right";
    stack.style.transition = 'all 0.3s ease-in-out';
}

// close side edit menu
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    closeMenu()});

// create user picture on profile page:
const createUserPic = (user, el) => {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('container-image');

    const img = document.createElement('img');
    if (user.user_filename === null) {
        img.src = 'https://picsum.photos/200';
    } else {
        img.src = url + '/' + user.user_filename;
    }
    img.alt = user.name;
    img.classList.add('user_image');

    // user edit profile button:
    const editButton = document.createElement('button');
    editButton.classList.add('edit-profile-button');
    editButton.addEventListener('click', () => {
        openMenu()});
    const p2 = document.createElement('p');
    p2.innerHTML = user.name;
    p2.classList.add('user_name');

    imgContainer.appendChild(img);
    imgContainer.appendChild(editButton);

    el.appendChild(imgContainer);
    el.appendChild(p2);
};

// generate activity stack
const createActivityStack = (activities, headerText, divName) => {
    const listContainer = document.createElement('div');
    listContainer.classList.add(divName);
    
    const header = document.createElement('h2');
    header.innerHTML = headerText;
    header.classList.add('profile_headers');

    const ul = document.createElement('ul');
    ul.id = 'activity_list';
    ul.classList.add = 'image-stack';

    ul.innerHTML = '';

    if (activities.length !==0){
        activities.forEach((activity) => {
            const img = document.createElement('img');
            //Add a place holder picture if picture is not saved on server
            if (activity.filename === null) {
            img.src = 'https://picsum.photos/300/200';
            } else {
                img.src = url + '/' + activity.filename;
            }
            img.alt = activity.name;
            img.classList.add('activity_image');

            // img.addEventListener('click', () => {
            //     location.href = 'activity.html?id=?' + activity.activity_id;
            // });

            const figure = document.createElement('figure');
            figure.classList.add('activity_container');

            const h2 = document.createElement('h2');
            h2.innerHTML = activity.name;
            h2.classList.add('activity_name');

            const p1 = document.createElement('p');
            p1.innerHTML = `${activity.location}`;
            p1.classList.add('activity_location');

            const p2 = document.createElement('p');
            p2.innerHTML = activity.description;
            p2.classList.add('activity_description');

            const gradient = document.createElement('figcaption');
            gradient.classList.add('gradient_background');

            const a = document.createElement('a');
            a.classList.add('activity_link');

            ul.appendChild(a);
            a.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(gradient);
            figure.appendChild(p1);

            listContainer.appendChild(header);
            listContainer.appendChild(ul);
            stack.appendChild(listContainer);
            
            stack.style.color = '#fcfcfc';

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

        createUserPic(user, userInfo);
        //Get list of all relevant activities of user in json response
        createActivityStack(user.ownActivity, 'My own activities', 'own_activities');
        createActivityStack(user.participateActivity, 'Activities I participate in', 'joined_activities');

        console.log('participate', user.participateActivity);
    } catch (e) {
        console.log(e);
    }
};

getProfile();

// Submit user profile edit form:
userEditForm.addEventListener('submit', async (editEvent) => {

    editEvent.preventDefault();
    const data = new FormData(userEditForm);

    //Check if form data is having all blank fields:
    let isEmpty = true;

    for (var pair of data.entries()) {
        if (pair[1] !== "" && pair[1].name !== "") {
            isEmpty = false;
        }
     }
    console.log('BLANK FORM', isEmpty);

    //Fill the existing data to form if the user leaves fields blank
    if (data.get('email')=== "") {
        data.set('email', loggedInUser.email);
    }
    if (data.get('name')=== ""){
        data.set('name', loggedInUser.name);
    }
    if (document.getElementById('file-id').files.length !==0){
        data.filename = document.getElementById('file-id').files[0].name;
    } 
    
    console.log('USER PUT REQ', data);

    const options = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: data,
    };

    const response = await fetch(url + `/user/${loggedInUserId}`, options);
    const json = await response.json();
    
   
    if (isEmpty) {
        alert("You submitted a blank form");
    } else if (!response.ok) {
        alert("Error " + response.status + " occurred when updating profile");
    } else {
        alert(json.message);
    }
    
    console.log('USER PUT', response);

    if (json.error) {alert(json.error.message)};

    location.href = 'user.html';
});

