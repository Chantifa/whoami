export default function ChatMessage(props) {
    return <li> {JSON.stringify(props.data)}</li>
}