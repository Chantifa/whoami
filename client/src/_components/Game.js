import {useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import useServer from "../serverConnection";
import {Button, Col, Form, Row} from "react-bootstrap";
import Chat from "./Chat";
import GameInfo from "./GameInfo";

export default function Game(props) {

    const {id} = useParams();
    const [chatText, setChatChatText] = useState("Hello");
    const [question, setQuestion] = useState("Who am I?")

    const handleChatTextChange = (event) => setChatChatText(event.target.value);
    const handleQuestionChange = (event) => setQuestion(event.target.value);

    const {sendMessage, messageList, gameInfo, gameState, sendVote, sendQuestion, startGame } = useServer(props.userName, id)



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


    return <>
        <main className="container grid" style={{paddingTop: 110 + 'px'}}>
            <Row>
                <h1> Game {id} </h1>
            </Row>

            <code>{JSON.stringify(gameState)}</code>

            <Row>

                <Col>

                    <GameInfo info={gameInfo} state={gameState}/>

                    <Button className="btn-outline-success" onClick={sendVote.bind(null, true)}> Yeap! </Button>
                    <Button className="btn-outline-danger" onClick={sendVote.bind(null, false)}> Nope! </Button>
                    <Button onClick={startGame}> start </Button>

                    <Form onSubmit={handleQuestionSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Enter your question" onChange={handleQuestionChange}
                                          value={question}/>
                            <Form.Text className="text-muted">
                                Your question will be queued until it's your turn
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit">Ask Question</Button>
                    </Form>

                </Col>
                <Col>
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
        </main>
    </>;
}