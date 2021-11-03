import {Route} from "react-router-dom";
import {useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import React, { useEffect } from 'react';
import { userActions } from '../_actions';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import { useDispatch, useSelector } from 'react-redux';

function GameSelection() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    let {path, url} = useRouteMatch();

    return (
        <>
            <Route exact path={path}>
                <ListGroup>
                    <LinkContainer to={url + "/7"}><ListGroupItem> 7</ListGroupItem></LinkContainer>
                    <LinkContainer to={url + "/6"}><ListGroupItem> 6</ListGroupItem></LinkContainer>
                    <LinkContainer to={url + "/5"}><ListGroupItem> 5</ListGroupItem></LinkContainer>
                    <LinkContainer to={url + "/4"}><ListGroupItem> 4</ListGroupItem></LinkContainer>
                </ListGroup>
            </Route>
        </>
        )
}

export { GameSelection };

