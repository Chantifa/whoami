import React from "react";
import {Button, Container} from "reactstrap";

function LandingPage() {
    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth < 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });

    return (
        <>
            <div
                style={{
                    backgroundImage:
                        "url(" + require("../assets/img/banner.jpg").default + ")",
                }}
                className="page-header"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter"/>
                <Container>
                    <div className="motto text-center">
                        <h1>Who am I</h1>
                        <h3>guess who you are - register now!</h3>
                        <br/>
                        <Button href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
                    <div
                        style={{
                            backgroundImage:
                                "url(" + require("../assets/img/clouds.png").default + ")",
                        }}
                        className="moving-clouds"
                        ref={pageHeader}
                    />
                </Container>
            </div>
        </>
    );
}

export default LandingPage;
