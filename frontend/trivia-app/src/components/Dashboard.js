import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import '../styles/Dashboard.css'
import { useSelector } from "react-redux";

export const Dashboard = () => {

    const activeUser = useSelector((state) => state.user);

    useEffect(() => {
        // console.log("Active User: ", JSON.stringify(activeUser));
    }, [])

    return(
        <>
            <Container id="db-wrapper" fluid>
                <Container id="dbHeroBanner" className="py-5">
                    <Card id="playerCard" className="d-flex">
                        <Card.Body >
                           <Row>
                                <Col md="10" className="text-white">
                                    <h1>Hello, {activeUser.firstName}</h1>
                                    <p>Play more</p>
                                </Col>

                                <Col className="text-white">
                                    <p>Highest Score</p>
                                </Col>
                           </Row>
                        </Card.Body>

                    </Card>
                </Container>


                <Container id="dbMainSection">

                    <Row>

                        <Col md="8" className="mb-3">
                            {/* <Container className="text-center pb-4">
                                <h1 className="fw-bold text-white text-uppercase">Our Quizzes</h1>
                            </Container> */}
                            <Container>
                                <Card className="dbSectionCard py-2">
                                    <Card.Title className="text-center py-4">
                                        <h1 className="text-white">Our Quizzes</h1>
                                    </Card.Title>
                                    <Row className="">
                                            
                                        <Col className="d-flex justify-content-center m-3">
                                            <Card className="quizSetCard">
                                                <Card.Title className="text-center pt-2">Quiz Set</Card.Title>
                                            </Card>
                                        </Col>
                                        <Col className="d-flex justify-content-center m-3">
                                            <Card className="quizSetCard">
                                                <Card.Title  className="text-center pt-2">Quiz Set</Card.Title>
                                            </Card>
                                        </Col>
                                        <Col className="d-flex justify-content-center m-3">
                                            <Card className="quizSetCard">
                                                <Card.Title  className="text-center pt-2">Quiz Set</Card.Title>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card>
                            </Container>
                        </Col>

                        <Col>
                            <Container id="recentlyPlayedContainer">
                                <Card id="dbRecentlyPlayed" className="dbSectionCard p-2">
                                    <Card.Title><h1 className="text-white text-center py-4">Recently Played</h1></Card.Title>
                                    <Card.Body className="d-flex justify-content-center">

                                        <Card className="quizSetCard">
                                            <Card.Title  className="text-center pt-2">Quiz Set</Card.Title>
                                        </Card>

                                    </Card.Body>
                                </Card>
                            </Container>

                        </Col>

                    </Row>
        
                </Container>


            </Container>
        </>
    );
}