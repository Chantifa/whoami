import {Button, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import {createRef} from "react";

export default function Rules() {
  /**
   * This component returns the rules page so that the user can read the rules of the game.
   *
   * @component
   * @return Rules component
   */

  let pageHeader = createRef();

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(/img/rules.jpg)",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>Rules</h1>
            <p className="h3 mb-4">You have to learn the rules of the game. <br/> And then you have to play better than
              anyone else. - Einstein</p>

            <Button href="https://www.youtube.com/watch?v=9yrfGDdv5pc"
                    target="_blank"
                    className="btn-round mx-2"
                    color="neutral"
                    outline
            >
              <i className="fa fa-play mx-1"/>Watch video
            </Button>
            <Button href="/register"
                    target="_blank"
                    className="btn-round mx-2 btn"
                    color="neutral"
                    outline
            >
              <i className="fa fa-user-plus mx-1"/>Register
            </Button>
          </div>
        </Container>
      </div>
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="12">
                <h2 className="title">About the game</h2>
                <p className="h5 description">
                  Who Am I? is a guessing game where players use yes or no questions to guess the identity of a
                  famous person or animal. Questions are based upon the characteristics of a person or animal
                  everyone will be able to identify. This game works well with any size group, however the larger the
                  group, the more fun the game becomes.
                </p>
                <br/>
                <img src="/img/mobile.png" alt="logo" width="100" height="100"/>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col md="4">
                <div className="info">
                  <div className="icon icon-warning">
                    <i className="nc-icon nc-chat-33"/>
                  </div>
                  <div className="description">
                    <h3 className="h4 info-title">Be kind</h3>
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
                    <h3 className="h4 info-title">Play</h3>
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
                    <h3 className="h4 info-title">Have fun</h3>
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
                <Card className="card-profile card-plain mt-5">
                  <CardBody>
                    <div className="author">
                      <CardTitle className="h4" tag="h3">Questions</CardTitle>
                      <p className="h6 card-category">Classics</p>
                    </div>
                    <p className="card-description text-center">
                      Players may ask any question that can be answered by Yes or No. Play is more fun and proceeds at
                      a steadier pace if the questions are like the following:
                      <ul className="mt-2 list-unstyled">
                        <li>Am I a male (female)?</li>
                        <li>Am I an entertainer?</li>
                        <li>Am I a singer (dancer, actor)?</li>
                      </ul>
                    </p>

                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain mt-5">
                  <CardBody>
                    <div className="author">
                      <CardTitle className="h4" tag="h3">Example</CardTitle>
                      <p className="h6 card-category">Disney Characters</p>
                    </div>
                    <p className="card-description text-center">
                      If you are a disney character then you might want to ask the following questions:
                      <ul className="mt-3 list-unstyled">
                        <li>Am I animated? - Yes</li>
                        <li>Am I a princess? - No</li>
                        <li>Do I talk to animals? - Yes</li>
                        <li>Am I Snow White? - Yes</li>
                      </ul>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain mt-5">
                  <CardBody>
                    <div className="author">
                      <CardTitle className="h4" tag="h3">Start with broad answers</CardTitle>
                      <p className="h6 card-category">get answers</p>
                    </div>
                    <p className="card-description text-center">
                      You will have a given number of questions you can ask about your answer. Ask
                      questions that will eliminate the widest amount. Big questions (like "Am I an animal?" or "Am I
                      alive?") will
                      get you to the point where you're able to steer your questions towards what you have confirmed so
                      far
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
