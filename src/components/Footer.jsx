import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <>
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <NavbarBrand className="mx-auto text-center">
            <p>{date} &copy; fwk23s-grupp2 </p>
          </NavbarBrand>
        </Navbar>
      </div>
    </>
  );
}
