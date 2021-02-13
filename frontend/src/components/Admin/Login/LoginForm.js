import React from 'react';
import Header from './LoginHeader';
import Username from './Form/Username';
import Password from './Form/Password';
import { Alert, Form, Button, Container, Row, Col }  from 'react-bootstrap';
import { useAuth } from "../../../helpers/hooks/use-auth";

function LoginForm() {
    const auth = useAuth();
    let error = '';

    const submitLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        error = "baaah";
        auth.signin(username, password)
            .catch(e => error = e.message);
    };

    return(
        <div id="login">
            <Header/>
            <Container className="text-md-left mt-4 ml-2">
                <Row>
                    <Col sm={4}>
                        <Form controlId="login-form" className="form justify-content-md-start">
                            <Username/>
                            <Password/>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginForm;