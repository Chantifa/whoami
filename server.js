import {
    addRoomMembership,
    getCurrentRoomMembership,
    getRoomMembers,
    removeRoomMembership
} from "./RoomMembershipRepo.js";
import {CHAT_REQUEST, GAME_QUESTION, GAME_START, GAME_VOTE, JOIN_ROOM} from "./client/src/common/Requests.mjs";
import {Server} from "socket.io";
import express from "express";
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGE, ERROR, GAME_SETUP, GAME_STATE} from "./client/src/common/Responses.mjs";
import {getRandomCharacterName, shuffle} from "./utils.js";

const app = express();

const EXPECTED_TYPES_VERSION = "0.1.0"

const port = process.env.PORT || 5000;


// This displays message that the server running and listening to specified port
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = new Server(server);

const games = {}

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

    socket.on(GAME_START.id,()=> {
        const roomMembership = getCurrentRoomMembership(socket.id);

        if(games[roomMembership.room] != null){
            socket.emit(ERROR.id, ERROR.getDto("Game already started"))
            return
        }

        const roomMembers = getRoomMembers(roomMembership.room)
        console.log(roomMembers)
        const personaMapInPlayOrder = new Map()
        shuffle(roomMembers)
        roomMembers.forEach(m => {
            personaMapInPlayOrder.set(m.user.userId, getRandomCharacterName())
        })

        const state = GAME_STATE.getDto(roomMembers[0].user.userId, null, new Date(Date.now() + 5 * 60000), new Map())
        games[roomMembership.room] = {
            ...state
            , personaMapInPlayOrder
        }



        console.log(personaMapInPlayOrder)
        io.to(roomMembership.room).emit(GAME_SETUP.id,
            GAME_SETUP.getDto(personaMapInPlayOrder, 2)); //TODO

        io.to(roomMembership.room).emit(GAME_STATE.id, state)
    });

    const todo = [GAME_VOTE.id, GAME_QUESTION.id]
    todo.forEach(e => {
        socket.on(e, (...data) => {
            console.log(e)
            const roomMembership = getCurrentRoomMembership(socket.id)
            io.to(roomMembership.room).emit(GAME_STATE.id,
                GAME_STATE.getDto(null, "no question, just TODO's", new Date(), new Map())
            )

        })
    })
});


// create a GET route
app.get('/express_get_test', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});

