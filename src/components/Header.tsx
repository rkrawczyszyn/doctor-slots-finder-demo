import React from "react";
import { Navbar, Container } from "react-bootstrap";

export const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Doctor Slot Finder</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
