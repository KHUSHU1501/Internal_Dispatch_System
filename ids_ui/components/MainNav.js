import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { readToken, removeToken } from '@/lib/authenticate';
import { useRouter } from 'next/router';

export default function MainNav() {
   const router = useRouter();
   let token = readToken();

   function logout() {
      removeToken();
      router.push("/");
   }

   return (
      <>
         <Navbar className="fixed-top navbar-dark bg-dark" bg="light" expand="lg">
            <Container>
               <Navbar.Brand href='/' passHref legacyBehavior>Internal Dispatch System {token && <>- Welcome {token.userName}</>}</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
                     {token && <Link href="/tasks" passHref legacyBehavior><Nav.Link>Tasks</Nav.Link></Link>}
                  </Nav>
                  <Nav className="ml-auto">
                     {!token && <Link href="/login" passHref legacyBehavior><Nav.Link>Login</Nav.Link></Link>}
                     {token && <Nav.Link onClick={logout}>Logout</Nav.Link>}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         <br />
         <br />
      </>
   )
}
