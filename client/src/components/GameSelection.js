import {Route} from "react-router-dom";
import {useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import Game from "./Game";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"

export default function GameSelection() {

    let {path, url} = useRouteMatch();

    return <>
        <Route path={`${path}/:id`}>
            <Game userName="usernameplaceholder"/>
        </Route>
        <Route exact path={path}>
            <ListGroup>
                <LinkContainer to={url + "/7"}><ListGroupItem> 7</ListGroupItem></LinkContainer>
                <LinkContainer to={url + "/6"}><ListGroupItem> 6</ListGroupItem></LinkContainer>
                <LinkContainer to={url + "/5"}><ListGroupItem> 5</ListGroupItem></LinkContainer>
                <LinkContainer to={url + "/4"}><ListGroupItem> 4</ListGroupItem></LinkContainer>
            </ListGroup>
        </Route>
    </>

}