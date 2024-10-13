import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



const BottomNav = ({ user }) => {
    return (
        <>
        { user ? (
            <></>
        ) : (
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="/">Home</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/signin">Sign In</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar> 
    )}
        
    </>
)
}

export default BottomNav