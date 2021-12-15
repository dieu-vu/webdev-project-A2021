// file for home functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

// select existing html elements
const div = document.querySelector('#activity_list');

// create activity cards
const createActivityCards = (activities) => {
    // clear ul
    div.innerHTML = '';
    const header = document.createElement('h2');
    header.innerHTML = "All activities available now ";
    activities.forEach((activity) => {
        // create li with DOM methods

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
        p5.innerHTML = `Joining: ${activity.participantNum}`;
        p5.classList.add('participants');

        const loginHint = document.createElement('p');
        loginHint.innerHTML = `Login to view`;
        loginHint.classList.add('login_hint');

        const a = document.createElement('a');
        a.classList.add('activity_link');


        div.appendChild(a);
        a.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(gradient);
        figure.appendChild(h2);
        figure.appendChild(p2);
        figure.appendChild(p5);
        figure.appendChild(loginHint);

        img.addEventListener('click', async () => {
            alert('Login to view');
        });

    });
};

// AJAX call
const getActivity = async () => {
    try {
        const response = await fetch(url + '/guest_activity');
        const activities = await response.json();
        console.log(activities)
        createActivityCards(activities);
    } catch (e) {
        console.log(e.message);
    }
};
getActivity();
