import React, {Component} from 'react' // import hooks from React
import {Button, Card, Col, Container, Form, Input, Row} from "reactstrap";
import ExamplesNavbar from "./Navbar";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);
    };

    render() {
        const {errors} = this.state;
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
                                            <Input
                                                placeholder="Email"
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
        );
    }
}

export default Login;