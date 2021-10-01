import {Container} from "react-bootstrap";
import {Switch} from "react-router-dom";
import React from "react";

export default function Footer(){
    return (
        <Container>
            <Switch>
                <footer className="footer">
                    <p>&#169; FFHS Schweiz - Ramona Koksa | Yves Bastian Pellaton</p>
                </footer>
            </Switch>
        </Container>
    )
}