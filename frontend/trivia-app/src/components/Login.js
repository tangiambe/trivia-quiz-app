import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Login = () => {

    return(
        <>
            {/* This container holds the login header */}
            <Container className="mt-5">
                <section className="mx-auto">
                    <h1 className="text-center">Login</h1>
                </section>
            </Container>

            {/* This container holds the login form */}
            <Container>
                {/* mx-auto refers to the CSS property margin: auto and 'w' refers to width */}
                <Form className="mx-auto w-25">
                    <Form.Group className="mt-4 mb-4">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Username"    
                        />
                    </Form.Group>
                    <Form.Group className="mt-4 mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"    
                        />
                    </Form.Group>
                        <Button className="w-100" type="submit">Login</Button>
                </Form>
            </Container>
        </>
    );
}