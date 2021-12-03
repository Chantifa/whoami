import {
    addRoomMembership,
    getCurrentRoomMembership,
    getRoomMemberships,
    removeRoomMembership
} from "./model/RoomMembershipRepo.js";
import {CHAT_REQUEST, GAME_QUESTION, GAME_START, GAME_VOTE, JOIN_ROOM} from "./client/src/common/Requests.mjs";
import {Server} from "socket.io";
import express from "express";
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGE, ERROR} from "./client/src/common/Responses.mjs";
import {gameExistsFor, getGame, remove} from "./model/GameRepo.js";
import GameStateMessage from "./client/src/common/GameStateMessage.mjs";
import GameSetupMessage from "./client/src/common/GameSetupMessage.mjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import apiRoutes from "./routes.js";
import db from "./model/User.js";
import jsonwebtoken from "jsonwebtoken";
import statsCallback from "./model/userInfoRepo.js";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

/**
 * The server handles the sockets as well as the database connection, middleware and the swagger documentation
 */

dotenv.config();

const app = express();

const EXPECTED_TYPES_VERSION = "0.1.0"

const port = process.env.PORT || 5000;

// This displays message that the server running and listening to specified port
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = new Server(server);

function error(socket, message) {
    socket.emit(ERROR.id, ERROR.getDto(message))
    console.log(`Error occured on ${socket}, message: ${message}`)
}

function sendIndividualGameSetupMessage(game, roomMembers) {
    const setupMessage = game.getSetupMessage()

    for (let i in roomMembers) {
        const dto = setupMessage.getDtoFor(roomMembers[i])
        // to individual socketid (private message)
        io.to(roomMembers[i].socketId).emit(GameSetupMessage.id, dto)
    }
}

//initializing the socket io connection
io.on("connection", (socket) => {
    console.info(`user ${socket.id} connected`)
    //now define callbacks for different events:

    //new user joining the room
    socket.on(JOIN_ROOM.id, ({userName, roomName, jwt, version}) => {
        try {
            if (EXPECTED_TYPES_VERSION !== version) {
                console.log("version mismatch", [EXPECTED_TYPES_VERSION, version, socket.id])
                return
            }

            const decoded = jsonwebtoken.verify(jwt, process.env.TOKEN_SECRET)

            addRoomMembership({userId: decoded.userId, socketId: socket.id, userName}, roomName);
            socket.join(roomName);
        } catch (e) {
            error(socket, e.message)
        }

        //display a welcome message to the user who have joined a room
        const message = `Welcome ${userName}`

        socket.emit(CHAT_ANNOUNCEMENT.id, {message});

        //displays a joined room message to all room users
        socket.broadcast.to(roomName).emit(CHAT_ANNOUNCEMENT.id, {
            message: `${userName} has joined the chat`,
        });

        // sends the personas to the person joining if the games is running
        if (gameExistsFor(roomName)){
            const game = getGame(roomName)
            socket.emit(GameSetupMessage.id, game.getSetupMessage().getDto())
            socket.emit(GameStateMessage.id, game.getStateMessage().getDto())
        }
    });

    //user sending message
    socket.on(CHAT_REQUEST.id, (dto) => {
        try {

            console.log(`user ${socket.id} messaged ${JSON.stringify(dto)}`)
            //gets the room user and the message sent
            const roomMembership = getCurrentRoomMembership(socket.id)

            let payload = CHAT_MESSAGE.getDto();
            payload.user = roomMembership.user
            payload.message = dto.message

            io.to(roomMembership.room).emit(CHAT_MESSAGE.id, payload);
        } catch (e) {
            error(socket, e.message)
        }
    });

    //when the user disconnects from the room
    socket.on("disconnect", () => {
        try {

            console.info(`user ${socket.id} disconnected`)
            //the user is deleted from array of users and a left room message displayed
            const roomMembership = removeRoomMembership(socket.id);

            if (roomMembership) {
                io.to(roomMembership.room).emit(CHAT_ANNOUNCEMENT.id, {
                    message: `${roomMembership.user.userName} has left the room`
                });
                const game = getGame(roomMembership.room)
                game.dropPlayer(roomMembership.user)

                if (game.isDead()){
                    remove(roomMembership.room)
                } else {
                    sendIndividualGameSetupMessage(game, getRoomMemberships(roomMembership.room))
                }
            }
        } catch (e) {
            error(socket, e.message)
        }
    });


    socket.on(GAME_START.id,()=> {
        try {
            const roomMembership = getCurrentRoomMembership(socket.id);
            const game = getGame(roomMembership.room);
            game.setStatsCallbacks(statsCallback)
            const currentRoomMemberships = getRoomMemberships(roomMembership.room)
            const roomMembers = currentRoomMemberships.map(roomMembership => roomMembership.user)
            game.start(roomMembers)
            sendIndividualGameSetupMessage(game, roomMembers);


            const gameState = game.getStateMessage()

            io.to(roomMembership.room).emit(GameStateMessage.id, gameState.getDto())

        } catch (e) {
            error(socket, e.message)
        }
    })


        socket.on(GAME_VOTE.id, (voteDto) => {
            try{

            console.log(GAME_VOTE.id)
            const roomMembership = getCurrentRoomMembership(socket.id);
            const game = getGame(roomMembership.room);

            game.handleVote(roomMembership.user, voteDto)
            const gameState = game.getStateMessage()

            io.to(roomMembership.room).emit(GameStateMessage.id, gameState.getDto())
            }
            catch (e) {
                error(socket, e.message)
            }

        })

        socket.on(GAME_QUESTION.id, (question) => {
            try {
                console.log(GAME_QUESTION.id)
                const roomMembership = getCurrentRoomMembership(socket.id)
                const game = getGame(roomMembership.room);

                game.handleQuestion(roomMembership.user, question)

                const gameState = game.getStateMessage()

                io.to(roomMembership.room).emit(GameStateMessage.id, gameState.getDto())

            } catch (e) {
                error(socket, e.message)
            }

        })


});


//const db = mongoose.connection;

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, //fixme Argument type {useUnifiedTopology: boolean, useNewUrlParser: boolean} is not assignable to parameter type ConnectOptions
    },
    () => console.log('DB Connection successful!')
);

db.on('error', console.error.bind(console, 'connection error: '));

//middlewares
app.use(bodyParser.json())
app.use(cors())

//routes middleware
app.use('/api', apiRoutes);

// api documentation
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));