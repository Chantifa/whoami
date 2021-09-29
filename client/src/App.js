import { AppContext } from './common/Context';
import './App.css';
import React, {useEffect, useState, useContext, createContext} from 'react';

import Header from './common/Header'
import Home from "./common/Home";
import Rules from "./common/Rules";

import {BrowserRouter as Router, Route} from "react-router-dom";

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
                    <Route path='/' component={Home} />
                    <Route path='/rules' component={Rules}/>
                </AppContext.Provider>
            </div>
        </Router>
    )

}
export default App;
