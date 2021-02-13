import React from 'react';
import Form from 'react-bootstrap/Form'

function Username() {
    return(
        <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
    )
}
export default Username;