import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
// import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { OffcanvasHeader, OffcanvasTitle } from "react-bootstrap";



export const NavBar = () => {

    return (
        <>
           <Navbar expand="lg" className="bg-body-tertiary" >
            <Container>
                <Navbar.Brand href="/"><strong>TriviYay!</strong></Navbar.Brand>
                <Navbar.Toggle id="offcanvasNavbarToggle" className="border border-0" aria-controls="offcanvasNavbar-expand-lg"/>
                <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1">
                            <Nav.Item className="px-3 py-2">
                                <Nav.Link href="/signup">
                                    <strong>Register</strong>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="px-3 py-2">
                                <Nav.Link href="/login">
                                    <strong>Login</strong>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
           </Navbar>

          
        </>
        
    );
}