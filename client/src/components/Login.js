import React, {Component} from 'react'
import {Button, Card, Col, Container, Form, Input, Row} from "reactstrap";
import ExamplesNavbar from "./Navbar";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import { loginUser } from "../actions/authActions";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/game");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/game"); // push user to game when they login
        }
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

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

    this.props.loginUser(userData);

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
                                                className={classnames("", {
                                                    invalid: errors.email || errors.emailnotfound
                                                })}
                                            />
                                            <span className="red-text">
                                                {errors.email}
                                                {errors.emailnotfound}
                                            </span>
                                            <label>Password</label>
                                            <Input
                                                placeholder="Password"
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"
                                                type="password"
                                                className={classnames("", {
                                                    invalid: errors.password || errors.passwordincorrect
                                                })}
                                            />
                                            <span className="red-text">
                                                {errors.password}
                                                {errors.passwordincorrect}
                                            </span>
                                            <Button block className="btn-round" color="danger" type="submit">
                                                Login
                                            </Button>
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
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);