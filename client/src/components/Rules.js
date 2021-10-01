import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import React from "react";
import '../App.css';

export default function Rules() {

    return (
        <Container>
            <Switch>
                    <header className="App-header">
                        <h1>Rules</h1>
                        <p>Lorem ipsum ...</p>
                    </header>
            </Switch>
        </Container>
    )
}
