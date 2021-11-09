import {Col, Row, Table} from "react-bootstrap";
import GamePhase from "../common/GamePhase.mjs";


export default function GameInfo(props) {
    if (!props.info || !props.info.personaMapInPlayOrder || !props.state) {
        return null
    }
    const people = [...props.info.personaMapInPlayOrder]

    function PersonaMapTableBody(innerProps) {
        const user = innerProps.value[0]
        const alias = innerProps.value[1] || "That's you"
        const isOnTurn =  props.state.currentUser.userId === user.userId
        const calculatedClassNames = isOnTurn ? "table-info" : ""

        let playInfo
        const waitingForAQuestion = props.state.phase === GamePhase.WAITING_QUESTION.phase
        const voteMap = new Map(props.state.votes)
        if ( !props.state.votes || !props.state.phase) {
            playInfo = null
        } else if (isOnTurn) {
            if(waitingForAQuestion){
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

        return <tr className={calculatedClassNames}>
            <td>{user.userName}</td>
            <td>{alias}</td>
            {props.state ? <td>{playInfo}</td> : null}
        < /tr>;
    }

    return <Row className="justify-content-md-center">
        <Col md="auto">

            <Table bordered hover size="sm">

                <thead>
                <tr>
                    <th>User</th>
                    <th>Persona</th>
                    {props.state ? <th>Play info</th> : null}
                </tr>
                </thead>
                <tbody>
                {people.map((value, key) => <PersonaMapTableBody key={key} value={value}/>)}

                </tbody>
            </Table>
        </Col>
    </Row>

}