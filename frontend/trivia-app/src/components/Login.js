import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Login = () => {

    // Two Hooks - useState(): manages/keeps track data within your component
    // -useEffect(): manages startup behavior when the component mounts
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const updateUsername = (event) => {
        setUsername(event.target.value);
        console.log(username);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
        console.log(password);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setCredentials({
            username: {username},
            password: {password}
        });

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
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Username"
                            onChange={updateUsername} 
                        />
                    </Form.Group>
                    <Form.Group className="mt-4 mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={updatePassword}    
                        />
                    </Form.Group>
                        <Button className="w-100" type="submit">Login</Button>
                </Form>
            </Container>
        </>
    );
}