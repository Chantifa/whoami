import React, {useState, useContext} from 'react';
import { AppContext } from "./Context";
import '../App.css';
import RegisterForm from './RegisterForm';

import Login from './Login';

// create hook
const RegisterBody = () => {
    // access "global" state object by useContext
    const myContext = useContext(AppContext);

    // create states (email not necessary probably)
    const [error, setError] = useState("");

    // create Register request, setStates with received data
    const Register = (data) => {
        fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => {
                setError(json.error)
                if(json.error === null) {myContext.setRegistered(json.data.name) }
                console.log(json)
            })
            .catch(err => console.log(err));
    }

    // if user.email state is not empty show text and logout, else show login form
    return (
            <div className="App">
                {(myContext.registered !== null) ? (
                    <>
                        <div className = "registersuccess">
                            <p className="form-success">You have been successfully registered, <span className="form-success2">{myContext.registered}</span></p>
                        </div>
                        <Login />
                    </>
                ) : (
                    <RegisterForm Register={Register} error={error} />
                )}
            </div>
    );
};
