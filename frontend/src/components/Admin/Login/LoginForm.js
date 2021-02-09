import React from 'react';
import Header from './LoginHeader';
import Username from './Form/Username';
import Password from './Form/Password';
import { Form, Button, Container, Row, Col }  from 'react-bootstrap';

function LoginForm() {
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
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginForm;