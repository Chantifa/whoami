import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from "../img/logo.png";
import React from "react";

export default function Header() {

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/"><img src={logo} alt="logo" width="150" height="55"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"> {/**fixme double nav  **/}
                        <Nav.Link as={Link} to="/rules">Rules</Nav.Link>
                        <Nav.Link as={Link} to="/game">GameSelection</Nav.Link>
                        <Nav.Link as={Link} to="/game/7">specific Game</Nav.Link>
                        <Nav.Link className="ml-auto" as={Link} to="/login">login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
