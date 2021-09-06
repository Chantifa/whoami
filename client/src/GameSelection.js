import {Route} from "react-router-dom";
import {useParams, useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import { io } from "socket.io-client";
import {Button} from "react-bootstrap";
function Game() {

    const {id} = useParams();
    const socket = io.connect("/");

    function post(){
        socket.emit("joinRoom", {username: "usernameplaceholder", roomname: "roomnameplaceholder"})
    }



    return <>
    <h1> Game {id} </h1>
        <Button onClick={post}>Join</Button>
    </>;
}

function GameSelection() {

    let { path, url } = useRouteMatch();

    return <>
        <Route path={`${path}/:id`}>
            <Game/>
        </Route>
        <Route exact path={path}>
            Start a new game
        </Route>

    </>

}
    export default GameSelection
