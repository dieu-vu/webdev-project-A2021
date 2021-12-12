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

    const img = document.createElement('img');
    //Add a place holder picture if picture is not saved on server
    if (activity.filename === null) {
      img.src = 'https://picsum.photos/300/200';
    } else {
        img.src = url + '/' + activity.filename;
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

    const p1 = document.createElement('p');
    p1.innerHTML = `${activity.owner}`;
    p1.classList.add('publisher');

    const p2 = document.createElement('p');
    p2.innerHTML = `Location: ${activity.location}`;
    p2.classList.add('activity_location');

    const p3 = document.createElement('p');
    p3.innerHTML = `Description: ${activity.description}`;
    p3.classList.add('activity_description');

    const p4 = document.createElement('p');
    const timeString = `${activity.VET.toString().substring(0,9)} @ ${activity.VET.toString().substring(10,17)}`;
    p4.innerHTML = `Time: ${timeString}`;
    p4.classList.add('activity_time');

    const p5 = document.createElement('p');
    p5.innerHTML = `Participant: ${activity.participantNum}`;
    p5.classList.add('participants');


    const a = document.createElement('a');
    a.classList.add('activity_link');


    div.appendChild(a);
    a.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(gradient);
    figure.appendChild(p1);

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
