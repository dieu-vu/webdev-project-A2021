// file for home functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

// select existing html elements
const ul = document.querySelector('#activity_list');
const user = JSON.parse(sessionStorage.getItem('user'));

if (user.role === 0) {
  document.querySelector('.admin-option').style.display = "block";
};

// create activity cards
const createActivityCards = (activities) => {
  // clear ul
  ul.innerHTML = '';
  activities.forEach((activity) => {
    // create li with DOM methods
    
    const img = document.createElement('img');
    img.src = url + '/' + activity.filename;
    // img.src = activity.filename;

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

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);
    li.appendChild(p5);

    // participate button
    const participateButton = document.createElement('button');
    participateButton.innerHTML = 'Participate';
    participateButton.classList.add('button');
    li.appendChild(participateButton);
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

    ul.appendChild(li);
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
