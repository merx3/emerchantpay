import React from 'react';
import Header from './LoginHeader';
import { Alert, Form, Button, Container, Row, Col, Spinner }  from 'react-bootstrap';
import { useAuth } from "../../../helpers/hooks/use-auth";
import { useHistory } from "react-router-dom";

function LoginForm() {
    const auth = useAuth();
    const history = useHistory();
    let waitingResponse = false;

    const hideElement = (elementId) => {
        document.getElementById(elementId).classList.add('d-none');
    };

    const showElement = (elementId) => {
        document.getElementById(elementId).classList.remove('d-none');
    }

    const submitLogin = (e) => {
        e.preventDefault();
        if (waitingResponse) {
            return;
        }
        const username = e.target.username.value;
        const password = e.target.password.value;
        waitingResponse = true;
        showElement("loadingLogin");
        auth.signin(username, password)
            .then(() => history.push('/admin/posts'))
            .catch(e => {
                showError(e?.response?.data?.error || e.message);
                hideElement("loadingLogin");
            })
            .finally(() => waitingResponse = false);
    };

    const showError = error => {
        showElement("errorAlert");
        document.getElementById("errorMessage").innerText = error;
    }

    const clearError = () => {
        hideElement("errorAlert");
        document.getElementById("errorMessage").innerText = '';
    };

    return(
        <div id="login">
            <Header/>
            <Container className="text-md-left mt-4 ml-2">
                <Row>
                    <Col sm={4}>
                        <Form onSubmit={submitLogin} className="form justify-content-md-start">
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required type="text" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Enter password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                <Spinner
                                    id="loadingLogin"
                                    as="span"
                                    animation="border"
                                    role="status"
                                    size="sm"
                                    aria-hidden="true"
                                    className="d-none mr-2"
                                />
                                Submit
                            </Button>
                        </Form>
                        <Alert
                            id="errorAlert"
                            className="d-none mt-4"
                            variant="danger"
                            onClose={() => clearError()}
                            dismissible
                        >
                            <p id="errorMessage" />
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginForm;