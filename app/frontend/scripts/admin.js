
'use strict';

const url = 'http://localhost:3000';

//// TODO: if have time, try adding admin profile picture here:
const loggedInUserId = JSON.parse(sessionStorage.getItem('user')).user_id;
// const userInfo = document.querySelector('#user-info');

// console.log("createUserPic func loaded");
// console.log(userInfo);

// Create tabs for displaying user and activity list:
const tabs = document.querySelector('.tab-panel');
const itemList = document.querySelector('.item-list');

const createTabs = (node) => {
    let tabs = Array.from(node.children).map ( node => {
        let button = document.createElement('button');
        button.textContent = node.getAttribute('data-tabname');
        // let listDiv = document.createElement('div');
        // listDiv.classList.add = node.getAttribute('data-tabname');
        // listDiv.innerHTML = createUserList(userNameList);

        let tab = {node, button};
        button.addEventListener('click', () => selectTab(tab));
        return tab;
    });

    let tabList = document.createElement('div');
    for ( let {button} of tabs) tabList.appendChild(button);
    node.insertBefore(tabList, node.firstChild);

    const selectTab = (selectedTab) => {
        for (let tab of tabs) {
            let selected = tab === selectedTab;
            tab.node.style.display = selected ? "inline-block" : "none";
            // tab.listDiv.style.display = selected ? "block" : "none";
            tab.button.style.color = selected ? "#004155" : "#fcfcfc";
        }
    }
    selectTab(tabs[0]);
};
createTabs(tabs);


// get user list for User tab
const getAllUsers = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        console.log('LOGGED IN USER', loggedInUserId);
        const response = await fetch(url + `/user/`, fetchOptions);
        const users = await response.json();
        console.log('USERS RETRIEVED', users.length);
        //const userNameList = users.map( (user) => { return user.name; });
        createUserList(users);

    } catch (e) {
        console.log(e);
    }
};

// get activity list for Activity tab
const getAllActitivities = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        console.log('LOGGED IN USER', loggedInUserId);
        const response = await fetch(url + '/activity/', fetchOptions);
        const activities = await response.json();
        console.log('ACTIVITIES RETRIEVED', activities.length);
        console.log('ACTIVITIES RETRIEVED', activities);

        createActivityList(activities);

    } catch (e) {
        console.log(e);
    }
};


// create list for displaying user in user tab:
const createUserList = (users) => {
    const ul = document.createElement('ul');
    ul.classList.add('tab-list');
    ul.innerHTML = '';

    if (users.length !== 0) {
        users.forEach((user) => {
            const name = document.createElement('p');
            name.classList.add('item-name');
            name.innerHTML = `${user.name}`;
    
            const li = document.createElement('li');
            li.appendChild(name);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.classList.add('button');
            deleteButton.style.display = "inline";
            deleteButton.addEventListener('click', async () => {
                const fetchOptions = {
                  method: 'DELETE',
                  headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                  },
                };
                try {
                  const response = await fetch(url + '/user/' + user.user_id, fetchOptions);
                  const json = await response.json();
                  console.log('delete response', json);    
                } catch (e) {
                  console.log(e.message);
                }
            });

            li.appendChild(deleteButton);

            ul.appendChild(li);
        });
    }
    itemList.appendChild(ul);    
};

// create list for displaying activity in activity tab:
const createActivityList = (activities) => {
    const ul = document.createElement('ul');
    ul.classList.add('tab-list');
    ul.innerHTML = '';

    if (activities.length !== 0) {
        activities.forEach((activity) => {
            const name = document.createElement('p');
            name.classList.add('item-name');
            name.innerHTML = `${activity.activity}`;
    
            const li = document.createElement('li');
            li.appendChild(name);

            console.log("activity name", name.innerHTML);
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.classList.add('button');
            deleteButton.style.display = "inline";
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
                } catch (e) {
                  console.log(e.message);
                }
            });
            li.appendChild(deleteButton);

            ul.appendChild(li);
        });
    }
    itemList.appendChild(ul);    
};

getAllUsers();
getAllActitivities();

