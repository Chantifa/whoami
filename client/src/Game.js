import {useParams} from "react-router-dom/cjs/react-router-dom";
import {useEffect, useState} from "react";
import useServer from "./serverConnection";
import {Button, Form} from "react-bootstrap";
import * as PropTypes from "prop-types";

function Message(props) {
    return <li key={props.key}> {JSON.stringify(props.data)}</li>
}

function Chat(props) {
    return <ol>
    {props.messages.map((data, key) => <Message key={key} data={data}/>)}
    </ol>
}

export default function Game(props) {

    const {id} = useParams();

    const [text, setText] = useState("Hello");
    const handleChange = (event) => setText(event.target.value);

    const {sendMessage, messageList, gameInfo, gameState} = useServer(props.userName, id)


    function handleSubmit(event) {
        event.preventDefault()

        sendMessage(text)
        setText("")
    }



    return <>
        <h1> Game {id} </h1>
        <Chat messages={messageList} />
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