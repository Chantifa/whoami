import React, {useContext, useState} from 'react' // import hooks from React
import {appContext} from "../appContext"; // import Context component
import '../styles.css';
import {Button, Card, Col, Container, Form, Input, Row} from "reactstrap";
import ExamplesNavbar from "./ExampleNavbar";

function LoginForm(props) {
    const {login, error} = props

    // access "global" state object by useContext
    const myContext = useContext(appContext);
    document.documentElement.classList.remove("nav-open");

    // create state for details
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // create function for handling submits
    function handleSubmit (e) {
        e.preventDefault();
        login({email, password});
    }

    const handlePassowrdChange = (event) => setPassword(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);

    return (
        <>
            <ExamplesNavbar/>
            <div
                className="page-header"
                style={{
                    backgroundImage:
                        "url(" + require("../assets/img/user.svg").default + ")",
                }}
            >
                <div className="filter"/>
                <div className="align-content-lg-center">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" lg="12">
                            <Card className="card-register ml-auto mr-auto">
                                <h3 className="title mx-auto">Welcome</h3>

                                <Form className="register-form">
                                    <label>Email</label>
                                    <Input placeholder="Email" type="text"/>
                                    <label>Password</label>
                                    <Input placeholder="Password" type="password"/>
                                    <Button block className="btn-round" color="danger">
                                        Login
                                    </Button>
                                </Form>
                                <div className="forgot">
                                    <Button
                                        className="btn-link"
                                        color="danger"
                                        href="/"
                                        onClick={(e) => e.preventDefault()}>
                                        Forgot password?
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                </div>
            </div>
        </>

    )
}

export default LoginForm;
