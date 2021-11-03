import {Col, Row, Table} from "react-bootstrap";

export default function GameInfo(props) {
    if (!props.data || !props.data.personaMapInPlayOrder) {
        return ""
    }

    //todo replace id's with names

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
                {props.data.personaMapInPlayOrder.map((value, key) => <tr key={key}>
                    <td>{value[0]}</td>
                    <td>{value[1]}</td>
                < /tr>)}

                </tbody>
            </Table>
        </Col>
    </Row>

}