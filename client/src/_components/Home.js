import {Button, Col, Container, Row,} from "reactstrap";
import ExamplesNavbar from "./NavigationBar";
import LandingPage from "./LandingPage";

function Home() {
    document.documentElement.classList.remove("nav-open");
    return (
        <>
            <ExamplesNavbar />
            <LandingPage />
            <div className="main">
                <div className="section text-center">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" md="12">
                                <h2 className="title">About the game</h2>
                                <p className="h5 description">
                                    Who Am I? is a guessing game where players use yes or no questions to guess the
                                    identity of a
                                    famous person or animal. Questions are based upon the characteristics of a person or
                                    animal
                                    everyone will be able to identify. This game works well with any size group, however
                                    the larger the
                                    group, the more fun the game becomes.
                                </p>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Button
                                    className="btn-round"
                                    color="success"
                                    href="/rules"
                                >
                                    Read Rules
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col md="4">
                                <div className="info">
                                    <div className="icon icon-success">
                                        <i className="nc-icon nc-align-center" />
                                    </div>
                                    <div className="description">
                                        <h3 className=" h4 info-title">About the Project</h3>
                                        <p className="description">
                                            Read the docs about the project. Everything is on readme on git.ffhs.
                                        </p>
                                        <Button className="btn-link" color="success" href="https://git.ffhs.ch/ramona.koksa/whoami/-/blob/dev/README.md">
                                            See more
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="info">
                                    <div className="icon icon-success">
                                        <i className="nc-icon nc-bulb-63" />
                                    </div>
                                    <div className="description">
                                        <h3 className="h4 info-title">Improvements</h3>
                                        <p>
                                            Give us your feedback. We will be happy to check and improve them.
                                        </p>
                                        <Button className="btn-link" color="success" href="https://git.ffhs.ch/ramona.koksa/whoami/-/issues">
                                            See more
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="info">
                                    <div className="icon icon-success">
                                        <i className="nc-icon nc-chart-bar-32" />
                                    </div>
                                    <div className="description">
                                        <h3 className="h4 info-title">Impediments</h3>
                                        <p>
                                            Report your impediments to us. We will fix them as soon as possible.
                                        </p>
                                        <Button className="btn-link" color="success" href="https://git.ffhs.ch/ramona.koksa/whoami/-/issues">
                                            See more
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export { Home };