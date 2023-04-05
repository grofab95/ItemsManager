import { useCallback } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../store/userSession/api";
import { useLocation } from "react-router-dom";
import { NavItem } from "./NavItem";

const Header: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const dispatchLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <Navbar className="px-3" expand="lg">
            <Navbar.Brand>Items Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                    className="me-auto"
                    activeKey={location.pathname.replace("/", "")}
                >
                    <NavItem to="/home" text="Home" />
                    <NavItem to="/users" text="Users" />
                    <NavItem to="/items" text="Items" />
                    <NavItem to="/releases" text="Releases" />
                    <NavItem to="/categories" text="Categories" />
                    <NavItem to="/parameters" text="Parameters" />
                </Nav>
                <Nav>
                    <NavDropdown
                        title={
                            <div className="pull-left">
                                <img
                                    className="me-2"
                                    style={{
                                        width: "40px",
                                        borderRadius: "50%",
                                    }}
                                    src={"https://github.com/mshaaban0.png"}
                                    alt="user pic"
                                />
                                Fabian
                            </div>
                        }
                        id="basic-nav-dropdown"
                        align="end"
                    >
                        <NavDropdown.Item href="#action/3.1">
                            Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            onClick={(event) => {
                                event.preventDefault();
                                dispatchLogout();
                            }}
                        >
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default Header;
