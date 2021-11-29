import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExamplesNavbar from "./NavigationBar";
import { Button, Card, Col, Container, Form, Input, Row } from "reactstrap";

import { userActions } from '../_actions';


function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status //TODO this logs the user out once if the Register.js is rendered - why once? is it needed?
    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.name && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <>
            <ExamplesNavbar />
            <div
                className="page-header"
                style={{
                    backgroundImage:
                        "url(" + require("../assets/img/user.svg").default + ")",
                }}
            >
                <div className="filter" />
                <div className="align-content-lg-center">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto">
                                <Card className="card-register ml-auto mr-auto" lg="4">
                                    <h1 className="title h3 mx-auto">Welcome</h1>

                                    <Form className="register-form" onSubmit={handleSubmit}>
                                        <label>Name</label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            className={'form-control' + (submitted && !user.name ? ' is-invalid' : '')}
                                        />
                                        {submitted && !user.name &&
                                            <div className="invalid-feedback">First Name is required</div>}

                                        <label>Email</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')}
                                        />
                                        {submitted && !user.email &&
                                            <div className="invalid-feedback">E-Mail is required</div>
                                        }
                                        <label>Password</label>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')}
                                        />
                                        {submitted && !user.password &&
                                            <div className="invalid-feedback">Password is required</div>
                                        }
                                        <label>Confirm Password</label>
                                        <Input
                                            type="password"
                                            name="password_confirmation"
                                            value={user.password_confirmation}
                                            onChange={handleChange}
                                            className={'form-control' + (submitted && !user.password_confirmation ? ' is-invalid' : '')}
                                        />
                                        {submitted && !user.password_confirmation &&
                                            <div className="invalid-feedback">Password is required</div>
                                        }
                                        <Button block className="btn-round" color="danger">
                                            {registering && <span className="spinner-border spinner-border-sm mr-1"/>}
                                            Register
                                        </Button>
                                        <div className="mt-4 forgot">
                                            <Link to="/login" className="btn-link">Cancel</Link>
                                        </div>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>

    );
}

export { Register }