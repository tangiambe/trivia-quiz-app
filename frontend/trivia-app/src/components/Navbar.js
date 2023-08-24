import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
// import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";


// isEnabled is passed in from App.js
// isEnabled is referred to as a prop (same thing as a parameter)
// If you don't use the {} then it would just be props.isEnabled
// Putting props in {} and listing their contents is called destructuring props: (props) -> ({isEnabled})
export const NavBar = () => {

    const activeUser = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <>
           <Navbar expand="lg" className="bg-body-tertiary" >
            <Container>
                <Navbar.Brand href="/" className="fw-bold">
                    TriviYay!
                </Navbar.Brand>
                <Navbar.Toggle id="offcanvasNavbarToggle" className="border border-0" aria-controls="offcanvasNavbar-expand-lg"/>
                <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        {activeUser.userId === -1 ? (
                            <Nav className="justify-content-end flex-grow-1">
                                <Nav.Item className="px-3 py-2">
                                    <Nav.Link href="/signup" className="fw-bold">
                                        Register
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="px-3 py-2">
                                    <Nav.Link href="/login" className="fw-bold">
                                        Login
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>

                        ):(
                            <Nav className="justify-content-end flex-grow-1">
                                <Nav.Item className="px-3 py-2">
                                    <Nav.Link href="/signup" className="fw-bold">
                                        Dashboard
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="px-3 py-2">
                                    <Nav.Link href="/" className="fw-bold" onClick={handleLogout}>
                                        Logout
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        )}

                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
           </Navbar>

          
        </>
        
    );
}