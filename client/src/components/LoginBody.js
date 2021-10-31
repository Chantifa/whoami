import React, {useState, useContext} from 'react';
import { appContext } from "../appContext";
import LoginForm from './Login';
import Profile from './Profile';

const LoginBody = () => {

    const myContext = useContext(appContext);
    const [error, setError] = useState("");

    // create LoginBody request, setStates with received data
    function login(data){
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // send a request with credentials included on same-origin and cross-origin calls
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => {
                setError(json.error)
                if(json.error === null) {
                    myContext.setLoggedin(true);
                    // myContext.setRegistered(null);
                }
            })
            .catch(err => console.log(err));
    }


    // if user.email state is not empty show text and logout, else show login form
    return (
            <div className="App">
                {(myContext.loggedin === true) ? (
                    <div className = "loginsuccess">
                        <Profile />
                    </div>
                ) : (
                    <>
                        <LoginForm login={login} error={error} />
                    </>
                )}
            </div>
    );
};

export default LoginBody;
