import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiBrain } from 'react-icons/bi';
import '../styles/Dashboard.css'
import { QuizApi } from "../apis/QuizApi";

export const Dashboard = () => {

    const activeUser = useSelector((state) => state.user);
    const [quizSets, setQuizSets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeUser._id === "-1") {
            navigate("/login");
        }
        QuizApi.getQuizSets(setQuizSets);
    }, [activeUser, navigate])

    return (
        <>
            <Container id="db-wrapper" fluid>
                <Container id="dbHeroBanner" className="py-5">
                    <Card id="playerCard" className="d-flex">
                        <Card.Body >
                            <Row>
                                <Col md="10" className="text-white">
                                    <Container className="d-flex align-items-center">
                                        <BiBrain size={"3em"} />
                                        <h1 className="px-3">Hello, {activeUser.firstName}</h1>
                                    </Container>
                                    <Container className="d-flex align-items-center">
                                        <p className="px-5 mx-3">Play more</p>
                                    </Container>
                                </Col>

                                <Col className="text-white">
                                    <p>Current Score</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>

                <Container id="dbMainSection">
                    <Row>
                        <Col md="8" className="mb-3">
                            <Container>
                                <Card className="dbSectionCard py-2">
                                    <Card.Title className="text-center py-4">
                                        <h1 className="text-white">Our Quizzes</h1>
                                    </Card.Title>
                                    <Row className="">
                                        {quizSets.map((quiz) => (
                                            <Col key={quiz._id} className="d-flex justify-content-center m-3">
                                                <Link to={`quiz/${quiz._id}`}>
                                                    <Card className="quizSetCard">
                                                        <Card.Title className="text-center pt-2">{quiz.title}</Card.Title>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        ))}
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
                                            <Card.Title className="text-center pt-2">Quiz Set</Card.Title>
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