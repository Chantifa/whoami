const express = require('express');
const app = express();

const {Server} = require("socket.io");
require("./client/src/common/Types");

const {JOIN_ROOM, CHAT_ANNOUNCEMENT, CHAT_MESSAGE_RECEIVER, CHAT_MESSAGE_SENDER, LEAVE_ROOM} = require("./client/src/common/Types");
const {addRoomMembership, removeRoomMembership, getCurrentRoomMembership} = require("./RoomMembershipRepo");
const EXPECTED_TYPES_VERSION = "0.1.0"

const port = process.env.PORT || 5000;


// This displays message that the server running and listening to specified port
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = new Server(server);

// FIXME START COPY PASTA https://www.section.io/engineering-education/creating-a-real-time-chat-app-with-react-socket-io-with-e2e-encryption/



//initializing the socket io connection
io.on("connection", (socket) => {
    console.info(`user ${socket.id} connected`)
    //new user joining the room
    socket.on(JOIN_ROOM.id, ({userName, roomName}) => {

        addRoomMembership({userId: socket.id, userName}, roomName);
        socket.join(roomName);

        //display a welcome message to the user who have joined a room
        const message = `Welcome ${userName}`

        socket.emit(CHAT_ANNOUNCEMENT.id, {message});

        //displays a joined room message to all room users
        socket.broadcast.to(roomName).emit(CHAT_ANNOUNCEMENT.id, {
            message: `${userName} has joined the chat`,
        });
    });

    //user sending message
    socket.on(CHAT_MESSAGE_SENDER.id, (dto) => {
        console.log(`user ${socket.id} messaged ${JSON.stringify(dto)}`)
        //gets the room user and the message sent
        const roomMembership = getCurrentRoomMembership(socket.id)

        let payload = CHAT_MESSAGE_RECEIVER.getDto();
        payload.user = roomMembership.user
        payload.message = dto.message

        io.to(roomMembership.room).emit(CHAT_MESSAGE_RECEIVER.id, payload);
    });

    //when the user disconnects from the room
    socket.on("disconnect", () => {
        console.info(`user ${socket.id} disconnected`)
        //the user is deleted from array of users and a left room message displayed
        const roomMembership = removeRoomMembership(socket.id);

        if (roomMembership) {
            io.to(roomMembership.room).emit(CHAT_ANNOUNCEMENT.id, {
                message: `${roomMembership.username} has left the room`
            });
        }
    });
});

////END COPY PASTA


// create a GET route
app.get('/express_get_test', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});