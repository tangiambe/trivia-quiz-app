import React, { useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/Navbar.css"


export const NavBar = () => {

    const activeUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    useEffect(() => { }, [activeUser._id])

    return (
        <>
            <Navbar expand="lg" className="trivNavBar bg-body-tertiary" >
                <Container>
                    <Navbar.Brand className="fw-bold">
                        <Link to="/" className="navLink">TriviYay!</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle id="offcanvasNavbarToggle" className="border border-0" aria-controls="offcanvasNavbar-expand-lg" />
                    <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg" className="fw-bold">Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>

                            {activeUser._id === "-1" ? (
                                <Nav className="justify-content-end flex-grow-1 align-items-center">
                                    <Nav.Item className="px-3 py-2">
                                        <Nav.Link href="/register" className="fw-bold">
                                            Register
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="px-3 py-2">
                                        <Nav.Link href="/login" className="fw-bold">
                                            Login
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            ) : (
                                <Nav className="justify-content-end flex-grow-1 align-items-center">
                                    <Nav.Item className="px-3 py-2">
                                        <Link className="navLink fw-bold text-secondary-emphasis" to="/dashboard">Dashboard</Link>
                                    </Nav.Item>
                                    <Nav.Item className="px-3 py-2">
                                        <Button className="fw-bold" variant="danger" onClick={handleLogout}>Logout</Button>
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