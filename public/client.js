// public/client.js
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        document.getElementById('usernameInput').value = storedUsername;
        socket.emit('setUsername', storedUsername); // Emit stored username to include device user in the count
    }

    document.getElementById('usernameForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();
        if (username !== '') {
            socket.emit('setUsername', username);
            localStorage.setItem('username', username); // Save username to localStorage
            document.getElementById('usernameInput').value = ''; // Clear the input field
        }
    });

    socket.on('userConnected', ({ username, totalUsers }) => {
        addUserToList(username);
        document.getElementById('totalUsers').textContent = totalUsers;
    });

    socket.on('userDisconnected', ({ username, totalUsers, disconnectedAt }) => {
        removeUserFromList(username);
        document.getElementById('totalUsers').textContent = totalUsers;
        displayDisconnectTime(username, disconnectedAt);
        displayDisconnectionMessage(username);
    });

    socket.on('online', ({ totalUsers }) => {
        document.getElementById('totalUsers').textContent = totalUsers;
    });

    function addUserToList(username) {
        const userList = document.getElementById('userList');
        const listItem = document.createElement('li');
        listItem.textContent = username;
        listItem.setAttribute('id', username); // Set id to username
        userList.appendChild(listItem);
    }

    function removeUserFromList(username) {
        const userToRemove = document.getElementById(username);
        if (userToRemove) {
            userToRemove.remove();
        }
    }

    function displayDisconnectTime(username, disconnectedAt) {
        const userList = document.getElementById('userList');
        const userElement = document.getElementById(username);
        if (userElement) {
            const disconnectTimeElement = document.createElement('span');
            disconnectTimeElement.textContent = ` (Disconnected at ${new Date(disconnectedAt).toLocaleString()})`;
            userElement.appendChild(disconnectTimeElement);
        }
    }

    function displayDisconnectionMessage(username) {
        const messageContainer = document.getElementById('messageContainer');
        const messageElement = document.createElement('p');
        messageElement.textContent = `${username} has disconnected.`;
        messageContainer.appendChild(messageElement);
    }
});


