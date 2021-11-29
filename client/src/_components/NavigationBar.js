import {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import classnames from "classnames";
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink,} from "reactstrap";
import logo from "../assets/img/logo.png";
import UserStatsBadge from "./UserStatsBadge";

export default function NavigationBar() {

    const history = useHistory();

    const [navbarColor, setNavbarColor] = useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = useState(false);

    const toggleNavbarCollapse = () => {
        setNavbarCollapse(!navbarCollapse);
        document.documentElement.classList.toggle("nav-open");
    };

    useEffect(() => {
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

            <div className="navbar-translate ms-xl-5">
                <NavbarBrand href="/"><img src={logo} alt="logo" width="150" height="55"/></NavbarBrand>
                <button
                    aria-expanded={navbarCollapse}
                    className={classnames("navbar-toggler", {
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
                isOpen={navbarCollapse}>
                <Nav navbar>
                    <NavItem>
                        <NavLink to="/index" tag={Link}>
                            <i className="nc-icon nc-layout-11"/> Components
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/rules" tag={Link}>
                            <i className="nc-icon nc-book-bookmark"/> Rules
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            data-placement="bottom"
                            href="https://git.ffhs.ch/ramona.koksa/whoami"
                            target="_blank">
                            <i className="fa fa-gitlab"/>
                            <p className="d-lg-none">GitLab</p>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <Button
                            href="/login"
                            className="btn-round me-xxl-5"
                            color="danger">
                            <i className="nc-icon nc-spaceship"/> Login
                        </Button>
                    </NavItem>
                    <NavItem>
                        <UserStatsBadge color="dark"/>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}
