import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import classnames from "classnames";
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import UserStatsBadge from "./UserStatsBadge";
import {logout} from '../_actions/index'
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

export default function NavigationBar() {

    const [navbarColor, setNavbarColor] = useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = useState(false);
    const loggedIn = useSelector(state => state.authentication.loggedIn);

    //Calling t and i18n method from useTranslation hook
    const {i18n} = useTranslation();

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

    //Creating a method to change the language onClick
    const changeLang = (lng) => {
        i18n.changeLanguage(lng);
    }

    return (
        <Navbar
            className={classnames("fixed-top", navbarColor)}
            color-on-scroll="300"
            expand="lg">

            <div className="navbar-translate ms-xl-5">
                <NavbarBrand href="/"><img src="/img/logo.png" alt="logo" width="150" height="55"/></NavbarBrand>
                <NavbarToggler onClick={toggleNavbarCollapse}/>
                <Button
                    aria-expanded={navbarCollapse}
                    className={classnames("navbar-toggler", {
                        toggled: navbarCollapse,
                    })}
                    onClick={toggleNavbarCollapse}>
                    <span className="navbar-toggler-bar bar1"/>
                    <span className="navbar-toggler-bar bar2"/>
                    <span className="navbar-toggler-bar bar3"/>
                </Button>
            </div>
            <Collapse
                className="justify-content-end"
                navbar
                isOpen={navbarCollapse}>
                <Nav navbar>
                    <NavItem>
                        <NavLink to="/highscore" tag={Link}>
                            <i className="nc-icon nc-controller-modern"/> Highscore
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
                        <NavLink
                            onClick={() => changeLang('de')}
                            href="#">
                            <i className="nc-icon nc-globe"/> DE
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => changeLang('en')}
                            href="#">
                            <i className="nc-icon nc-globe"/> EN
                        </NavLink>
                    </NavItem>
                    {
                        loggedIn ?
                            <>
                                <NavItem>
                                    <UserStatsBadge color="dark"/>
                                </NavItem>
                                <Button
                                    className="btn-round me-xxl-5 ms-xl-5"
                                    color="danger"
                                    onClick={logout}
                                    href="/">
                                    <i className="nc-icon nc-spaceship"/> Logout
                                </Button>
                            </>
                            :
                            <>
                                <Button
                                    className="btn-round me-xxl-5 ms-xl-5"
                                    color="danger"
                                    href="/login">
                                    <i className="nc-icon nc-spaceship"/> Login
                                </Button>
                            </>
                    }
                </Nav>
            </Collapse>
        </Navbar>
    );
}
