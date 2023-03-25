import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header: React.FC = () => {
    return (
        <Navbar className="px-1" expand="lg">
            <Navbar.Brand href="#home">Items Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#link">Users</Nav.Link>
                    <Nav.Link href="#link">Releases</Nav.Link>
                    <Nav.Link href="#link">Items</Nav.Link>
                    <Nav.Link href="#link">Categories</Nav.Link>
                    <Nav.Link href="#link">Parameters</Nav.Link>
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
                        <NavDropdown.Item href="#action/3.2">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default Header;
