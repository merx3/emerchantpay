import React from 'react';
import { useParams } from "react-router-dom";
import {Container, Form, Button, Row} from "react-bootstrap";

function Edit() {
    const { postId } = useParams();
    const waitingResponse = false;

    const submitLogin = async (e) => {
        e.preventDefault();
        if (waitingResponse) {
            return;
        }
        console.log(e.target);
    };

    return(
        <Container>
        <Row className="justify-content-center">
        <Form onSubmit={submitLogin} className="w-75" >
            <Form.Group controlId="postForm.title">
            <Form.Row>
                    <Form.Label className="align-left">Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" />
            </Form.Row>
            </Form.Group>
            <Form.Group controlId="postForm.description">
            <Form.Row >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} />
            </Form.Row>
            </Form.Group>
            <Form.Group controlId="postForm.description">
            <Form.Row >
                <Form.Label>Image</Form.Label>
                <Form.File
                    id="postImage"
                    label="1.jpg"
                    custom
                />
            </Form.Row>
            </Form.Group>
            <Form.Group controlId="postForm.content">
            <Form.Row >
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={4} />
            </Form.Row>
            </Form.Group>
            <Form.Row >
            <Button variant="primary" type="submit">
                Save
            </Button>
            </Form.Row >
        </Form>
        </Row>
        </Container>
    )
}
export default Edit;