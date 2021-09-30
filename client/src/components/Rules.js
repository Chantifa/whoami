import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import React from "react";
import '../App.css';

function Rules() {

    return (
        <Container>
            <Switch>
                <Route path="/rules">
                    <header className="App-header">
                        <h1>Rules</h1>
                        <p>Lorem ipsum ...</p>
                    </header>
                </Route>
            </Switch>
        </Container>
    )
}

export default Rules;