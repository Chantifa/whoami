import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {CHAT_REQUEST, JOIN_ROOM} from "./common/Requests.mjs";
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGE} from "./common/Responses.mjs";

export default function useServer(userName, roomName){
    const socketRef = useRef(null)

    const [messageList, setMessageList]  = useState([])

    useEffect(() => {
        if (socketRef.current === null) {
            console.log("connect")
            socketRef.current = io.connect("/")
        }


        const {current: socket} = socketRef;

        socket.emit(JOIN_ROOM.id, {...JOIN_ROOM.getDto(), userName, roomName})


        socket.on(CHAT_ANNOUNCEMENT.id, (data) => {
            setMessageList( (old) => { return [...old, data]})
            console.log(CHAT_ANNOUNCEMENT.id)
        })

        socket.on(CHAT_MESSAGE.id, (data) => {
            setMessageList( (old) => { return [...old, data]})
            console.log(CHAT_MESSAGE.id)
        })

        //Cleanup of the hook
        return () => {
            console.log("disconnect")
            socket.disconnect()
        }
    }
    , [userName, roomName])

    function sendMessage(message){
        socketRef.current.emit(CHAT_REQUEST.id, CHAT_REQUEST.getDto(message))
    }

    return {sendMessage, messageList}

}