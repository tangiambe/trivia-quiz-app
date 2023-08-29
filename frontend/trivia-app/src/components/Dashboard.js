import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import '../styles/Dashboard.css'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Dashboard = () => {


    const allQuizzes = [
        {
            id: 1,
            title: "React Basics",
            questions: [
                {
                question: "What is React?",
                correctAnswer: "A JavaScript library for building user interfaces",
                picture: "react_logo.png"
                },
                {
                question: "Which component lifecycle method is called after a component is rendered for the first time?",
                correctAnswer: "componentDidMount",
                picture: "lifecycle.png"
                },
                {
                question: "In React, which prop should be used to set the initial value of a component's state?",
                correctAnswer: "props",
                picture: "props.png"
                }
            ]
        },
        {
            id: 2,
            title: "React Components",
            questions: [
                {
                question: "What is a functional component in React?",
                correctAnswer: "A component defined as a JavaScript function",
                picture: "functional_component.png"
                },
                {
                question: "What is the purpose of props in React?",
                correctAnswer: "To pass data from parent to child components",
                picture: "props.png"
                },
                {
                question: "What method can be used to update a component's state?",
                correctAnswer: "setState",
                picture: "state.png"
                }
            ]
        },
        {
            id: 3,
            title: "React Routing",
            questions: [
                {
                question: "What is React Router used for?",
                correctAnswer: "Managing navigation and routing in a React app",
                picture: "react_router.png"
                },
                {
                question: "How do you define a route in React using React Router?",
                correctAnswer: "<Route path='/about' component={About} />",
                picture: "route_definition.png"
                },
                {
                question: "Which component should be rendered when none of the defined routes match?",
                correctAnswer: "Switch",
                picture: "switch.png"
                }
            ]
        }
      ];
      

    const activeUser = useSelector((state) => state.user);

    useEffect(() => {
        console.log("Active User in Dashboard: ", JSON.stringify(activeUser));
    }, [activeUser])

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
                                    <p>Current Score</p>
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
                                            
                                        {allQuizzes.map((quiz) => (

                                            <Col key={quiz.id} className="d-flex justify-content-center m-3">
                                                <Link to={`quiz/${quiz.id}`} >
                                                    <Card className="quizSetCard">
                                                        <Card.Title  className="text-center pt-2">{quiz.title}</Card.Title>
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