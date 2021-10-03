import {Container} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import '../App.css';
import logowhite from "../img/logo_white.svg";
import React from "react";
import {Button} from "react-bootstrap";


export default function Home() {

    const history = useHistory();

    const routeChange = () => {
        let path = '/login';
        history.push(path);
    }

    return (
        <Container>
            <header className="App-header">
                <img src={logowhite} className="fade-in-image" alt="logo"/>
                <Button className="btn-register" onClick={routeChange} type="submit">Login</Button>
            </header>
        </Container>
    )
}