import React, {useState, useContext} from 'react' // import hooks from React
import {appContext} from "../appContext"; // import Context component
import '../App.css';
import {Link, useHistory} from 'react-router-dom';
import {Container, Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import userImg from "../img/user.svg";

function LoginForm(props) {
    const {login, error} = props

    // access "global" state object by useContext
    const myContext = useContext(appContext);

    // create state for details
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    // create function for handling submits
    function handleSubmit (e) {
        e.preventDefault();
        login({email, password});
    }

    const handlePassowrdChange = (event) => setPassword(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);

    return (
        <>
            <img src={userImg} className="fade-in-image" alt="logo"/>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="mail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
                    <Form.Text className="text-muted">
                        Sorry, you can not use your username
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="pw">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="it's gonna be hidden" value={password} onChange={handlePassowrdChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button className="btn btn-primary" type="submit">Login</Button>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Not registered yet?  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Link to="/register" className="btn btn-outline-primary" > Register here </Link>
                </Form.Group>
            </Form>
        </>

    )
}

export default LoginForm
