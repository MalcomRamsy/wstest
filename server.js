// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let onlineUsers = new Set();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('setUsername', (username) => {
        onlineUsers.add(username);
        io.emit('userConnected', { username, totalUsers: onlineUsers.size });
        socket.emit('online', { totalUsers: onlineUsers.size }); // Emit total users to the client
        socket.username = username; // Store username in socket object
        console.log(`${username} connected`);
    });

    socket.on('disconnect', () => {
        const user = socket.username;
        if (user && onlineUsers.has(user)) {
            onlineUsers.delete(user);
            io.emit('userDisconnected', { username: user, totalUsers: onlineUsers.size, disconnectedAt: new Date() });
            console.log(`${user} disconnected`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
