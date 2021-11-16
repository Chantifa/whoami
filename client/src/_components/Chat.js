import ChatMessage from "./ChatMessage";
import {Card, CardBody, CardTitle} from "reactstrap";

export default function Chat(props) {

    return <Card
        bg={"dark"}>

        <CardBody className={"overflow-auto"} style={{maxHeight: 40 + 'vh'}}> {/* fixme size should  */}
            <CardTitle>Chat</CardTitle>
            {props.messages.map((data, key) => <ChatMessage key={key} data={data}/>)}
        </CardBody>

    </Card>

}