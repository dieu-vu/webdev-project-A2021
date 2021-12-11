// file for search functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

const query = document.querySelector('#query');
const option = document.querySelector('#search_selector');
const div = document.querySelector('#hour_list');
const form = document.querySelector('#search_form');
let getActivityByName;
let getActivityByLocation;
let getActivityByDate;

const createActivityCards = (activities) => {
    // clear ul
    div.innerHTML = '';
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
        p4.innerHTML = `Time: ${activity.VET}`;
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

form.addEventListener('submit', async (evt)=>{
    evt.preventDefault();
    console.log("value is ",option.value);
    console.log("value is ",query.value);

    if(option.value == "name"){        
        //   AJAX call
           getActivityByName = async () => {
            try {
              const response = await fetch(url + '/guest_activity/searchType/' + query.value);
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
              const response = await fetch(url + '/guest_activity/searchLocation/' + query.value);
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
              const response = await fetch(url + '/guest_activity/searchDate/' + query.value);
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

