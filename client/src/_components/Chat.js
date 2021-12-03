import ChatMessage from "./ChatMessage";
import {Card, CardBody, CardTitle} from "reactstrap";

/**
 * This function is used to display a Chat
 *
 * @component
 * @param props - React element describing what should appear on the screen
 * @returns {JSX.Element}
 */
export default function Chat(props) {

    return <Card
        color={"dark"}>

        <CardBody className={"overflow-auto"} style={{maxHeight: 40 + 'vh'}}>
            <CardTitle>Chat</CardTitle>
            {props.messages.map((data, key) => <ChatMessage key={key} data={data}/>)}
        </CardBody>

    </Card>

}