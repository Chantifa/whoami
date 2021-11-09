import ChatMessage from "./ChatMessage";
import {Card} from "react-bootstrap";

export default function Chat(props) {

    return <Card
        bg={"dark"}>

        <Card.Body className={"overflow-auto"} style={{maxHeight: 40 + 'vh'}}> {/* fixme size should  */}
            <Card.Title>Chat</Card.Title>
            {props.messages.map((data, key) => <ChatMessage key={key} data={data}/>)}
        </Card.Body>

    </Card>

}