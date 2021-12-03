import {Button, Container} from "reactstrap";
import {useEffect, createRef} from "react";

import {useTranslation} from "react-i18next";


function LandingPage() {
    /**
     * This component returns the banner of landing page and swipes the header color
     *
     * @component
     * @return LandingPage component
     */
    const {t} = useTranslation();

    let pageHeader = createRef();

    useEffect(() => {
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
                        "url(/img/banner.jpg)",
                }}
                className="page-header"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter"/>
                <Container>
                    <div className="motto text-center">
                        <h1>{t("Who am I")}</h1>
                        <p className="h3 mb-4">{t("guess who you are - register now!")}</p>

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
                                "url(/img/clouds.png)",
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
