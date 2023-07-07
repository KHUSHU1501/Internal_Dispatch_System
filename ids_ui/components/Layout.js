// components/Layout.js

import Container from 'react-bootstrap/Container';
import MainNav from './MainNav';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <br />
      <Container>{children}</Container>
      <br />
    </>
  );
}
