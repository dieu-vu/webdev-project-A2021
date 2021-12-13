// file for home functionality
// 'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

// select existing html elements
const div = document.querySelector('#comment_list');
const addForm = document.querySelector('#search_form');

const getQueryVariable =(params) =>
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == params){return pair[1];}
       }
       return(false);
}
const id = getQueryVariable("activityId");

addForm.addEventListener('submit', async (evt)=>{
    evt.preventDefault();
    const data = serializeJson(addForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),  
        },
        body: JSON.stringify(data),
      };
        const response = await fetch(url + '/activity/comment/' + id, fetchOptions);
        const comment = await response.json();
        location.reload();
        return false;
});        


const createCommentLists = (comments) => {
    // clear ul
    div.innerHTML = '';
    
    comments.forEach((comment) => {
        const p1 = document.createElement('p');
        // const time = comment.time.
        p1.innerHTML = ` <br> 🥲   <a href="">${comment.user}</a>: ${comment.comment} <br/>posted at ${comment.time.replace("T"," ").replace(".000Z","" )}<br/>`;
        p1.classList.add('comment_list');

        // const div1 = document.createElement('div');
        // div1.appendChild(p1);
        div.appendChild(p1);
    });
}   



console.log("activityId:", getQueryVariable("activityId") );
const activityName = getQueryVariable("activityName").replace("%"," ").replace("20","");
console.log("activityName:", activityName );


         



const getCommentByActivityId = async (activity_id) => {
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/activity/comment/' + activity_id, fetchOptions);
      const comments = await response.json();
      console.log("comment detail:", comments);
      createCommentLists(comments);
      
    } catch (e) {
      console.log(e.message);
    }
  };
  getCommentByActivityId(id);

  
