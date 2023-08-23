import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Signup = () => {

    return(
        <>
            {/* This container holds the register header */}
            <Container className="mt-5">
                <section className="mx-auto">
                    <h1 className="text-center">Register</h1>
                </section>
            </Container>
            
            {/* This container holds the register form */}
            <Container>
                <Form className="mx-auto w-25">
                    <Form.Group className="mt-4 mb-4">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First Name"    
                        />
                    </Form.Group>
                    
                    <Form.Group className="mt-4 mb-4">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last Name"    
                        />
                    </Form.Group>

                    <Form.Group className="mt-4 mb-4">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter a Username"    
                        />
                    </Form.Group>

                    <Form.Group className="mt-4 mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter an email address"    
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

                    <Form.Group className="mt-4 mb-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"    
                        />
                    </Form.Group>
                        <Button className="w-100" type="submit">Create Account</Button>
                </Form>
            </Container>
        </>
    );
}