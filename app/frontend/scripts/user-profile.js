'use strict';

const url = 'http://localhost:3000';


// Select html element of the activity list
const stack = document.querySelector('.user_activity');
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
    img.src = url + '/' + user.user_filename;
    img.onerror = () => {img.src='https://picsum.photos/200'};
    img.alt = user.name;
    img.classList.add('user_image');
    img.addEventListener('click', () => {
        openMenu();
    });

    const p2 = document.createElement('p');
    p2.innerHTML = user.name;
    p2.classList.add('user_name');
    // user edit profile button:
    const span = document.createElement('span');
    span.classList.add('pencil_icon');
    const editButton = document.createElement('button');
    editButton.classList.add('edit-profile-button');
    editButton.addEventListener('click', () => {
        openMenu()});
    
    span.appendChild(editButton);
    p2.appendChild(span);

    imgContainer.appendChild(img);

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
    ul.id = 'activity_list_user';
    ul.classList.add = 'image-stack';

    ul.innerHTML = '';

    if (activities.length !==0){
        activities.forEach((activity) => {


            const randomText = document.createElement('p');
            randomText.innerHTML = ('Randomly generated image');
            randomText.classList.add('random_text');

            const img = document.createElement('img');
            //Add a place holder picture if picture is not saved on server
            img.src = url + '/' + activity.filename;
            img.onerror = () => {
                img.src = 'https://picsum.photos/600/400'
                figure.appendChild(randomText);
            }
            img.alt = activity.name;
            img.classList.add('activity_image');

            const figure = document.createElement('figure');
            figure.classList.add('activity_container_user');

            const h2 = document.createElement('h2');
            h2.innerHTML = activity.name;
            h2.classList.add('activity_name');

            const p1 = document.createElement('p');
            p1.innerHTML = `${activity.location}`;
            p1.classList.add('activity_location');

            const gradient = document.createElement('figcaption');
            gradient.classList.add('gradient_background');

            const a = document.createElement('a');
            a.classList.add('activity_link_user');

            // FOR MODAL FUNCTIONALITY
            const hint = document.createElement('p');
            //Text for hint is depending on the participation status below
            hint.classList.add('modal_hint');
            // FOR MODAL FUNCTIONALITY

            ul.appendChild(a);
            a.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(gradient);
            figure.appendChild(h2);
            figure.appendChild(p1);
            figure.appendChild(hint);

            listContainer.appendChild(header);
            listContainer.appendChild(ul);

            stack.appendChild(listContainer);

            // // FOR MODAL FUNCTIONALITY
            const layer = document.createElement('div');
            layer.classList.add('layer');
            // // FOR MODAL FUNCTIONALITY
            
            stack.style.color = '#fcfcfc';


            //if user not participate this activity display participate button otherwise display quit button
            const getParticipationStatus = async () => {
                try {
                    const fetchOptions = {
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        },
                    };
                    const response = await fetch(url + '/activity/participationStatus/' + activity.activity_id, fetchOptions);
                    const participationStatus = await response.json();
                    if (participationStatus.message === "not yet participate") {
                        console.log(`no participated ${activity.activity_id}`);
                        //hint text 
                        hint.innerHTML = "Click to join";
                        // participate button
                        const participateButton = document.createElement('button');
                        participateButton.innerHTML = 'Join';
                        participateButton.classList.add('button_participate');
                        layer.appendChild(participateButton);
                        participateButton.addEventListener('click', async () => {
                            const fetchOptions = {
                                method: 'POST',
                                headers: {
                                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                                },
                            };
                            try {
                                const response = await fetch(url + '/activity/participation/' + activity.activity_id, fetchOptions);
                                const json = await response.json();
                                console.log('post response', json);
                                alert("Welcome to join this activity.");
                                location.href = 'user.html';
                            } catch (e) {
                                console.log(e.message);
                            }
                        });
                    } else {
                        //hint text
                        hint.innerHTML = "Click to opt out";

                        //quit button
                        const quitButton = document.createElement('button');
                        quitButton.innerHTML = 'Opt out';
                        quitButton.classList.add('button_participate');
                        layer.appendChild(quitButton);
                        quitButton.addEventListener('click', async () => {
                            const fetchOptions = {
                                method: 'DELETE',
                                headers: {
                                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                                },
                            };
                            try {
                                const response = await fetch(url + '/activity/participation/' + activity.id, fetchOptions);
                                const json = await response.json();
                                console.log('delete response', json);
                                alert("You have left this activity.")
                                location.href = 'user.html';
                            } catch (e) {
                                console.log(e.message);
                            }
                        });
                    }
                } catch (e) {
                    console.log(e.message);
                }
            };
            if (divName != 'own_activities') {getParticipationStatus()};

            //delete button is visible for admin or moderator role and the owner of the activity
            if (loggedInUser.role == 0 || loggedInUser.role === 2 || loggedInUser.user_id === activity.owner) {
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'Delete';
                deleteButton.classList.add('button_delete');
                figure.appendChild(deleteButton);
                deleteButton.addEventListener('click', async () => {
                    const fetchOptions = {
                        method: 'DELETE',
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        },
                    };
                    if (confirm("You are deleting an activity, continue?")) {
                        try {
                            const response = await fetch(url + '/activity/' + activity.activity_id, fetchOptions);
                            const json = await response.json();
                            console.log('delete response', json);
                            location.href = 'user.html';
                        } catch (e) {
                            console.log(e.message);
                        }
                    } else {
                        alert("You cancelled the action");
                    }
                });
            }


            // FOR MODAL FUNCTIONALITY
            // Triggering the modal to open
            const image = document.createElement('img');
            image.alt = activity.activity;
            image.classList.add('modal_image');

            // Creating modal
            const modal = document.createElement('div');
            modal.classList.add('modal')
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal_content');

            // Modal close button
            const close = document.createElement('span');
            close.innerHTML = "x";
            close.classList.add('modal_close');

            const activityName = document.createElement('h2');
            activityName.innerHTML = activity.name;
            activityName.classList.add('modal_name');

            const publisher = document.createElement('p');
            publisher.innerHTML = `${activity.owner_name}`;
            publisher.classList.add('modal_publisher');

            const p3 = document.createElement('p');
            p3.innerHTML = `${activity.description}`;
            p3.classList.add('modal_description');

            const p4 = document.createElement('p');
            const timeString = `${activity.VET.toString().substring(0, 10)} @ ${activity.VET.toString().substring(11, 19)}`;
            console.log(timeString);
            p4.innerHTML = `Time: ${timeString}`;
            p4.classList.add('modal_time');

            const participantCount = document.createElement('p');
            participantCount.innerHTML = `Joining: ${activity.num_participant}`;
            participantCount.classList.add('modal_participants');

            const activityLocation = document.createElement('p');
            activityLocation.innerHTML = `${activity.location}`;
            activityLocation.classList.add('modal_location');

            const id = `${activity.activity_id}`;

            const viewComments = document.createElement('button');
            viewComments.innerHTML = 'Chat about this topic';
            viewComments.classList.add('modal_comments');


            // Modal opens clicked image and displays image specific details
            img.onclick = function () {
                modal.style.display = "block";
                image.src = this.src;
                image.id = id;
                ul.appendChild(modal);
                modal.appendChild(modalContent);
                modalContent.appendChild(image);
                modalContent.appendChild(layer);
                layer.appendChild(p4);
                layer.appendChild(p3);
                layer.appendChild(publisher);
                layer.appendChild(activityName);
                layer.appendChild(participantCount);
                layer.appendChild(activityLocation);
                layer.appendChild(viewComments);
                modalContent.appendChild(close);
            }

            viewComments.addEventListener('click', async () => {
                location.href = `activity_comment.html?activityId=${activity.activity_id}&activityName=${activity.name}`
            });

            // When the user clicks on (x), close the modal
            close.onclick = function () {
                modal.style.display = "none";
            }
            // MODAL FUNCTIONALITY ENDS
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
        createActivityStack(user.ownActivity, 'My activities', 'own_activities');
        createActivityStack(user.participateActivity, 'Joining', 'joined_activities');

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
    console.log(json);
    
   
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

