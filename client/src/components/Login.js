import React, {useState, useContext} from 'react';
import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import { AppContext } from "./Context";
import Profile from "./Profile";

export default function Login(){

    const myContext = useContext(AppContext);
    const [error, setError] = useState("");

    const LoginPost = (data) => {
        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => {
                setError(json.error)
                if(json.error === null) {
                    myContext.setLoggedin(true);
                    //myContext.setRegistered(null);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <Container>
            <Switch>
                    <header className="App-header">
                        <div className="App">
                            {myContext.loggedIn === true}
                            <div className="loginsuccess">
                            <Profile/>
                            </div>
                        </div>
                    </header>
            </Switch>
        </Container>
    )
}