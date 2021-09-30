import { AppContext } from './components/Context';
import './App.css';
import React, {useEffect, useState} from 'react';

import Header from './components/Header'
import Home from "./components/Home";
import Rules from "./components/Rules";
import GameSelection from "./GameSelection";
import Footer from "./components/Footer";
import Login from "./components/Login"

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container} from "react-bootstrap";

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
                            <Route path="/register"><Login/></Route>
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
