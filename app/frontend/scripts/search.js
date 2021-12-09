// file for search functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

const query = document.querySelector('#query');
const option = document.querySelector('#search_selector');
const ul = document.querySelector('#hour_list');
const form = document.querySelector('#search-form');
const user = JSON.parse(sessionStorage.getItem('user'));
let getActivityByName;
let getActivityByLocation;
let getActivityByDate;

// Check if user is an admin to give access to admin page
if (user.role === 0) {
  document.querySelector('.admin-option').style.display = "block";
};

const createActivityCards = (activities) => {
    // clear ul
    ul.innerHTML = '';
    if (activities.length < 1){
        console.log("no activity");
        return;
    };

    activities.forEach((activity) => {
    //   create li with DOM methods
    if (activity < 1){
        console.log("no activity");
        return;
    };
      const img = document.createElement('img');
      img.src = url + '/' + activity.filename;
    //   img.src = activity.filename;
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
          alert("Welcome to join this activity.");
          if(option.value == "name"){
            getActivityByName();
        } else if(option.value == "location") {
            getActivityByLocation();
        } else if(option.value == "date") {
            getActivityByDate();
        }
        } catch (e) {
          console.log(e.message);
        }
      });
          } else{
          //quit button
          const quitButton = document.createElement('button');
          quitButton.innerHTML = 'Quit';
          quitButton.classList.add('button');
          li.appendChild(quitButton)
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
            if(option.value == "name"){
                getActivityByName();
            } else if(option.value == "location") {
                getActivityByLocation();
            } else if(option.value == "date") {
                getActivityByDate();
            }
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
            if(option.value == "name"){
                getActivityByName();
            } else if(option.value == "location") {
                getActivityByLocation();
            } else if(option.value == "date") {
                getActivityByDate();
            }        
          } catch (e) {
            console.log(e.message);
          }
        });
      }
      
        
      ul.appendChild(li);
    });
  };

form.addEventListener('submit', async (evt)=>{
    evt.preventDefault();
    console.log("value is ",option.value);
    console.log("value is ",query.value);

    if(option.value == "name"){        
        //   AJAX call
           getActivityByName = async () => {
            try {
              const fetchOptions = {
                    headers: {
                      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    },
                  };
              const response = await fetch(url + '/activity/searchType/' + query.value, fetchOptions);
              const activities = await response.json();
              console.log(activities);
              if(activities.message){
                  alert(`Sorry, there is no ${query.value} activity available at this moment. Please try to search other activity. Good luck.`);
                  return;
              }
              createActivityCards(activities);
            } catch (e) {
              console.log(e.message);
            }
          };
          getActivityByName();
    } else if (option.value == "location"){
           //   AJAX call
           getActivityByLocation = async () => {
            try {
              const fetchOptions = {
                    headers: {
                      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    },
                  };
              const response = await fetch(url + '/activity/searchLocation/' + query.value, fetchOptions);
              const activities = await response.json();
              console.log(activities);
              if(activities.message){
                alert(`Sorry, there is no activity available in ${query.value} at this moment. Please try to search other location. Good luck.`);
                return;
            }
              createActivityCards(activities);
            } catch (e) {
              console.log(e.message);
            }
          };
          getActivityByLocation();
    } else if (option.value == "date") {
         //   AJAX call
          getActivityByDate = async () => {
            try {
              const fetchOptions = {
                    headers: {
                      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    },
                  };
              const response = await fetch(url + '/activity/searchDate/' + query.value, fetchOptions);
              const activities = await response.json();
              console.log(activities);
              if(activities.message){
                alert(`Sorry, there is no activity available on ${query.value} at this moment. Please try to search other date. Good luck.`);
                return;
            }
              createActivityCards(activities);
            } catch (e) {
              console.log(e.message);
            }
          };
          getActivityByDate();
    }

});
