import React, {Component} from 'react'
import ExamplesNavbar from "./Navbar";
import {Button, Card, Col, Container, Form, Input, Row} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../actions/authActions";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

class Register extends Component {

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

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/game");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
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

        this.props.registerUser(newUser, this.props.history);


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
                                                className={classnames("", {
                                                    invalid: errors.name
                                                })}
                                            />
                                            <span className="red-text">{errors.name}</span>
                                            <label>Email</label>
                                            <Input
                                                placeholder="E-Mail"
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                error={errors.email}
                                                id="email"
                                                type="email"
                                                className={classnames("", {
                                                    invalid: errors.email
                                                })}
                                            />
                                            <span className="red-text">{errors.email}</span>
                                            <label>Password</label>
                                            <Input
                                                placeholder="Password"
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"
                                                type="password"
                                                className={classnames("", {
                                                    invalid: errors.password
                                                })}
                                            />
                                            <span className="red-text">{errors.password}</span>
                                            <label>Confirm Password</label>
                                            <Input
                                                placeholder="Password"
                                                onChange={this.onChange}
                                                value={this.state.password2}
                                                error={errors.password2}
                                                id="password2"
                                                type="password"
                                                className={classnames("", {
                                                    invalid: errors.password2
                                                })}
                                            />
                                            <span className="red-text">{errors.password2}</span>
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(Register));
