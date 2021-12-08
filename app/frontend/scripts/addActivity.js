// file for add activity functionality
'use strict';
// const url = 'http://localhost:3000'; // url for backend connection

const addForm = document.querySelector('#add_activity_form');

addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
      };
    const response = await fetch(url + '/activity', fetchOptions);
    const json = await response.json();
    alert(json.message);
    location.href = 'user.html';

});


// Show which file is chosen
const updateList = function() {
    const input = document.querySelector('#file');
    const output = document.querySelector('#fileList');
    let children = "";
    for (let i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + '</li>';
    }
    output.innerHTML = '<ul>'+children+'</ul>';
}