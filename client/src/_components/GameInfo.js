import {Col, Row, Table} from "react-bootstrap";


export default function GameInfo(props) {
    console.log(props)
    if (!props.info || !props.info.personaMapInPlayOrder) {
        return null
    }
    const people = [...props.info.personaMapInPlayOrder]

    function PersonaMapTableBody(innerProps) {
        console.log(innerProps)
        const user = innerProps.value[0]
        const alias = innerProps.value[1]
        const isOnTurn = (props.state && props.state.currentUser.userId === user.userId)
        const calculatedClassNames = isOnTurn ? "table-info" : ""
        const voteInfo = "not yet done"

        return <tr className={calculatedClassNames}>
            <td>{user.userName}</td>
            <td>{alias}</td>
            {props.state ? <td>{voteInfo}</td> : null}
        < /tr>;
    }

    return <Row className="justify-content-md-center">
        <Col md="auto">

            <Table bordered hover size="sm">

                <thead>
                <tr>
                    <th>User</th>
                    <th>Persona</th>
                    {props.state ? <th>Vote info</th> : null}
                </tr>
                </thead>
                <tbody>
                {people.map((value, key) => <PersonaMapTableBody key={key} value={value}/> )}

                </tbody>
            </Table>
        </Col>
    </Row>

}