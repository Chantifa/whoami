import { Route} from "react-router-dom";
import {useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import {useEffect, useState} from 'react';
import Game from "./Game";
import {ListGroup, ListGroupItem, NavLink} from "reactstrap";

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
                    <ListGroupItem><NavLink href={url + "/7"} > 7</NavLink> </ListGroupItem>
                    <ListGroupItem><NavLink href={url + "/6"} > 6</NavLink> </ListGroupItem>
                    <ListGroupItem><NavLink href={url + "/5"} > 5</NavLink> </ListGroupItem>
                    <ListGroupItem><NavLink href={url + "/4"} > 4</NavLink> </ListGroupItem>
                    <ListGroupItem><NavLink href={url + "/3"} > 3</NavLink> </ListGroupItem>
                    <ListGroupItem><NavLink href={url + "/2"} > 2</NavLink> </ListGroupItem>
                </ListGroup>
            </Route>
        </>
    )
}
