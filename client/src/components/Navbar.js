import React from "react";
import {Link, useHistory} from "react-router-dom";
import classnames from "classnames";
import {Nav, Navbar} from "react-bootstrap";
import {Button, Collapse, Container, NavItem, NavLink,} from "reactstrap";
import logo from "../assets/img/logo.png";

function ExamplesNavbar() {

    const history = useHistory();

    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);

    const toggleNavbarCollapse = () => {
        setNavbarCollapse(!navbarCollapse);
        document.documentElement.classList.toggle("nav-open");
    };

    const routeChange = () => {
        let path = '/login';
        history.push(path);
    }

    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 299 ||
                document.body.scrollTop > 299
            ) {
                setNavbarColor("");
            } else if (
                document.documentElement.scrollTop < 300 ||
                document.body.scrollTop < 300
            ) {
                setNavbarColor("navbar-transparent");
            }
        };

        window.addEventListener("scroll", updateNavbarColor);

        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });
    return (
        <Navbar
            className={classnames("fixed-top", navbarColor)}
            color-on-scroll="300"
            expand="lg">
            <Container>
                <div className="navbar-translate">
                    <Navbar.Brand as={Link} to="/"><img src={logo} alt="logo" width="150" height="55"/></Navbar.Brand>
                    <button
                        aria-expanded={navbarCollapse}
                        className={classnames("navbar-toggler navbar-toggler", {
                            toggled: navbarCollapse,
                        })}
                        onClick={toggleNavbarCollapse}>
                        <span className="navbar-toggler-bar bar1"/>
                        <span className="navbar-toggler-bar bar2"/>
                        <span className="navbar-toggler-bar bar3"/>
                    </button>
                </div>
                <Collapse
                    className="justify-content-end"
                    navbar
                    isOpen={navbarCollapse}
                >
                    <Nav navbar>
                        <NavItem>
                            <NavLink to="/index" tag={Link}>
                                <i className="nc-icon nc-layout-11"/> Components
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <Nav.Link as={Link} to="/rules"><i className="nc-icon nc-book-bookmark"/> Rules</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                data-placement="bottom"
                                href="https://git.ffhs.ch/ramona.koksa/whoami"
                                target="_blank">
                                <i className="fa fa-github"/>
                                <p className="d-lg-none">GitHub</p>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <Button
                                className="btn-round"
                                color="danger"
                                onClick={routeChange}
                                target="_blank">
                                <i className="nc-icon nc-spaceship"/> Login
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}

export default ExamplesNavbar;
