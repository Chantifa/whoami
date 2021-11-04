import React from "react";
import ExamplesNavbar from "./Navbar";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

export default function Rules() {

  let pageHeader = React.createRef();

  return (
    <>
      <ExamplesNavbar />
      <div
        style={{
          backgroundImage:
            "url(" + require("../assets/img/rules.jpg").default + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>Rules</h1>
            <h3>You have to learn the rules of the game. <br/> And then you have to play better than anyone else. - Einstein</h3>
            <br />
            <Button
              href="https://www.youtube.com/watch?v=9yrfGDdv5pc"
              className="btn-round mr-1"
              color="neutral"
              target="_blank"
              outline
            >
              <i className="fa fa-play" />
              Watch video
            </Button>{' '}
            <Button href="/register" className="btn-round" color="neutral" target="_blank" outline>
              Register
            </Button>
          </div>
        </Container>
      </div>

      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="15">
                <h2 className="title">About the game</h2>
                <h5 className="description">
                  Who Am I? is a guessing game where players use yes or no questions to guess the identity of a
                  famous person or animal. Questions are based upon the characteristics of a person or animal
                  everyone will be able to identify. This game works well with any size group, however the larger the
                  group, the more fun the game becomes.
                </h5>
                <br />
                <img src={require("../assets/img/mobile.png").default} alt="logo" width="100" height="100"></img>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <Row>
              <Col md="4">
                <div className="info">
                  <div className="icon icon-warning">
                    <i className="nc-icon nc-chat-33" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Be kind</h4>
                    <p className="description">
                      Always be friendly within the game.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="info">
                  <div className="icon icon-warning">
                    <i className="nc-icon nc-controller-modern" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Play</h4>
                    <p>
                      Play the game by asking questions and guess who you are.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="info">
                  <div className="icon icon-warning">
                    <i className="nc-icon nc-sun-fog-29" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Have fun</h4>
                    <p>
                      Enjoy playing the game!
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section section-dark text-center">
          <Container>
            <h2 className="title">Tips about game questions</h2>
            <Row>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <CardBody>
                    <div className="author">
                      <CardTitle tag="h4">Questions</CardTitle>
                      <h6 className="card-category">Classics</h6>
                    </div>
                    <p className="card-description text-center">
                      Players may ask any question that can be answered by Yes or No. Play is more fun and proceeds at
                      a steadier pace if the questions are like the following:
                      <br />
                      <br />
                      <li>Am I a male (female)?</li>
                      <li>Am I an entertainer?</li>
                      <li>Am I a singer (dancer, actor)?</li>
                    </p>

                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <CardBody>
                    <div className="author">
                      <CardTitle tag="h4">Example</CardTitle>
                      <h6 className="card-category">Disney Characters</h6>
                    </div>
                    <p className="card-description text-center">
                      If you are a disney character then you might want to ask the following questions:
                      <br />
                      <br />
                      <li>Am I animated? - Yes</li>
                      <li>Am I a princess? - No</li>
                      <li>Do I talk to animals? - Yes</li>
                      <li>Am I Snow White? - Yes</li>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <CardBody>
                    <div className="author">
                      <CardTitle tag="h4">Start with broad answers</CardTitle>
                      <h6 className="card-category">get answers</h6>
                    </div>
                    <p className="card-description text-center">
                      You will have a given number of questions you can ask about your answer. Ask
                      questions that will eliminate the widest amount. Big questions (like "Am I an animal?" or "Am I alive?") will
                      get you to the point where you're able to steer your questions towards what you have confirmed so far
                      about your answer.
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
