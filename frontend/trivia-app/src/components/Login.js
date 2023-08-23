import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Login = () => {

    // Two Hooks - useState(): manages/keeps track data within your component
    // -useEffect(): manages startup behavior when the component mounts
    const initialState = {
        username: "",
        password: "",
    }
    const [credentials, setCredentials] = useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();

        setCredentials({
            username: event.target.username.value,
            password: event.target.password.value
        });

        event.target.username.value = "";
        event.target.password.value = "";

        console.log(credentials);
    }

    // Arrow syntax: () => {}
    useEffect(() => {
        console.log("mounted");
    },[])

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
                <Form className="mx-auto w-25" onSubmit={handleSubmit}>
                    <Form.Group className="mt-4 mb-4">
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                        />
                    </Form.Group>
                    <Form.Group className="mt-4 mb-4">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"  
                        />
                    </Form.Group>
                        <Button className="w-100" type="submit">Login</Button>
                </Form>
            </Container>
        </>
    );
}