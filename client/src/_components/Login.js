import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Col, Container, Form, Input, Row} from "reactstrap";
import ExamplesNavbar from "./NavigationBar";
import userActions from "../_actions/user.actions";



/**
 * The Login page so that the user can log in
 * @returns {JSX.Element}
 * @component
 */
export default function Login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const {email, password} = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    function handleChange(e) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            // get return url from location state or default to home page
            const {from} = location.state || {from: {pathname: "/"}};
            dispatch(userActions.login(email, password, from));
        }
    }

    return (
        <>
            <ExamplesNavbar/>
            <div
                className="page-header"
                style={{
                    backgroundImage:
                        "url(/img/user.svg)",
                }}
            >
                <div className="filter"/>
                <div className="align-content-lg-center">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" lg="12">
                                <Card className="card-register ml-auto mr-auto" lg="4">
                                    <h1 className="h3 title mx-auto">Welcome</h1>

                                    <Form className="register-form" onSubmit={handleSubmit}>
                                        <label>Email</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                            className={'form-control' + (submitted && !email ? ' is-invalid' : '')}
                                        />
                                        {submitted && !email &&
                                            <div className="invalid-feedback">E-Mail is required</div>
                                        }
                                        <label>Password</label>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                            className={'form-control' + (submitted && !password ? ' is-invalid' : '')}
                                        />
                                        {submitted && !password &&
                                            <div className="invalid-feedback">Password is required</div>
                                        }

                                        <Button block className="btn-round" color="danger">
                                            {loggingIn && <span className="spinner-border spinner-border-sm mr-1"/>}
                                            Login
                                        </Button>
                                        <div className="mt-4 forgot">
                                            <Link to="/register" color="danger" className="btn-link">Register</Link>
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