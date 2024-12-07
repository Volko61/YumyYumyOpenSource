import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function YumyNavbar() {
    return (
        <>
            <Navbar expand="lg" className="navbar-blur">
                <Container>
                    <Navbar.Brand href="/" className="text-white">
                        <img
                            alt=""
                            src="/yumyyumy_logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        YumyYumy
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="suggest-improvement" className="text-white">Suggest improvement</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
