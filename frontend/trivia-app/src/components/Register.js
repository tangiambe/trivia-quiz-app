import { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import '../styles/Register.css'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export const Signup = () => {

    /* References */
    const userRef = useRef();
    const errRef = useRef();
    // const pwdRef = useRef();

    /* Username */
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    /* Email */
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    /* Password */
    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    /* Confirm Password */
    const [confirmPw, setConfirmPw] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');



    const showPwd = <FontAwesomeIcon icon={faEye} />;
    const hidePwd = <FontAwesomeIcon icon={faEyeSlash} />;


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === confirmPw);
    }, [password, confirmPw])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, confirmPw])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = USERNAME_REGEX.test(username);
        const emailAdd = EMAIL_REGEX.test(email)
        const pwd = PWD_REGEX.test(password);
        if (!user || !emailAdd || !pwd) {
            setErrMsg("Invalid Entry");
            return;
        }

        setUsername('');
        setEmail('')
        setPwd('');
        setConfirmPw('');
    }

    return (
        <>
            <Container fluid id="wrapper" className="d-flex align-items-center">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <Card id='signupCard' className="mx-auto ">
                    <Row id="signupPageRow">
                        {/* This container holds the register header */}
                        <Container className="mt-1">
                            <section className="mx-auto">
                                <h1 className="text-center">Register</h1>
                            </section>
                            <div>
                                <p className="text-center"> Already have an account? <a href="/login">Log In!</a></p>
                            </div>
                        </Container>

                        {/* This container holds the register form */}
                        <Container>
                            <Form className="mx-auto w-60" onSubmit={handleSubmit}>
                                <Row>
                                    <div class="col">
                                        <Form.Group className="mt-4 mb-4">
                                            <Form.Label htmlFor="fname">First Name:</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                id="fname"
                                                name="fname"
                                                placeholder="First Name"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div class="col">
                                        <Form.Group className="mt-4 mb-4">
                                            <Form.Label htmlFor="lname">Last Name:</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                id="lname"
                                                name="lname"
                                                placeholder="Last Name"
                                            />
                                        </Form.Group>
                                    </div>
                                </Row>
                            

                                <Form.Group className="mt-1 mb-4">
                                    <Form.Label htmlFor="username">
                                        Username:
                                        <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        id="username"
                                        placeholder="Enter a Username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        required
                                        aria-invalid={validUsername ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                    />
                                    <p id="uidnote" className={userFocus && username && !validUsername ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        4 to 24 characters.<br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p>

                                </Form.Group>

                                <Form.Group className="mt-4 mb-4">
                                    <Form.Label htmlFor="email">
                                        Email:
                                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter Email Address"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="emailnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Please enter a valid e-mail address.
                                    </p>
                                </Form.Group>

{/* 
                                <Form.Group className="mt-1 mb-4">
                                <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
                                <InputGroup className="mb-3">
                                <Form.Control id="basic-url" aria-describedby="basic-addon3" />
                                    <InputGroup.Text id="basic-addon3">
                                    <i onClick={togglePasswordVisiblity}>
                                        {passwordShown ? hidePwd : showPwd}
                                    </i>
                                    </InputGroup.Text>
                                </InputGroup>
                                </Form.Group> */}


                                <Form.Group className="mt-1 mb-3">
                                    <Form.Label htmlFor="password">
                                        Password:
                                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                                    </Form.Label>
                                    <InputGroup>
                                    <Form.Control
                                        type={passwordShown ? "text" : "password"}
                                        id="password"
                                        placeholder="Enter a Password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={password}
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                        
                                    />
                                    <InputGroup.Text className="mb-3">
                                        <i onClick={togglePasswordVisiblity}>{passwordShown ? hidePwd : showPwd}</i>
                                    </InputGroup.Text>
                                    </InputGroup>
                                        
                                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 24 characters.<br />
                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label htmlFor="confirm_pwd">
                                        Confirm Password:
                                        <FontAwesomeIcon icon={faCheck} className={validMatch && confirmPw ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validMatch || !confirmPw ? "hide" : "invalid"} />
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="confirm_pwd"
                                        placeholder="Confirm Password"
                                        onChange={(e) => setConfirmPw(e.target.value)}
                                        value={confirmPw}
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Passwords must match!
                                    </p>
                                </Form.Group>
                                <Button href="/login" className="w-100" type="submit" disabled={!validUsername || !validPwd || !validMatch ? true : false}>Create Account</Button>
                            </Form>
                        </Container>
                    </Row>
                </Card>
            </Container>
        </>
    )
}