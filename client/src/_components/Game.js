import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import useServer from "../serverConnection";
import Chat from "./Chat";
import GameInfo from "./GameInfo";
import {ReactReduxContext} from 'react-redux';
import GamePhase from "../common/GamePhase.mjs";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    FormText,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import PopupAlert from "./PopupAlert";
import UserStatsBadge from "./UserStatsBadge";

export default function Game(props) {
    /**
     * This component is used to return the whole game main section with chat
     *
     * @component
     * @param props - React element describing what should appear on the screen
     * @return Game component
     */

    const {id} = useParams();
    const [chatText, setChatChatText] = useState("Hello");
    const [question, setQuestion] = useState("Who am I?")
    const [thrownError, setThrownError] = useState(null)
    const [showGameEndDialog, setShowGameEndDialog] = useState(false)
    const {store} = useContext(ReactReduxContext);


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
    } = useServer(props.userName, id, setThrownError)

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

    const ownUserId = store.getState().authentication.user.message._id //fixme
    const players = Array.from(gameInfo?.personaMapInPlayOrder?.keys() || [])
    const playing = players.some(player => player.userId === ownUserId)
    const isOnTurn = gameState?.currentUser?.userId === ownUserId
    const startable = gameState === null || [GamePhase.INITIAL.phase, GamePhase.FINISHED.phase].includes(gameState.phase)
    const votable = playing
        && gameState?.phase === GamePhase.WAITING_VOTE.phase
        && !isOnTurn
    const won = gameState?.phase === GamePhase.FINISHED.phase
        && isOnTurn

    useEffect(()=> {
        let gameState;
        let playing;

        if(gameState?.phase === GamePhase.FINISHED.phase && playing && gameState.currentUser) {
            setShowGameEndDialog(true)
            console.log(gameState)
        }
    }, [gameState?.phase])

    return <>
        <PopupAlert state={{thrownError, setThrownError}}/>
        <Modal isOpen={showGameEndDialog}>
            <ModalHeader>{won ? "You Won!" : "You lost"}</ModalHeader>
            <ModalBody>
                Your current stats: <UserStatsBadge/>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={setShowGameEndDialog.bind(null, false)}
                >
                    {won ? "Yay.." : "Duh.."}
                </Button>
            </ModalFooter>
        </Modal>
        <div className="section profile-content">
            <Container>
                <div className="owner">
                    <div className="avatar">
                        <img
                            alt="Logo in a circle"
                            className="img-circle img-no-padding img-responsive"
                            src="/img/mobile.png"
                            border={"1px solid black"}
                        />
                    </div>
                    <div className="name">
                        <h1 className="h4">Game {id}</h1>
                    </div>
                </div>
            </Container>
        </div>
        <Container fluid>
            <Row>
                <Col className="square border border-1 border-dark rounded-3 ms-xl-5 p-3">
                    <GameInfo info={gameInfo} state={gameState}/>

                    <Button outline className="btn-round ml-1 btn btn-outline-success"
                            disabled={!votable}
                            data-toggle="tooltip"
                            title="Select this button when the person has been found out."
                            onClick={sendVote.bind(null, true)}> Yeap!
                        <i className="fa fa-heart mr-1"/>
                    </Button>
                    <Button className="btn-round ml-1 btn btn-outline-danger ms-lg-2"
                            disabled={!votable}
                            data-toggle="tooltip"
                            title="Select this button when the person has NOT been found out."
                            onClick={sendVote.bind(null, false)}> Nope!
                        <i className="nc-icon nc-simple-remove mr-1"/>
                    </Button>
                    <Button className="btn-round ml-1 btn btn-outline-primary ms-lg-2"
                            disabled={!startable}
                            data-toggle="tooltip"
                            title="Select this button to start a game."
                            onClick={startGame}> start
                        <i className="nc-icon nc-button-play mr-1"/>
                    </Button>
                    <Form className="contact-form" onSubmit={handleQuestionSubmit} disabled={playing}>
                        <FormGroup>
                            <Input required type="text" placeholder="Enter your question"
                                   onChange={handleQuestionChange}
                                   disabled={!playing || startable}
                                   value={question}/>

                            <FormText className="text-muted">
                                Your question will be queued until it's your turn
                            </FormText>
                        </FormGroup>
                        <Button className="btn-round btn-warning text-black" type="submit"
                                disabled={!playing || startable}>Ask Question</Button>
                        <div className="margin-top"/>
                    </Form>

                </Col>

                    <Col>

                    <Chat messages={messageList}/>

                    <Form onSubmit={handleChatSubmit}>
                        <FormGroup>
                            <Input required type="text" placeholder="Enter your message"
                                   onChange={handleChatTextChange}
                                   value={chatText}/>
                            <FormText className="text-muted">
                                You should not ask questions here, this is only the chat
                            </FormText>
                        </FormGroup>
                        <Button type="submit">Send Message</Button>
                    </Form>

                </Col>
            </Row>
        </Container>
    </>;
}