import {Alert} from "react-bootstrap";

export default function ChatMessage(props) {
    return <Alert variant="dark" className="d-flex justify-content-between"> <p>{props.data.message}</p>
        {props.data.user && <p><em className="small font-weight-bold">{props.data.user.userName}</em> </p>}
    </Alert>
}