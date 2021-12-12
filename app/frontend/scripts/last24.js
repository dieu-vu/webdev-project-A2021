// file for home functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

// select existing html elements
const div = document.querySelector('#hour_list');
const user = JSON.parse(sessionStorage.getItem('user'));

// Check if user is an admin to give access to admin page
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
    //Add a place holder picture if picture is not saved on server
    if (activity.filename === null) {
      img.src = 'https://picsum.photos/300/200';
    } else {
        img.src = url + '/' + activity.filename;
    }

    img.alt = activity.activity;
    img.classList.add('activity_image');

    img.addEventListener('click', async () => {
      location.href = `activity_co.html?activityId=${activity.id}&activityName=${activity.activity}`;
    });

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
    p2.innerHTML = `${activity.location}`;
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

    a.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(gradient);
    figure.appendChild(p2);
    figure.appendChild(p5);
    figure.appendChild(h2);

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
        if (participationStatus.message == "not yet participate"){
          console.log(`no participated ${activity.id}`);
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
        alert("Welcome to join this activity.");
        getLast24HoursActivity();
      } catch (e) {
        console.log(e.message);
      }
    });
        } else{
        //quit button
        const quitButton = document.createElement('button');
        quitButton.innerHTML = 'Quit';
        quitButton.classList.add('button_participate');
        figure.appendChild(quitButton)
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
          getLast24HoursActivity();
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

          //delete button
          if(user.role == 0 || user.role === 2 || user.user_id === activity.owner_id) {
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.classList.add('button_delete');
            figure.appendChild(deleteButton)
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
                getLast24HoursActivity();         
              } catch (e) {
                console.log(e.message);
              }
            });
          }
 
    div.appendChild(a);
  });
};

// AJAX call
const getLast24HoursActivity = async () => {
  try {
    const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
    const response = await fetch(url + '/activity/last24hours/list', fetchOptions);
    const activities = await response.json();
    console.log(activities)
    if(activities.message){
        alert(activities.message);
        location.href = 'home.html';
        return
    }
    createActivityCards(activities);
  } catch (e) {
    console.log(e.message);
  }
};
getLast24HoursActivity();
