// file for home functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

// select existing html elements
const ul = document.querySelector('#hour_list');

// create activity cards
const createActivityCards = (activities) => {
  // clear ul
  ul.innerHTML = '';
  const header = document.createElement('h2');
  header.innerHTML = "All activities available now ";
  activities.forEach((activity) => {
    // create li with DOM methods
    
    const img = document.createElement('img');
    // img.src = url + '/' + activity.filename;
    img.src = activity.filename;

    img.alt = activity.activity;
    img.classList.add('activity_pic');

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = activity.activity;

    const p1 = document.createElement('p');
    p1.innerHTML = `Publisher: ${activity.owner}`;

    const p2 = document.createElement('p');
    p2.innerHTML = `Location: ${activity.location}`;

    const p3 = document.createElement('p');
    p3.innerHTML = `Description: ${activity.description}`;

    const p4 = document.createElement('p');
    p4.innerHTML = `Time: ${activity.VET}`;

    const p5 = document.createElement('p');
    p5.innerHTML = `Participant: ${activity.participantNum}`;


    // participate button
    const participateButton = document.createElement('button');
    participateButton.innerHTML = 'Participate';
    participateButton.classList.add('button');
    participateButton.addEventListener('click', async () => {
        const fetchOptions = {
          method: 'POST',
        };
        try {
          const response = await fetch(url + '/activity/participation/' + activity.id, fetchOptions);
          const json = await response.json();
          console.log('post response', json);
          ggetLast24HoursActivity();        
        } catch (e) {
          console.log(e.message);
        }
      });


    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);
    li.appendChild(p5);
    li.appendChild(participateButton);
    // ul.appendChild(header);
    ul.appendChild(li);
  });
};

// AJAX call
const getLast24HoursActivity = async () => {
  try {
    const response = await fetch(url + '/activity/last24hours/list');
    const activities = await response.json();
    console.log(activities)
    createActivityCards(activities);
  } catch (e) {
    console.log(e.message);
  }
};
getLast24HoursActivity();