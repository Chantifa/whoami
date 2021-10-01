import ChatMessage from "./ChatMessage";

export default function Chat(props) {
    return <ol>
        {props.messages.map((data, key) => <ChatMessage key={key} data={data}/>)}
    </ol>
}