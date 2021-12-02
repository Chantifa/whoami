import {useContext, useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {CHAT_REQUEST, GAME_QUESTION, GAME_START, GAME_VOTE, JOIN_ROOM} from "./common/Requests.mjs";
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGE, ERROR} from "./common/Responses.mjs";
import GameStateMessage from "./common/GameStateMessage.mjs";
import GameSetupMessage from "./common/GameSetupMessage.mjs";
import {ReactReduxContext} from "react-redux";

export default function useServer(userName, roomName, messageHandler) {
    const socketRef = useRef(null)

    const [messageList, setMessageList] = useState([])
    const [gameInfo, setGameInfo] = useState({})
    const [gameState, setGameState] = useState(null)
    const {store} = useContext(ReactReduxContext);


    useEffect(() => {

            const jwt = store.getState().authentication.user.token


            //setup

            if (userName === "") {
                console.log("user empty")
                return
            }

            if (socketRef.current === null) {
                console.log("connect")
                socketRef.current = io.connect("/")
                const {current: socket} = socketRef;

                //join room
                console.log("join")
                socket.emit(JOIN_ROOM.id, {...JOIN_ROOM.getDto(), userName, roomName, jwt})

                //event handlers

                socket.on(ERROR.id, (message) => {
                    message.name="Server Error"
                    console.error(message.name)
                    console.error(message)
                    messageHandler(message)
                })

                socket.on(CHAT_ANNOUNCEMENT.id, (data) => {
                    setMessageList((old) => {
                        return [...old, data]
                    })
                    console.log(CHAT_ANNOUNCEMENT.id)
                })

                socket.on(CHAT_MESSAGE.id, (data) => {
                    setMessageList((old) => {
                        return [...old, data]
                    })
                    console.log(CHAT_MESSAGE.id)
                })


                socket.on(GameSetupMessage.id, ({personaMapInPlayOrder}) => {
                    const msg = new GameSetupMessage(personaMapInPlayOrder)
                    setGameInfo(() => {
                        return {personaMapInPlayOrder: msg.mPersonaMapInPlayOrder}
                    })
                    console.log(GameSetupMessage.id)
                })

                socket.on(GameStateMessage.id, (data) => {
                    setGameState(old => {
                        if (!old || data.stateNumber > old.stateNumber) {
                            return data
                        }
                        console.log("old data recieced?", old, data)
                        return old
                    })
                    console.log(GameStateMessage.id)
                })

            }
        }
        , [userName, roomName, store])

    //Request methods
    function sendMessage(message) {
        socketRef.current.emit(CHAT_REQUEST.id, CHAT_REQUEST.getDto(message))
    }

    function sendQuestion(question) {
        socketRef.current.emit(GAME_QUESTION.id, GAME_QUESTION.getDto(question))
    }

    function sendVote(vote) {
        socketRef.current.emit(GAME_VOTE.id, GAME_VOTE.getDto(gameState.currentQuestion, vote))
    }

    function startGame() {
        socketRef.current.emit(GAME_START.id, null)
    }

    return {sendMessage, messageList, gameInfo, gameState, sendQuestion, sendVote, startGame}

}