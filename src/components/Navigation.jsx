import React, { useState } from "react";
import { Link } from "react-router-dom";

// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        sticky="top"
        expanded={open}
      >
        <Container>
          <Link to="/" className="p-2 text-decoration-none">
            <Navbar.Brand>Auktionen</Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls="responsiv-navbar"
            onClick={handleToggle}
          />
          <Navbar.Collapse id="responsiv-navbar" onSelect={handleToggle}>
            <Nav className="text-decoration-none">
              <Link
                to="/"
                className="p-2 text-decoration-none text-white"
                onClick={handleClick}
              >
                Hem
              </Link>
              <Link
                to="/auctions"
                className="p-2 text-decoration-none text-white"
                onClick={handleClick}
              >
                Auktioner
              </Link>
              <Link
                to="/"
                className="p-2 text-decoration-none text-white"
                onClick={handleClick}
              >
                Länk
              </Link>
              <Link
                to="/"
                className="p-2 text-decoration-none text-white"
                onClick={handleClick}
              >
                Länk
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
