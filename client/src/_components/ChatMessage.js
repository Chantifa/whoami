import {Alert} from "reactstrap";

export default function ChatMessage(props) {
    /**
     * This function is used to send and get a ChatMessage
     *
     * @component
     * @param props - React element describing what should appear on the screen
     * @return ChatMessage component
     */
    return <Alert color="dark" className="d-flex justify-content-between"><p>{props.data.message}</p>
        {props.data.user && <p><em className="small font-weight-bold">{props.data.user.userName}</em></p>}
    </Alert>
}