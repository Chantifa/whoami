import {useParams} from "react-router-dom/cjs/react-router-dom";
import {useState} from "react";
import useServer from "../serverConnection";
import {Button, Form} from "react-bootstrap";
import Chat from "./Chat";

export default function Game(props) {

    const {id} = useParams();

    const [text, setText] = useState("Hello");
    const handleChange = (event) => setText(event.target.value);

    const {sendMessage, messageList, gameInfo, gameState, sendVote, sendQuestion, startGame } = useServer(props.userName, id)


    function handleSubmit(event) {
        event.preventDefault()

        sendMessage(text)
        setText("")
    }

    function test1() {
        sendVote(true)
    }

    function test2() {
        sendQuestion("who am I")
    }
    function test3() {
        startGame()
    }


    return <>
        <h1> Game {id} </h1>
        {/*Left side*/}
        <p>{JSON.stringify(gameInfo)}</p>
        <p>{JSON.stringify(gameState)}</p>
        <Button onClick={test1}> vote </Button>
        <Button onClick={test2}> question </Button>
        <Button onClick={test3}> start </Button>
        {/*Right side*/}
        <Chat messages={messageList}/>
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