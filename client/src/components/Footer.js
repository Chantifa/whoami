import React from "react";

// reactstrap components
import {Container, Row} from "reactstrap";

function Footer() {
    return (
        <footer className="footer footer-black footer-white">
            <Container>
                <Row>
                    <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
                <i className="fa fa-heart heart" aria-hidden/> by FFHS - Ramona Koksa | Yves Bastian Pellaton
            </span>
                    </div>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
