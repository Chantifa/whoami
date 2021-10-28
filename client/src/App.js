import {appContext} from './appContext';
import './App.css';
import React, {useEffect, useState} from 'react';

import Header from './components/Header'
import Home from "./components/Home";
import Rules from "./components/Rules";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import GameSelection from "./components/GameSelection";
import {Container} from "react-bootstrap";
import RegisterForm from "./components/RegisterForm";
import PrivateRoute from "./components/PrivateRoute";
import LoginBody from "./components/LoginBody";

function App() {

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

    return (
        <Router>
            <appContext.Provider value={information}>
                <Header/>
                <Container >
                    <Switch>
                        <Route path="/rules"><Rules/></Route>
                        <Route path="/login"><LoginBody/></Route>
                        <Route path="/register"><RegisterForm/></Route>
                        <PrivateRoute path="/game"><GameSelection/></PrivateRoute>
                        <Route path="/"><Home/></Route>
                    </Switch>
                </Container>
                <Footer/>
            </appContext.Provider>
        </Router>
    );

}
export default App;
