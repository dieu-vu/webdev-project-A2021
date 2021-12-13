// file for comment functionality
// 'use strict';
const imgUrl = 'http://localhost:3000'; // url for backend connection


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

        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment_container');

        const img = document.createElement('img');
        fetchProfilePic(comment.user_id, img);
        img.onerror = () => {img.src='https://picsum.photos/600/400'};
        img.classList.add('comment_image');

        const p1 = document.createElement('p');
        p1.innerHTML = `💬 <a href="">${comment.user}</a>: ${comment.comment}`;
        p1.classList.add('comment_text');

        const postedTime = document.createElement('p');
        postedTime.classList.add('comment_text');
        postedTime.classList.add('comment_time');

        const timeText = () => {
          const commentDatetime = new Date(comment.time);

          const diffMinute = (Date.now() - commentDatetime)/(1000*60);
          //Convert diff time to mins, hours and days
          if (diffMinute < 60){
            return(`Posted ${Math.floor(diffMinute)} mins ago`);
          } else if ((diffMinute/60) < 24 ) {
            return(`Posted ${Math.floor(diffMinute /60)} hours ago`); 
          } else if ((diffMinute/60) > 24 ) {
            return(`Posted ${Math.floor(diffMinute/ (60*24))} days ago`);
            //if comment is older than 30 days, show date only
          } else if ((diffMinute/60) > (24*30)){ 
           return (`Posted on ${comment.time.substring(0,10)}`);
          }
        } 
        postedTime.innerHTML = timeText();
        

        commentContainer.appendChild(img);
        commentContainer.appendChild(p1);
        commentContainer.appendChild(postedTime);

        div.appendChild(commentContainer);
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

  
const fetchProfilePic = async (userId, imgElement) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(imgUrl + '/user/' + userId, fetchOptions);
    const user = await response.json();

    imgElement.src = imgUrl + '/' + user.user_filename;
    
  } catch (e) {
    console.log(e.message);
  }
};
