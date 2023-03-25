import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
            </Navbar.Collapse>
        </Navbar>
    );
};
export default Header;
