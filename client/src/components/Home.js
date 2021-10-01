import {Container} from "react-bootstrap";
import '../App.css';
import {Route, Switch} from "react-router-dom";
import logowhite from "../img/logo_white.svg";
import React from "react";
import {Button} from "react-bootstrap";


export default function Home(){
    return (
        <Container>
            <Switch>
                    <header className="App-header">
                        <img src={logowhite} className="fade-in-image" alt="logo"/>
                        <Button className="btn-register" type="submit">Register here</Button>
                    </header>
            </Switch>
        </Container>
    )
}