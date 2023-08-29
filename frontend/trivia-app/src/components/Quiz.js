import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../styles/Quiz.css"
import { useNavigate } from "react-router-dom";

export const Quiz = () => {

    const quiz = 
        {
            id: 1,
            title: "React Basics",
            questions: [
                {
                  question: "What is React?",
                  correctAnswer: "A JavaScript library for building user interfaces",
                  options: [
                    "A programming language",
                    "A database management system",
                    "A text editor",
                    "A JavaScript library for building user interfaces"
                  ],
                  picture: "react_logo.png"
                },
                {
                  question: "Which component lifecycle method is called after a component is rendered for the first time?",
                  correctAnswer: "componentDidMount",
                  options: [
                    "componentWillMount",
                    "componentDidMount",
                    "componentRendered",
                    "componentUpdated"
                  ],
                  picture: "lifecycle.png"
                },
                {
                  question: "In React, which prop should be used to set the initial value of a component's state?",
                  correctAnswer: "props",
                  options: [
                    "state",
                    "props",
                    "initialState",
                    "values"
                  ],
                  picture: "props.png"
                }
              ]
        }

        const totalQuestions = quiz.questions.length;
        const [question, setQuestion] = useState(0);
        const [score, setScore] = useState(0);
        const navigate = useNavigate();
        

        const handlePrev = () => {
            if(question > 0 ){

                setQuestion(prev => prev - 1);
            }
        };

        const handleSubmit = (e) => {
            const selectedAnswer = e.target.value;
            const correctAnswer = quiz.questions[question].correctAnswer;

            if(selectedAnswer === correctAnswer){
                console.log("Correct");
                setScore(prev => prev + 100);
                console.log(score);
            } else {
                console.log("Incorrect");
                setScore(prev => prev + 0);
            }
            
            if(question < totalQuestions - 1 ){
                setQuestion(prev => prev + 1);
            } else {
                alert("Quiz finished");
                navigate("/dashboard");
            }
        }

        useEffect(()=> {
            
           

        }, [question]);

    return(
        <>
            <Container className="bg-wrapper" fluid>
                <Container className="d-flex flex-column align-items-center justify-content-center">
                    <Card className="quizCard py-1 px-1">
                        <Card.Img height={"300rem"} src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=2000&q=60"/>
                        <Card.Title className="text-center text-white fw-bold py-4">{quiz.questions[question].question}</Card.Title>
                        <Card.Body>
                            <Container className="text-center">
                                <Row>
                                    <Col><Button onClick={handleSubmit} value={quiz.questions[question].options[0]} className="quizButton w-100 h-75 my-3">{quiz.questions[question].options[0]}</Button></Col>
                                    <Col><Button onClick={handleSubmit} value={quiz.questions[question].options[1]} className="quizButton w-100 h-75 my-3">{quiz.questions[question].options[1]}</Button></Col>
                                </Row>
                                <Row>
                                    <Col><Button onClick={handleSubmit} value={quiz.questions[question].options[2]} className="quizButton w-100 h-75 my-3">{quiz.questions[question].options[2]}</Button></Col>
                                    <Col><Button onClick={handleSubmit} value={quiz.questions[question].options[3]} className="quizButton w-100 h-75 my-3">{quiz.questions[question].options[3]}</Button></Col>
                                </Row>
                            </Container>
                        </Card.Body>
                        <Card.Footer>
                            <Container className="d-flex">
                                <Container className="d-flex justify-content-start">
                                    <Button onClick={handlePrev} className="mx-2">Prev</Button>
                                </Container>
                                <Container className="d-flex justify-content-center">
                                    <h1 className="text-white text-center">{score}</h1>
                                </Container>
                                <Container className="d-flex justify-content-end">
                                    <p className="text-white">{question + 1}/{totalQuestions}</p>
                                </Container>
                            </Container>

                        </Card.Footer>
                    </Card>
                </Container>
            </Container>
        </>
    );
}