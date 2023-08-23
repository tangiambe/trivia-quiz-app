import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';



export const NavBar = () => {

    return (
        <>
           <Navbar expand="lg" className="bg-body-tertiary" >
            <Container>
                <Navbar.Brand href="/"><strong>TriviYay!</strong></Navbar.Brand>
                <Nav>
                    <Nav.Item className="px-3 py-2">
                        <Nav.Link href="/signup">
                            Register
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="px-3 py-2">
                        <Nav.Link href="/login">
                            Login
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
           </Navbar>

          
        </>
        
    );
}