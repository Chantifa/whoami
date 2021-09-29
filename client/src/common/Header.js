import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from "../img/logo.png";
import GameSelection from "../GameSelection";
import Rules from "./Rules";
import Home from "./Home";
import React from "react";

function Header() {

    return (
        <Router>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/"><img src={logo} alt="logo" width="150" height="55"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/rules">Rules</Nav.Link>
                            <Nav.Link as={Link} to="/game">GameSelection</Nav.Link>
                            <Nav.Link as={Link} to="/game/7">specific Game</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Switch>
                    <Route path="/no"><Home/></Route>
                    <Route path="/rules"><Rules/></Route>
                    <Route path="/game"><GameSelection/></Route>
                </Switch>
            </Container>
        </Router>

    );
}

export default Header;
