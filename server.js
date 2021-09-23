import {addRoomMembership, getCurrentRoomMembership, removeRoomMembership} from "./RoomMembershipRepo.js";
import * as req from "./client/src/common/Requests.mjs";
import {Server} from "socket.io";
import * as res from "./client/src/common/Responses.mjs";
import express from "express";

const {CHAT_REQUEST, JOIN_ROOM} = req


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
        if (EXPECTED_TYPES_VERSION !== version){
            console.error("version mismatch", [EXPECTED_TYPES_VERSION, version, socket.id])
            return
        }


        addRoomMembership({userId: socket.id, userName}, roomName);
        socket.join(roomName);

        //display a welcome message to the user who have joined a room
        const message = `Welcome ${userName}`

        socket.emit(res.CHAT_ANNOUNCEMENT.id, {message});

        //displays a joined room message to all room users
        socket.broadcast.to(roomName).emit(res.CHAT_ANNOUNCEMENT.id, {
            message: `${userName} has joined the chat`,
        });
    });

    //user sending message
    socket.on(CHAT_REQUEST.id, (dto) => {
        console.log(`user ${socket.id} messaged ${JSON.stringify(dto)}`)
        //gets the room user and the message sent
        const roomMembership = getCurrentRoomMembership(socket.id)

        let payload = res.CHAT_MESSAGE.getDto();
        payload.user = roomMembership.user
        payload.message = dto.message

        io.to(roomMembership.room).emit(res.CHAT_MESSAGE.id, payload);
    });

    //when the user disconnects from the room
    socket.on("disconnect", () => {
        console.info(`user ${socket.id} disconnected`)
        //the user is deleted from array of users and a left room message displayed
        const roomMembership = removeRoomMembership(socket.id);

        if (roomMembership) {
            io.to(roomMembership.room).emit(res.CHAT_ANNOUNCEMENT.id, {
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