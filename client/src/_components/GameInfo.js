import {Col, Row, Table} from "react-bootstrap";


export default function GameInfo(props) {
    if (!props.data || !props.data.personaMapInPlayOrder) {
        return ""
    }

    function PersonaMapTableBody(props) {
        
        return <tr>
            <td>{props.value[0].userName}</td>
            <td>{props.value[1]}</td>
        < /tr>;
    }

    return <Row className="justify-content-md-center">
        <Col md="auto">

            <Table striped bordered hover size="sm">

                <thead>
                <tr>
                    <th>User</th>
                    <th>Persona</th>
                </tr>
                </thead>
                <tbody>
                {props.data.personaMapInPlayOrder.map((value, key) => <PersonaMapTableBody key={key} value={value}/> )}

                </tbody>
            </Table>
        </Col>
    </Row>

}