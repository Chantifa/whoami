import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {CHAT_REQUEST, JOIN_ROOM} from "./common/Requests.mjs";
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGE, GAME_SETUP, GAME_STATE} from "./common/Responses.mjs";

export default function useServer(userName, roomName){
    const socketRef = useRef(null)

    const [messageList, setMessageList]  = useState([])
    const [gameInfo, setGameInfo] = useState({})
    const [gameState, setGameState] = useState({})

    useEffect(() => {
        //setup
        if (socketRef.current === null) {
            console.log("connect")
            socketRef.current = io.connect("/")
        }
        const {current: socket} = socketRef;

        //join room
        socket.emit(JOIN_ROOM.id, {...JOIN_ROOM.getDto(), userName, roomName})

        //event handlers
        socket.on(CHAT_ANNOUNCEMENT.id, (data) => {
            setMessageList( (old) => { return [...old, data]})
            console.log(CHAT_ANNOUNCEMENT.id)
        })

        socket.on(CHAT_MESSAGE.id, (data) => {
            setMessageList( (old) => { return [...old, data]})
            console.log(CHAT_MESSAGE.id)
        })


        socket.on(GAME_SETUP.id, (data) => {
            setGameInfo(old => {
                return {...old, data}
            })
            console.log(GAME_SETUP.id)
        })

        socket.on(GAME_STATE.id, (data) => {
            setGameState(old => {
                if(data.stateNumber > old.stateNumber) {
                    return {...old, data}
                }
            })
            console.log(GAME_SETUP.id)
        })

        //Cleanup of the hook
        return () => {
            console.log("disconnect")
            socket.disconnect()
        }
    }
    , [userName, roomName])

    //Request methods
    function sendMessage(message){
        socketRef.current.emit(CHAT_REQUEST.id, CHAT_REQUEST.getDto(message))
    }

    return {sendMessage, messageList, gameInfo, gameState}

}