import React from 'react';
import PostsPaginator from "./ListPostsPaginator";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { PUBLIC_URL } from "../../constants";

function ListPosts() {
    const imageContainerStyle = {
        "height": "200px",
        "margin-right": "-30px"
    };

    const imageStyle = {
        "object-fit": "cover",
        "width": "100%",
        "height": "100%",
    };

    return(
        <Container>
            <Row className="my-4">
                <Col xs={2} md={2} className="h-100 d-flex justify-content-right">
                    {/*holder.js/171x180*/}
                    <div style={imageContainerStyle}>
                        <Image style={imageStyle} src={PUBLIC_URL + "/images/1.jpg"} thumbnail />
                    </div>
                    <Card.Link href="posts/1" className="stretched-link" />
                </Col>
                <Col xs={10} md={10} className="d-flex">
                    <Card className="w-100 text-left">
                        <Card.Body>
                            <Card.Link href="posts/1">
                                <Card.Title className="text-dark">Card title</Card.Title>
                            </Card.Link>
                            <Card.Text>
                                This is a demo post to show how the blog post will look like. And this is the description part, that  will be shown on the posts listing. LOREM IPSUM TIME! Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. d convallis tristique sem. d convallis tristique sem. d convallis trsdf
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="my-4">
                <Col xs={2} md={2} className="d-flex justify-content-right">
                    {/*holder.js/171x180*/}
                    <div style={imageContainerStyle}>
                        <Image style={imageStyle} src={PUBLIC_URL + "/images/2.jpg"} thumbnail />
                        <Card.Link href="posts/2" className="stretched-link" />
                    </div>
                </Col>
                <Col xs={10} md={10} className="d-flex">
                    <Card className="w-100 text-left">
                        <Card.Body>
                            <Card.Link href="posts/2">
                                <Card.Title className="text-dark">Card title</Card.Title>
                            </Card.Link>
                            <Card.Text>
                                This is
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="pt-4 justify-content-md-center">
                <PostsPaginator pages={[1]} />
            </Row>
        </Container>
    )
}
export default ListPosts;