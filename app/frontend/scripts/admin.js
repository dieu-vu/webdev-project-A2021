
'use strict';

const url = 'http://localhost:3000';

const loggedInUserId = JSON.parse(sessionStorage.getItem('user')).user_id;


// Create tabs for displaying user and activity list:
const tabs = document.querySelector('.tab-panel');
const userList = document.querySelector('.user-list');
const activityList = document.querySelector('.activity-list');


const createTabs = (node) => {
    let tabs = Array.from(node.children).map ( node => {
        let button = document.createElement('button');
        button.classList.add('admin_tab_button');
        button.textContent = node.getAttribute('data-tabname');

        let tab = {node, button};
        button.addEventListener('click', () => selectTab(tab));
        return tab;
    });

    let tabList = document.createElement('div');
    tabList.classList.add('admin_tab_button_container');
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
        const response = await fetch(url + `/user/`, fetchOptions);
        const users = await response.json();
        console.log('USERS RETRIEVED', users.length);
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
        const response = await fetch(url + '/activity/', fetchOptions);
        const activities = await response.json();
        console.log('ACTIVITIES RETRIEVED', activities.length);

        createActivityList(activities);

    } catch (e) {
        console.log(e);
    }
};


// create list for displaying user in user tab:
const createUserList = async (users) => {
    const ul = document.createElement('ul');
    ul.classList.add('tab-list');
    ul.innerHTML = '';

    if (users.length !== 0) {
        users.forEach(async (user) => {
            const name = document.createElement('p');
            name.classList.add('item-name');

            if (user.role === 0) {name.innerHTML = `${user.name} (Admin)` }
            else if (user.role === 2) {name.innerHTML = `${user.name} (Mod)`}
            else {name.innerHTML = `${user.name}`};

    
            const li = document.createElement('li');
            li.appendChild(name);

            const span = document.createElement('span');
            span.classList.add('admin_button_list');

            //Delete button 
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.classList.add('admin_button');
            deleteButton.style.display = "inline";
            deleteButton.addEventListener('click', async () => {
                const fetchOptions = {
                  method: 'DELETE',
                  headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                  },
                };
                if (confirm("You are deleting a user, continue?")) {
                    try {
                        const response = await fetch(url + '/user/' + user.user_id, fetchOptions);
                        console.log('delete response', response);
                        alert(`User ${name.innerHTML} deleted`);
                        window.location.reload();
                    } catch (e) {
                    console.log(e.message);
                    }
                } else {
                    alert("You cancelled the action");
                } 
                
            });

            //Promote button
            const promoteButton = document.createElement('button');
            promoteButton.classList.add('admin_button');
            promoteButton.style.display = "inline";
            if (user.role === 1) {
                await handleChangeRoleButton(promoteButton, 'Promote', user);
            } else if (user.role === 0) {
                promoteButton.style.display = 'none';
            } else if (user.role === 2) {
                await handleChangeRoleButton(promoteButton, 'Demote', user);
            };

            span.appendChild(deleteButton);
            span.appendChild(promoteButton);

            li.appendChild(span);
            ul.appendChild(li);
        });
    }
    userList.appendChild(ul);    
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
            name.innerHTML = `${activity.activity} - Owner: ${activity.owner}`;
    
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
                alert("You are deleting an activity, continue?");
                try {
                    const response = await fetch(url + '/activity/' + activity.id, fetchOptions);
                    console.log('delete response', response);
                    alert(`Activity ${name.innerHTML} deleted`);
                    window.location.reload();
                } catch (e) {
                    console.log(e.message);
                }
            });
            li.appendChild(deleteButton);
            ul.appendChild(li);
        });
    }
    activityList.appendChild(ul);    
};

const handleChangeRoleButton = async (buttonElement, changeType, user) => {
    if (changeType ==='Promote') {buttonElement.innerHTML = `${changeType} to mod` } 
    else { buttonElement.innerHTML = `${changeType} from mod`};
    
    buttonElement.addEventListener('click', async () => {
        const fetchOptions = {
            method: 'PUT',
            headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        if (confirm(`You will ${changeType} this user, continue?`)) {
            try {
                const response = await fetch(url + `/user/${user.user_id}/promoteUser`, fetchOptions);
                const json = await response.json();
                console.log('promote response', response);
                alert(json.message);
                window.location.reload();
            } catch (e) {
                console.log(e.message);
            }
        } else {
            alert("You cancelled the action");
        }
    });
};

getAllUsers();
getAllActitivities();

