import React, {useContext, useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import useServer from "../serverConnection";
import Chat from "./Chat";
import GameInfo from "./GameInfo";
import { ReactReduxContext } from 'react-redux';
import {
    Button,
    Container,
    Row,
    Col
} from "reactstrap";
import {Form} from "react-bootstrap";
import GamePhase from "../common/GamePhase.mjs";

export default function Game(props) {

    const {id} = useParams();
    const [chatText, setChatChatText] = useState("Hello");
    const [question, setQuestion] = useState("Who am I?")
    const {store} = useContext(ReactReduxContext);

    let pageHeader = React.createRef();

    const handleChatTextChange = (event) => setChatChatText(event.target.value);
    const handleQuestionChange = (event) => setQuestion(event.target.value);

    const {
        sendMessage,
        messageList,
        gameInfo,
        gameState,
        sendVote,
        sendQuestion,
        startGame
    } = useServer(props.user, id)

    function handleChatSubmit(event) {
        event.preventDefault()
        sendMessage(chatText)
        setChatChatText("")
    }

    function handleQuestionSubmit(event) {
        event.preventDefault()
        sendQuestion(question)
        setQuestion("")
    }

    console.log(gameState.currentUser.userId)
    console.log(store.getState().authentication.user.message._id)

    return <>
        <div
            style={{
                backgroundImage:
                    "url(" + require("../assets/img/galaxy.jpg").default + ")",
            }}
            className="page-header page-header-xs"
            data-parallax={true}
            ref={pageHeader}
        >
            <div className="filter"/>
        </div>
        <div className="section profile-content">
            <Container>
                <div className="owner">
                    <div className="avatar">
                        <img
                            alt="Logo in a circle image"
                            className="img-circle img-no-padding img-responsive"
                            src={require("../assets/img/mobile.png").default}
                            border={"1px solid black"}
                        />
                    </div>
                    <div className="name">
                        <h4 className="title">Game {id}<br/>
                        </h4>
                    </div>
                </div>
            </Container>
            </div>
        <Container fluid>
            <Row>
                <Col className="square border border-1 border-dark rounded-3 ms-xl-5 p-3">
                    <GameInfo info={gameInfo} state={gameState}/>

                    <Button outline className="btn-round ml-1 btn btn-outline-success"
                            disabled={gameState.currentUser.userId === store.getState().authentication.user.message._id}
                            data-toggle="tooltip"
                            title="Select this button when the person has been found out."
                            onClick={sendVote.bind(null, true)}> Yeap!
                        <i className="fa fa-heart mr-1"/>
                    </Button>
                    <Button className="btn-round ml-1 btn btn-outline-danger ms-lg-2"
                            disabled={gameState.currentUser.userId === store.getState().authentication.user.message._id}
                            data-toggle="tooltip"
                            title="Select this button when the person has NOT been found out."
                            onClick={sendVote.bind(null, false)}> Nope!
                        <i className="nc-icon nc-simple-remove mr-1"/>
                    </Button>
                    <Button className="btn-round ml-1 btn btn-outline-primary ms-lg-2"
                            disabled={gameState ? !!GamePhase.INITIAL.phase : false}
                            data-toggle="tooltip"
                            title="Select this button to start a game."
                            onClick={startGame}> start
                        <i className="nc-icon nc-button-play mr-1"/>
                    </Button>

                    <Form className="contact-form" onSubmit={handleQuestionSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Enter your question"
                                          onChange={handleQuestionChange}
                                          value={question}/>

                            <Form.Text className="text-muted">
                                Your question will be queued until it's your turn
                            </Form.Text>
                        </Form.Group>
                        <Button className="btn-round btn-warning text-black" type="submit">Ask Question</Button>
                        <div className="margin-top"/>
                    </Form>
                </Col>
                <Col className="p-5 ms-xl-1">
                    <Chat messages={messageList}/>
                    <Form onSubmit={handleChatSubmit}>
                        <Form.Group>
                            <Form.Control required type="text" placeholder="Enter your message"
                                          onChange={handleChatTextChange}
                                          value={chatText}/>
                            <Form.Text className="text-muted">
                                You should not ask questions here, this is only the chat
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit">Send Message</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>;
}