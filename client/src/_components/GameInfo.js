import GamePhase from "../common/GamePhase.mjs";
import {Container, Row, Col, Card} from "reactstrap";


export default function GameInfo(props) {
    if (!props.info || !props.info.personaMapInPlayOrder || !props.state) {
        return null
    }
    const people = [...props.info.personaMapInPlayOrder]


    function PersonaMapTableBody(innerProps) {
        const user = innerProps.value[0]
        const alias = innerProps.value[1] || "That's you"
        const isOnTurn = props.state.currentUser.userId === user.userId
        const calculatedClassNames = isOnTurn ? "table-info" : ""

        let playInfo
        const waitingForAQuestion = props.state.phase === GamePhase.WAITING_QUESTION.phase
        const voteMap = new Map(props.state.votes)

        if (!props.state.votes || !props.state.phase) {
            playInfo = null
        } else if (isOnTurn) {
            if (waitingForAQuestion) {
                playInfo = "thinking of a question"
            } else {
                playInfo = props.state.currentQuestion
            }
        } else if (waitingForAQuestion) {
            playInfo = "waiting for a question"
        } else if (!voteMap.has(user.userId)) {
            playInfo = "voting.."
        } else {
            playInfo = voteMap.get(user.userId) ? "yeap" : "nooop"
        }

        return <div className={calculatedClassNames}>
            <Col>
                <div className="card-big-shadow">
                    <Card className="card card-just-text text-center" data-background="color" data-color="yellow"
                          data-radius="none">
                        <br/>
                        <h6>{user.userName}</h6>
                        <h4>{alias}</h4>
                        <br/>
                        {props.state ? <p>{playInfo}</p> : null}
                    </Card>
                </div>

            </Col>
        </div>
    }

    return <Container>
        {props.state ? <div>Game info</div> : null}
        <br/>
        <div className="row-cols-lg-4 d-flex justify-content-around">
            {people.map((value, key) => <PersonaMapTableBody key={key} value={value}/>)}
        </div>
        <br/>

    </Container>
}