import React, {useState, useContext} from 'react' // import hooks from React
import {AppContext} from "./Context"; // import Context component
import '../App.css';
import {Link, useHistory} from 'react-router-dom';
import {Container, Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import userimg from "../img/user.svg";
import logowhite from "../img/logo_white.svg";

function LoginForm({Login, error}) {
    // access "global" state object by useContext
    const myContext = useContext(AppContext);

    // create state for details
    const [details, setDetails] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    // create function for handling submits
    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    const routeChange = () => {
        let path = '/game';
        history.push(path);
    }

    const routeChangeRegister = () => {
        let path = '/register';
        history.push(path);
    }

    return (
        <Container className="App-container" onSubmit={submitHandler}>
            <img src={userimg} className="fade-in-image" alt="logo"/>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="input" placeholder="Enter username"/>
                    <Form.Text className="text-muted">
                        yo, it doesn't has to be your e-mail address!
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button className="btn-register" onClick={routeChange}>Login</Button>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Not registered yet? Don't worry..</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button className="btn-register" onClick={routeChangeRegister}>Register here</Button>
                </Form.Group>

            </Form>

        </Container>

    )
}

export default LoginForm
