import logo from './img/logo.png';
import './App.css';
import React, {useEffect, useState} from 'react';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import GameSelection from "./GameSelection";


function App() {

    const [state, setState] = useState("noene")
    const [show, setShow] = useState(false)


    useEffect(() => {
        fetch("/express_get_test")
            .then(r => r.json())
            .then(data => {
                setState(data.express)
                setShow(true)
            })
            .catch(e => console.error(e))

    }, [])


    return (
        <Router>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/"> React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/no">Link</Nav.Link>
                            <Nav.Link as={Link} to="/game">GameSelecition</Nav.Link>
                            <Nav.Link as={Link} to="/game/7">specific Game</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Container>
                <Switch>
                    {/*TODO: add auth like https://reactrouter.com/web/example/auth-workflow*/}
                    <Route path="/no">
                        <p> nothin ghere</p>
                    </Route>
                    <Route path="/game"><GameSelection/></Route>
                    <Route path="/">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <p>
                                Edit <code>src/App.js</code> and save to reload.
                            </p>
                            {show ? <h2> Loook {state}</h2> : <p>None yet</p>}
                        </header>
                    </Route>
                </Switch>
            </Container>
        </Router>

    );
}

export default App;
