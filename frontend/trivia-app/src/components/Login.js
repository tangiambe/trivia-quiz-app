import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import '../styles/Login.css'
import { UserApi } from "../apis/UserApi";
import { login } from "../redux/userSlice";
import { Alert } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";


export const Login = () => {

    // Two Hooks - useState(): manages/keeps track data within your component
    // -useEffect(): manages startup behavior when the component mounts
  
    const [user, setUser] = useState({
        _id: "-1",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    });

    const [auth, setAuth] = useState({show: false, auth: false});
    // const activeUser = useSelector((state) => state.user);
    // console.log("Active User in Login: ",activeUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        UserApi.getUserByCredentials(event.target.username.value, event.target.password.value, setUser, setAuth);
    }

    // Arrow syntax: () => {}
    useEffect(() => {

        if(user._id !== "-1"){
            dispatch(login(user));

            setTimeout(()=> {
                navigate("/dashboard");
            },600)
        }
           
        

        // console.log("mounted");
    },[user, dispatch, navigate, auth])

    /* Password Visiblity */
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {setPasswordShown(passwordShown ? false : true)};
    const showPwd = <FontAwesomeIcon icon={faEye} />;
    const hidePwd = <FontAwesomeIcon icon={faEyeSlash} />;


    return(
        <>

    <Container fluid id="wrapper" className="d-flex align-items-center">
    <Card id="loginCard" className="mx-auto">
        <Row id="loginPageRow">
            {/* This container holds the login header */}
            <Container className="mt-5">
                <section className="mx-auto">
                    <h1 className="text-center">Login</h1>
                </section>
            </Container>

            {/* This container holds the login form */}
            <Container>
                {/* mx-auto refers to the CSS property margin: auto and 'w' refers to width */}
                <Form className="mx-auto w-60"
                onSubmit={handleSubmit}>
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
                        <InputGroup>
                            <Form.Control
                                required
                                type={passwordShown ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"  
                            />
                            {/* This Input Group handles the Password Visibility Toggle */}
                            <InputGroup.Text >
                                <i onClick={togglePasswordVisiblity}>{passwordShown ? hidePwd : showPwd}</i>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                        <Button className="w-100" type="submit">Login</Button>
                        <div>
                            <p className="mt-2">Don't have an account? <a href="/signup">Register Now!</a></p>
                            {auth.show ? (

                                auth.auth ? 
                                <Alert variant="success">Logged In!</Alert>
                                :
                                <Alert variant="danger">Invalid Credentials</Alert>
                               
                            ):(
                                <></>
                            )}
                        </div>
                </Form>
            </Container>
        </Row>
        </Card>
    </Container>
        </>
    );
}