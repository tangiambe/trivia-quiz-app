import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export const Signup = () => {

    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPw, setConfirmPw] = useState();

    const [credentials, setCredentials] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        setCredentials({
            fName: event.target.fname.value,
            lName: event.target.lname.value,
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPw: event.target.confirmPw.value
        });

        console.log(credentials);
    }

    useEffect(() => {
        console.log("mounted");
    },[])

    return(
     <>
        <Container fluid id="wrapper">
            <Row id="signupPageRow">    
            {/* This container holds the register header */}
            <Container className="mt-5">
                <section className="mx-auto">
                    <h1 className="text-center">Register</h1>
                </section>
            </Container>
            
            {/* This container holds the register form */}
            <Container>
                <Form className="mx-auto w-25" onSubmit={handleSubmit}>
                    <Form.Group className="mt-4 mb-4">
                        <Form.Label htmlFor="fname">First Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="fname"
                            name="fname"
                            placeholder="First Name"    
                        />
                    </Form.Group>
                    
                    <Form.Group className="mt-4 mb-4">
                        <Form.Label htmlFor="lname">Last Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="lname"
                            name="lname"
                            placeholder="Last Name"    
                        />
                    </Form.Group>

                    <Form.Group className="mt-4 mb-4">
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter a Username"    
                        />
                    </Form.Group>

                    <Form.Group className="mt-4 mb-4">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter an email address"    
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

                    <Form.Group className="mt-4 mb-4">
                        <Form.Label htmlFor="confirmPw">Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            id="confirmPw"
                            name="confirmPw"
                            placeholder="Confirm Password"    
                        />
                    </Form.Group>
                        <Button className="w-100" type="submit">Create Account</Button>
                </Form>
            </Container>
            </Row>
         </Container>
     </>
     );
}