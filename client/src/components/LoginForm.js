import React, {useState, useContext} from 'react' // import hooks from React
import {appContext} from "../appContext"; // import Context component
import '../App.css';
import {Link, useHistory} from 'react-router-dom';
import {Container, Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import userImg from "../img/user.svg";

function LoginForm({Login, error}) {
    // access "global" state object by useContext
    const myContext = useContext(appContext);

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

    return (
        <Container className="App-container" onSubmit={submitHandler}>
            <img src={userImg} className="fade-in-image" alt="logo"/>
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
                    <Link className="btn-register button" to="/register">Register here</Link>
                </Form.Group>

            </Form>

        </Container>

    )
}

export default LoginForm
