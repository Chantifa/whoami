import {Route} from "react-router-dom";
import {useParams, useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import {Button, Form} from "react-bootstrap";
import React, { useState} from "react";
import useServer from "./serverConnection";

function Game(props) {

    const {id} = useParams();

    const [text, setText] = useState("Hello");

    const {sendMessage, messageList} = useServer(props.userName, id)

    function handleSubmit(event) {
        event.preventDefault()
        sendMessage(text)
        setText("")
    }

    const handleChange = (event) => setText(event.target.value);


    return <>
        <h1> Game {id} </h1>
        <Form onSubmit={handleSubmit}>
            <ol>
                {messageList.map((data, index) => <li key={index}>{JSON.stringify(data)}</li>)}
            </ol>

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

export default GameSelection;
