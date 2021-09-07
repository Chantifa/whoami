const express = require('express');
const app = express();

const socket = require("socket.io");


const { Server } = require("socket.io");

const port = process.env.PORT || 5000;


// This displays message that the server running and listening to specified port
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = new Server(server);


// //listen to socket connections
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

// FIXME START COPY PASTA https://www.section.io/engineering-education/creating-a-real-time-chat-app-with-react-socket-io-with-e2e-encryption/

const c_users = [];

// joins the user to the specific chatroom
function join_User(id, username, room) {
    const p_user = { id, username, room };

    c_users.push(p_user);
    console.log(c_users, "users");

    return p_user;
}

// Gets a particular user id to return the current user
function get_Current_User(id) {
    return c_users.find((p_user) => p_user.id === id);
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
    const index = c_users.findIndex((p_user) => p_user.id === id);

    if (index !== -1) {
        return c_users.splice(index, 1)[0];
    }
}

//initializing the socket io connection
io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`)
    //for a new user joining the room
    socket.on("joinRoom", ({ username, roomname }) => {
        //* create user
        const p_user = join_User(socket.id, username, roomname);
        console.log(socket.id, "=id");
        socket.join(p_user.room);

        //display a welcome message to the user who have joined a room
        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `Welcome ${p_user.username}`,
        });

        //displays a joined room message to all other room users except that particular user
        socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has joined the chat`,
        });
    });

    //user sending message
    socket.on("chat", (text) => {
        //gets the room user and the message sent
        const p_user = get_Current_User(socket.id);

        io.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: text,
        });
    });

    //when the user exits the room
    socket.on("disconnect", () => {
        console.log(`user ${socket.id} disconnected`)
        //the user is deleted from array of users and a left room message displayed
        const p_user = user_Disconnect(socket.id);

        if (p_user) {
            io.to(p_user.room).emit("message", {
                userId: p_user.id,
                username: p_user.username,
                text: `${p_user.username} has left the room`,
            });
        }
    });
});

////END COPY PASTA


// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});