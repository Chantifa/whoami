import {Route} from "react-router-dom";
import {useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import {useContext, useEffect, useState} from 'react';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Game from "./Game";
import {ReactReduxContext} from "react-redux";

export default function GameSelection() {

    const [user, setUser] = useState("")
    const {store} = useContext(ReactReduxContext);

    useEffect(() => {
        setUser(store.getState().authentication.user.message.name)

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
