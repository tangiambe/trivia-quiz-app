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
                <Navbar.Brand href="/">Trivia </Navbar.Brand>
                <Nav>
                    <Nav.Link href="/signup" className="">
                       Register
                    </Nav.Link>
                    <Nav.Link href="/login" className="">
                        Login
                    </Nav.Link>
                </Nav>
            </Container>
           </Navbar>

          
        </>
        
    );
}