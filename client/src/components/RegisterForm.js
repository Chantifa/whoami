import React, {Component} from 'react'
import '../styles.css';
import ExamplesNavbar from "./ExampleNavbar";
import {Button, Card, Col, Container, Form, Input, Row} from "reactstrap";
import * as errors from "express";

class RegisterForm extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser);
    };

    render() {
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
                                <Col className="ml-auto mr-auto">
                                    <Card className="card-register ml-auto mr-auto" lg="4">
                                        <h3 className="title mx-auto">Welcome</h3>

                                        <Form className="register-form" noValidate onSubmit={this.onSubmit}>
                                            <label>Name</label>
                                            <Input
                                                placeholder="Name"
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                error={errors.name}
                                                id="name"
                                                type="text"
                                            />
                                            <label>Email</label>
                                            <Input
                                                placeholder="E-Mail"
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                error={errors.email}
                                                id="email"
                                                type="email"
                                            />
                                            <label>Password</label>
                                            <Input
                                                placeholder="Password"
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"
                                                type="password"
                                            />
                                            <label>Confirm Password</label>
                                            <Input
                                                onChange={this.onChange}
                                                value={this.state.password2}
                                                error={errors.password2}
                                                id="password2"
                                                type="password"
                                            />
                                            <Button block className="btn-round" color="danger">
                                                Sign up
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

}

export default RegisterForm;
