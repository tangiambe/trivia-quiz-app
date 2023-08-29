import React, { useEffect } from "react";
import '../styles/Home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

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
                            src="https://plus.unsplash.com/premium_photo-1677564813959-d64c2c3d74f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                            alt="bikes"
                            className="w-50"
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
                            </>
                        ):(
                            <>
                                <Button href="/signup" className="btn-primary mx-2 px-4 fw-bold">Sign Up</Button>
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