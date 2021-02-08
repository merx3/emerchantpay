import React from 'react';
import Header from './LoginHeader';
import Username from './Form/Username';
import Password from './Form/Password';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm() {
    return(
        <div id="login">
            <Header/>
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <Form controlId="login-form" className="form">
                                <h3 className="text-center text-info">Login</h3>
                                <Username/>
                                <Password/>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <form id="login-form" >
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;