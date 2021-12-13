// file for home functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

// select existing html elements
const div = document.querySelector('#activity_list');
const user = JSON.parse(sessionStorage.getItem('user'));

// Check if user is an admin to give access to admin page
if (user.role === 0) {
    document.querySelector('.admin-option').style.display = "block";
}
;

// create activity cards
const createActivityCards = (activities) => {
    // clear ul
    div.innerHTML = '';
    activities.forEach((activity) => {
        // create li with DOM methods

        const img = document.createElement('img');
        //Add a place holder picture if picture is not saved on server
        img.src = url + '/' + activity.filename;
        img.onerror = () => {
            img.src = 'https://picsum.photos/600/400'
        }
        img.alt = activity.activity;
        img.classList.add('activity_image');

        const figure = document.createElement('figure');
        figure.classList.add('activity_container');

        const gradient = document.createElement('figcaption');
        gradient.classList.add('gradient_background');

        const h2 = document.createElement('h2');
        h2.innerHTML = activity.activity;
        h2.classList.add('activity_name');

        const p2 = document.createElement('p');
        p2.innerHTML = `${activity.location}`;
        p2.classList.add('activity_location');

        const p5 = document.createElement('p');
        p5.innerHTML = `Participant: ${activity.participantNum}`;
        p5.classList.add('participants');

        const a = document.createElement('a');
        a.classList.add('activity_link');

        // FOR MODAL FUNCTIONALITY
        const hint = document.createElement('p');
        hint.innerHTML = "click to participate";
        hint.classList.add('modal_hint');
        // FOR MODAL FUNCTIONALITY

        a.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(gradient);
        figure.appendChild(p2);
        figure.appendChild(p5);
        figure.appendChild(h2);
        figure.appendChild(hint);


        // // FOR MODAL FUNCTIONALITY
        const layer = document.createElement('div');
        layer.classList.add('layer');
        // // FOR MODAL FUNCTIONALITY


        //if user not participate this activity display participate button otherwise display quit button
        const getParticipationStatus = async () => {
            try {
                const fetchOptions = {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    },
                };
                const response = await fetch(url + '/activity/participationStatus/' + activity.id, fetchOptions);
                const participationStatus = await response.json();
                if (participationStatus.message === "not yet participate") {
                    console.log(`no participated ${activity.id}`);
                    // participate button
                    const participateButton = document.createElement('button');
                    participateButton.innerHTML = 'Participate';
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
                            const response = await fetch(url + '/activity/participation/' + activity.id, fetchOptions);
                            const json = await response.json();
                            console.log('post response', json);
                            alert("Welcome to join this activity.");
                            getActivity();
                        } catch (e) {
                            console.log(e.message);
                        }
                    });
                } else {
                    //quit button
                    const quitButton = document.createElement('button');
                    quitButton.innerHTML = 'Quit';
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
                            alert("You have quitted this activity.")
                            getActivity();
                        } catch (e) {
                            console.log(e.message);
                        }
                    });
                }
            } catch (e) {
                console.log(e.message);
            }
        };
        getParticipationStatus();

        //delete button is visible for admin or moderator role and the owner of the activity
        if (user.role == 0 || user.role === 2 || user.user_id === activity.owner_id) {
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
                try {
                    const response = await fetch(url + '/activity/' + activity.id, fetchOptions);
                    const json = await response.json();
                    console.log('delete response', json);
                    getActivity();
                } catch (e) {
                    console.log(e.message);
                }
            });
        }

        div.appendChild(a);


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
        activityName.innerHTML = activity.activity;
        activityName.classList.add('modal_name');

        const p1 = document.createElement('p');
        p1.innerHTML = `${activity.owner}`;
        p1.classList.add('modal_publisher');

        const p3 = document.createElement('p');
        p3.innerHTML = `${activity.description}`;
        p3.classList.add('modal_description');

        const p4 = document.createElement('p');
        const timeString = `${activity.VET.toString().substring(0, 10)} @ ${activity.VET.toString().substring(11, 19)}`;
        console.log(timeString);
        p4.innerHTML = `Time: ${timeString}`;
        p4.classList.add('modal_time');

        const participantCount = document.createElement('p');
        participantCount.innerHTML = `Joining: ${activity.participantNum}`;
        participantCount.classList.add('modal_participants');

        const location = document.createElement('p');
        location.innerHTML = `${activity.location}`;
        location.classList.add('modal_location');


        // Modal opens clicked image and displays image specific details
        img.onclick = function () {
            modal.style.display = "block";
            image.src = this.src;
            div.appendChild(modal);
            modal.appendChild(modalContent);
            modalContent.appendChild(image);
            modalContent.appendChild(layer);
            modalContent.appendChild(close);
            layer.appendChild(p4);
            layer.appendChild(p3);
            layer.appendChild(p1);
            layer.appendChild(activityName);
            layer.appendChild(participantCount);
            layer.appendChild(location);
            modalContent.appendChild(close);
        }

// When the user clicks on (x), close the modal
        close.onclick = function () {
            modal.style.display = "none";
        }
        // MODAL FUNCTIONALITY ENDS
    });
};


// AJAX call
const getActivity = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/activity', fetchOptions);
        const activities = await response.json();
        console.log(activities)
        createActivityCards(activities);
    } catch (e) {
        console.log(e.message);
    }
};
getActivity();