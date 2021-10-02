import { AppContext } from './components/Context';
import './App.css';
import React, {useEffect, useState} from 'react';

import Header from './components/Header'
import Home from "./components/Home";
import Rules from "./components/Rules";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import GameSelection from "./components/GameSelection";
import {Container} from "react-bootstrap";
import Register from "./components/Register";
import RegisterForm from "./components/RegisterForm";

function App() {

    const [state, setState] = useState("noene")
    const [show, setShow] = useState(false)
    const [loggedin, setLoggedin] = useState(false);
    const [registered, setRegistered] = useState(null);
    const [user, setUser] = useState(null);
    const information = {
        // create object to hold global vars and methods
        user: user,
        setUser,
        loggedin: loggedin,
        setLoggedin,
        registered: registered,
        setRegistered,
    };

    useEffect(() => {
            fetch("/express_get_test")
                .then(r => r.json())
                .then(data => {
                    setState(data.express)
                    setShow(true)
                })
                .catch(e => console.error(e))

        }
        ,
        []
    )

    return (
        <Router>
            <div>
                <AppContext.Provider value={information}>
                    <Header/>
                    <Container>
                        <Switch>
                            <Route path="/rules"><Rules/></Route>
                            <Route path="/login"><LoginForm/></Route>
                            <Route path="/register"><RegisterForm/></Route>
                            <Route path="/game"><GameSelection/></Route>
                            <Route path="/"><Home/></Route>
                        </Switch>
                        <Footer/>
                    </Container>
                </AppContext.Provider>
            </div>
        </Router>
    );

}
export default App;
