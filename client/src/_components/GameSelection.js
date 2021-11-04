import {Route} from "react-router-dom";
import {useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import {useEffect, useState} from 'react';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Game from "./Game";

export default function GameSelection() {

    const [user, setUser] = useState("")
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")).message.name) //fixme

    }, [])

    let {path, url} = useRouteMatch();

    return (
        <>
            <Route path={`${path}/:id`}>
                <Game userName={user}/></Route>
            <Route exact path={path}>
                <ListGroup>
                    {/*todo get this list from fetch call*/}
                    <LinkContainer to={url + "/7"}><ListGroupItem> 7</ListGroupItem></LinkContainer>
                    <LinkContainer to={url + "/6"}><ListGroupItem> 6</ListGroupItem></LinkContainer>
                    <LinkContainer to={url + "/5"}><ListGroupItem> 5</ListGroupItem></LinkContainer>
                    <LinkContainer to={url + "/4"}><ListGroupItem> 4</ListGroupItem></LinkContainer>
                </ListGroup>
            </Route>
        </>
    )
}
