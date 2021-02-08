import React from 'react';
import Form from 'react-bootstrap/Form'

function Password() {
    return(
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>
    )
}
export default Password;