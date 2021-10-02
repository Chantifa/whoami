
import React, {useState, useContext} from 'react' // import hooks from React
import { AppContext } from "./Context"; // import Context component
import '../App.css';
import {Button, Container, Form} from "react-bootstrap";
import userimg from "../img/user.svg";
import {useHistory} from "react-router-dom";


// create hook, import Register and error props
function RegisterForm({ Register, error}) {
    // access "global" state object by useContext
    const myContext = useContext(AppContext);

    // create state for details
    const [details, setDetails] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    // create function for handling submits
    const submitHandler = e => {
        e.preventDefault();

        Register(details);
    }

    const routeChange = () => {
        let path = '/game';
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
            </Form>

        </Container>

    )
}

export default RegisterForm
