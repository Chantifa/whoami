import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {CHAT_REQUEST, GAME_QUESTION, GAME_START, GAME_VOTE, JOIN_ROOM} from "./common/Requests.mjs";
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGE, ERROR} from "./common/Responses.mjs";
import GameStateMessage from "./common/GameStateMessage.mjs";
import GameSetupMessage from "./common/GameSetupMessage.mjs";

export default function useServer(userName, roomName) {
    const socketRef = useRef(null)

    const [messageList, setMessageList] = useState([])
    const [gameInfo, setGameInfo] = useState({})
    const [gameState, setGameState] = useState(null)

    useEffect(() => {

             //fixme
            const parse = JSON.parse(localStorage.getItem("user")); //fixme
            if(!parse){
                alert("you are not logged in") //fixme
                         window.location.href = "/login" //fixme
                return //fixme
            }
            const jwt = parse.token; //fixme
            if (!jwt) { //fixme
                alert("you are not logged in") //fixme
                window.location.href = "/login" //fixme
                return // fixme
            }//fixme


            //setup
            if (socketRef.current === null) {
                console.log("connect")
                socketRef.current = io.connect("/")
            }
            const {current: socket} = socketRef;

            //join room
            socket.emit(JOIN_ROOM.id, {...JOIN_ROOM.getDto(), userName, roomName, jwt})

            //event handlers

            socket.on(ERROR.id, (message) => {
                console.error("Server Error:")
                console.error(message)
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


            socket.on(GameSetupMessage.id, (data) => {
                setGameInfo(() => {
                    return data
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

            //Cleanup of the hook
            return () => {
                console.log("disconnect")
                socket.removeAllListeners([CHAT_ANNOUNCEMENT.id, CHAT_MESSAGE.id, GameSetupMessage.id, GameStateMessage.id], ERROR.id)
                socket.disconnect()
            }
        }
        , [userName, roomName])

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