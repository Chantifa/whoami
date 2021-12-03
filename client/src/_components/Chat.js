import ChatMessage from "./ChatMessage";
import {Card, CardBody, CardTitle} from "reactstrap";

export default function Chat(props) {
    /**
     * This function is used to display a Chat
     *
     * @component
     * @param props - React element describing what should appear on the screen
     * @return Chat component
     */

    return <Card
        color={"dark"}>

        <CardBody className={"overflow-auto"} style={{maxHeight: 40 + 'vh'}}> {/* fixme size should  */}
            <CardTitle>Chat</CardTitle>
            {props.messages.map((data, key) => <ChatMessage key={key} data={data}/>)}
        </CardBody>

    </Card>

}