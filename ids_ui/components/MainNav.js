import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

export default function MainNav() {
   return (
      <>
         <Navbar className="fixed-top navbar-dark bg-dark" bg="light" expand="lg">
            <Container>
               <Navbar.Brand href='/' passHref legacyBehavior>Internal Dispatch System</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
                     <Link href="/tasks" passHref legacyBehavior><Nav.Link>Tasks</Nav.Link></Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         <br />
         <br />
      </>
   )
}
