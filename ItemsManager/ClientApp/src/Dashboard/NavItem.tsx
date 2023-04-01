import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavLinkProps {
    to: string;
    text: string;
}

export function NavItem({ to: linkTo, text: linkText }: NavLinkProps) {
    return (
        <Nav.Link as={Link} to={linkTo} eventKey={linkTo.replace("/", "")}>
            {linkText}
        </Nav.Link>
    );
}
