import React, { useEffect } from "react";
import '../styles/Home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../images/home-logo.svg";


export const Home = () => {

    const activeUser = useSelector((state) => state.user);

    useEffect(() => {

    },[activeUser])

    return (
        <>
        <Container fluid id="wrapper">
            <Row id="landingPageRow">

                {/* Picture column */}
                <Col id="landingPagePictureSection" className="d-flex flex-column justify-content-center">
                    <Container className="d-flex justify-content-center">
                        <img
                            style={{ width: 500, height: 500 }}
                            src={logo} alt="home logo"
                        />
                    </Container>
                </Col>

                {/* Text Column */}
                <Col id="landingPageText" className="d-flex flex-column justify-content-center">
                    <Container className="d-flex flex-column">
                        <h3 className="pb-3 fw-bold">Ready to Test Your Knowledge?</h3>
                        <h1 id="landingPageTitle" className="text-uppercase text-white w-75 fw-bold">Welcome to TriviYay!</h1>
                        <p className="text-white mt-3">Play now and discover the joy of learning through fun.</p>
                    </Container>
                    <Container className="d-flex mt-4">
                        {activeUser._id !== "-1" ? (
                            <>  
                                <Button className="px-4">
                                    <Link to="/dashboard" className="homeNavLink text-white fw-bold">Dashboard</Link>
                                </Button>
                            </>
                        ):(
                            <>
                                <Button href="/register" className="btn-primary mx-2 px-4 fw-bold">Register</Button>
                                <Button href="/login" className="btn-success mx-2 px-4 fw-bold">Login</Button>
                            </>
                        )}
                    </Container>
                </Col>
            </Row>
        </Container>
        </>
    );
}