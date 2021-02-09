import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function PageNotFound() {
    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2>404</h2>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <div className="mb-4 lead">The page you are looking for was not found.</div>
                    <a href="/" className="btn btn-link">Back to Home</a>
                </Col>
            </Row>
        </Container>
    )
}
export default PageNotFound;