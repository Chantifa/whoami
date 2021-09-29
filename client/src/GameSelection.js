import {Route} from "react-router-dom";
import {useParams, useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import {io} from "socket.io-client";
import {Button, Form} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {CHAT_REQUEST, JOIN_ROOM} from "./common/Requests.mjs";
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGE} from "./common/Responses.mjs";

function Game(props) {

    const {id} = useParams();
    const socketRef = useRef(null) //todo: extract to socketEffects
    const [text, setText] = useState("");

    useEffect(() => { //todo: extract to socketEffects
        if (socketRef.current === null) {
            console.log("connect")
            socketRef.current = io.connect("/")
        }
        setText("Hallo")

        const {current: socket} = socketRef;

        let data = {userName: props.userName, roomName: id};
        data = {...JOIN_ROOM.getDto(), ...data}

        socket.emit(JOIN_ROOM.id, data)

        return () => {
            console.log("disconnect")
            socket.disconnect()
        }
    }, [id, props.userName])

    useEffect(() => {//todo: extract to socketEffects
            const {current: socket} = socketRef;
            socket.on(CHAT_ANNOUNCEMENT.id, (data) => {
                console.log("got a message:")
                console.info(data)
            })
            socket.on(CHAT_MESSAGE.id, (data) => {
                console.log(`${data.user.userName}: ${data.message}`)
                console.info(data)
            })
        }
        , [])


    function handleSubmit(event) {
        event.preventDefault()
        socketRef.current.emit(CHAT_REQUEST.id, CHAT_REQUEST.getDto(text))
        setText("")
    }

    const handleChange = (event) => setText(event.target.value);


    return <>
        <h1> Game {id} </h1>
        <Form onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Label>Label</Form.Label>
                <Form.Control type="text" placeholder="Enter your message" onChange={handleChange}
                              value={text}/>
                <Form.Text className="text-muted">
                    Some hint that might be important
                </Form.Text>
            </Form.Group>
            <Button type="submit">Post</Button>
        </Form>
    </>;
}

function GameSelection() {

    let {path, url} = useRouteMatch();

    return <>
        <Route path={`${path}/:id`}>
            <Game userName="usernameplaceholder"/>
        </Route>
        <Route exact path={path}>
            Start a new game
        </Route>
        <div dangerouslySetInnerHTML={{ __html: `<!-- ${url} -->` }}/>
    </>

}

export default GameSelection
