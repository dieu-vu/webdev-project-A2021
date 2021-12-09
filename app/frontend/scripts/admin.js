
'use strict';

const url = 'http://localhost:3000';

//// TODO: if have time, try adding admin profile picture here:
const loggedInUserId = JSON.parse(sessionStorage.getItem('user')).user_id;
// const userInfo = document.querySelector('#user-info');

// console.log("createUserPic func loaded");
// console.log(userInfo);

// Create tabs for displaying user and activity list:
const tabs = document.querySelector('.tab-panel');
const createTabs = (node) => {
    let tabs = Array.from(node.children).map ( node => {
        let button = document.createElement('button');
        button.textContent = node.getAttribute('data-tabname');
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
        const response = await fetch(url + `/activity/`, fetchOptions);
        const users = await response.json();
        console.log('ACTIVITIES RETRIEVED', users.length);
        // userNameList

    } catch (e) {
        console.log(e);
    }
};
getAllUsers();
getAllActitivities();

// create list for displaying user in user tab:
const createUserList = (userList) => {
    const ul = document.createElement('ul');
    ul.classList.add('user-list');
    ul.innerHTML = '';

    if (userList.length !== 0) {
        const name = document.createElement('p');
        name.classList.add('user-name');

        const li = document.createElement('li');
        li.appendChild(name);

        ul.appendChild(li);
    }

    
}