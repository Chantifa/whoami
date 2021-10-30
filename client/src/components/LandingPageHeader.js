import React from "react";

// reactstrap components
import {Button, Container} from "reactstrap";

function LandingPageHeader() {
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
                        <Button
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            className="btn-round mr-1"
                            color="neutral"
                            target="_blank"
                            outline
                        >
                            <i className="fa fa-play"/>
                            Watch video
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

export default LandingPageHeader;
