import {Container} from "react-bootstrap";
import '../App.css';
import {Route, Switch} from "react-router-dom";
import logowhite from "../img/logo_white.svg";
import React from "react";


function Home(){
    return (
        <Container>
            <Switch>
                <Route path="/">
                    <header className="App-header">
                        <img src={logowhite} className="fade-in-image" alt="logo"/>
                        <button className="button-register" type='button'>Register here</button>
                    </header>
                </Route>
            </Switch>
        </Container>
    )
}

export default Home;