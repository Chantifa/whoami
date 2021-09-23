import {addRoomMembership, getCurrentRoomMembership, removeRoomMembership} from "./RoomMembershipRepo.js";
import {CHAT_REQUEST, JOIN_ROOM} from "./client/src/common/Requests.mjs";
import {Server} from "socket.io";
import express from "express";
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGE} from "./client/src/common/Responses.mjs";


const app = express();

const EXPECTED_TYPES_VERSION = "0.1.0"

const port = process.env.PORT || 5000;


// This displays message that the server running and listening to specified port
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = new Server(server);


//initializing the socket io connection
io.on("connection", (socket) => {
    console.info(`user ${socket.id} connected`)
    //now define callbacks for different events:

    //new user joining the room
    socket.on(JOIN_ROOM.id, ({userName, roomName, version}) => {
        if (EXPECTED_TYPES_VERSION !== version) {
            console.error("version mismatch", [EXPECTED_TYPES_VERSION, version, socket.id])
            return
        }


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
    socket.on(CHAT_REQUEST.id, (dto) => {
        console.log(`user ${socket.id} messaged ${JSON.stringify(dto)}`)
        //gets the room user and the message sent
        const roomMembership = getCurrentRoomMembership(socket.id)

        let payload = CHAT_MESSAGE.getDto();
        payload.user = roomMembership.user
        payload.message = dto.message

        io.to(roomMembership.room).emit(CHAT_MESSAGE.id, payload);
    });

    //when the user disconnects from the room
    socket.on("disconnect", () => {
        console.info(`user ${socket.id} disconnected`)
        //the user is deleted from array of users and a left room message displayed
        const roomMembership = removeRoomMembership(socket.id);

        if (roomMembership) {
            io.to(roomMembership.room).emit(CHAT_ANNOUNCEMENT.id, {
                message: `${roomMembership.user.userName} has left the room`
            });
        }
    });
});

////END COPY PASTA


// create a GET route
app.get('/express_get_test', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});