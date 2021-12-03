import {Container, Row} from "reactstrap";

export default function Footer() {
    /**
     * This component returns the footer
     *
     * @component
     * @return Footer
     */
    return (
        <footer className="footer footer-black footer-white">
            <Container>
                <Row>
                    <div className="credits ml-auto">
            <span className="copyright">
              &copy; {new Date().getFullYear()}, made with <i className="fa fa-heart heart" aria-hidden="true"/>at FFHS - Ramona Koksa | Yves Bastian Pellaton
            </span>
                    </div>
                </Row>
            </Container>
        </footer>
    );
}
