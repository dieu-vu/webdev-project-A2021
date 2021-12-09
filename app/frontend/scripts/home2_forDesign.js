// file for home functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

// select existing html elements
const div = document.querySelector('#activity_list');
const user = JSON.parse(sessionStorage.getItem('user'));

if (user.role === 0) {
    document.querySelector('.admin-option').style.display = "block";
};

// create activity cards
const createActivityCards = (activities) => {
    // clear ul
    div.innerHTML = '';
    activities.forEach((activity) => {
        // create li with DOM methods

        const img = document.createElement('img');
        img.src = url + '/' + activity.filename;
        // img.src = activity.filename;

        img.alt = activity.activity;
        img.classList.add('activity_image');

        const figure = document.createElement('figure');
        figure.classList.add('activity_thumb');

        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('gradient_background');

        const h2 = document.createElement('h2');
        h2.innerHTML = activity.activity;
        h2.classList.add('activity_name');

        const p1 = document.createElement('p');
        p1.innerHTML = `Publisher: ${activity.owner}`;
        p1.classList.add('publisher');

        const p2 = document.createElement('p');
        p2.innerHTML = `${activity.location}`;
        p2.classList.add('activity_location');

        const p3 = document.createElement('p');
        p3.innerHTML = `${activity.description}`;
        p3.classList.add('activity_description');

        const p4 = document.createElement('p');
        p4.innerHTML = `${activity.VET}`;
        p4.classList.add('activity_time');

        const p5 = document.createElement('p');
        p5.innerHTML = `Joining: ${activity.participantNum}`;
        p5.classList.add('participants');


        const a = document.createElement('a');
        a.classList.add('activity_link');
        // const li = document.createElement('li');
        // li.classList.add('light-border');

        //li.appendChild(h2);
        div.appendChild(a);
        a.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(p5);
        figure.appendChild(p1)
        figure.appendChild(h2);
        figure.appendChild(p3);
        figure.appendChild(p2);
        figure.appendChild(p4);


        // li.appendChild(p1);
        // li.appendChild(p2);
        // li.appendChild(p3);
        // li.appendChild(p4);
        // li.appendChild(p5);

        // participate button
        const participateButton = document.createElement('button');
        participateButton.innerHTML = 'Participate';
        participateButton.classList.add('button_participate');
        figure.appendChild(participateButton);
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
                if(json.message == "undefined"){
                    alert("You have already participated in this activity before. ");
                }else {alert("Welcome to join this activity.")};
                getActivity();
            } catch (e) {
                console.log(e.message);
            }
        });

        //delete button
        if(user.role == 0){
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.classList.add('button');
            li.appendChild(deleteButton)
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