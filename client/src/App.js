import {appContext} from './appContext';
import React, {useEffect, useState} from 'react';

import Home from "./components/Home";
import Rules from "./components/Rules";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import GameSelection from "./components/GameSelection";
import RegisterForm from "./components/RegisterForm";
import PrivateRoute from "./components/PrivateRoute";
import LoginBody from "./components/LoginBody";
import ExamplesNavbar from "./components/ExampleNavbar";

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
                        <ExamplesNavbar/>
                            <Switch>
                                <Route path="/rules"><Rules/></Route>
                                <Route path="/login"><LoginBody/></Route>
                                <Route path="/register"><RegisterForm/></Route>
                                <PrivateRoute path="/game"><GameSelection/></PrivateRoute>
                                <Route path="/"><Home/></Route>
                            </Switch>
                        <Footer/>
                    </appContext.Provider>
                </Router>
    );

}
export default App;
