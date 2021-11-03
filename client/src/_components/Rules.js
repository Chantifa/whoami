import {Button, Container} from "reactstrap";
import React from "react";
import ExamplesNavbar from "./Navbar";
import {useHistory} from "react-router-dom";

export default function Rules() {

    const history = useHistory();

    const routeChange = () => {
        let path = '/register';
        history.push(path);
    }

    return (
        <>
            <ExamplesNavbar/>
            <div
                className="page-header"
                style={{
                    backgroundImage:
                        "url(" + require("../assets/img/rules.jpg").default + ")",
                }}
            >
                <div className="filter"/>
                <Container>
                    <div className="motto text-center">
                        <h1>Rules</h1>
                        <h3>guess who you are - register now!</h3>
                        <br/>
                        <Button
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            className="btn-round mr-1"
                            color="neutral"
                            target="_blank"
                            outline
                        >
                            <i className="fa fa-play"/>
                            Watch video
                        </Button>{' '}
                        <Button className="btn-round" color="neutral" target="_blank" onClick={routeChange} outline>
                            Register
                        </Button>
                    </div>

                </Container>
            </div>
        </>
    )
}
