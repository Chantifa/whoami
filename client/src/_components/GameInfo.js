import {Col, Row, Table} from "react-bootstrap";


export default function GameInfo(props) {
    if (!props.info || !props.info.personaMapInPlayOrder) {
        return null
    }
    const people = [...props.info.personaMapInPlayOrder]

    function PersonaMapTableBody(innerProps) {
        const user = innerProps.value[0]
        const alias = innerProps.value[1]
        const isOnTurn = (props.state && props.state.currentUser.userId === user.userId)
        const calculatedClassNames = isOnTurn ? "table-info" : ""

        let playInfo
        if (!props.state || !props.state.votes) {
            playInfo = null
        } else if (isOnTurn) {
            playInfo = props.state.currentQuestion ? props.state.currentQuestion : "thinking of a question"
        } else if (!props.state.currentQuestion) {
            playInfo = "waiting for a question"
        } else if (props.state.votes.length === 0) {
            playInfo = "voting.."
        } else {
            playInfo = new Map(props.state.votes).get(user.userId) ? "yeap" : "nooop"
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