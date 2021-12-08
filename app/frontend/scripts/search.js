// file for search functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

const query = document.querySelector('#query');
const option = document.querySelector('#search_selector');
const ul = document.querySelector('#hour_list');
const form = document.querySelector('#search-form');
let getActivityByName;
let getActivityByLocation;
let getActivityByDate;

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
  
  
    //   participate button
      const participateButton = document.createElement('button');
      participateButton.innerHTML = 'Participate';
      participateButton.classList.add('button');
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
            console.log("message:", json.message);

            if(json.message == "undefined"){
                alert("You have already participated in this activity before. ");
            }else {alert("Welcome to join this activity.")};
            
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
  
      const li = document.createElement('li');
  
      li.appendChild(h2);
      li.appendChild(figure);
      li.appendChild(p1);
      li.appendChild(p2);
      li.appendChild(p3);
      li.appendChild(p4);
      li.appendChild(p5);
      li.appendChild(participateButton);
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
