import React from 'react';
import PostsPaginator from "./ListPostsPaginator";
import { Container, Spinner, Row, Col, Image, Card } from "react-bootstrap";
import { PUBLIC_URL } from "../../constants";
import {getQueryParams} from "../../helpers/common";
import {getPosts} from "../../helpers/api";

class ListPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: undefined, pagesCount: 1 };
    }


    componentDidMount() {
        const queryParams = getQueryParams();
        const page = queryParams.page || 1;
        const perPage = queryParams.perPage || 10;

        getPosts(page, perPage)
            .then(res => {
                console.log(res)
                this.setState({
                    posts: res?.data?.posts || [],
                    pagesCount: res?.data?.pagesCount
                });
            } );
    }

    render () {
        const imageContainerStyle = {
            height: "200px",
            marginRight: "-30px"
        };

        const imageStyle = {
            objectFit: "cover",
            width: "100%",
            height: "100%",
        };
        const { posts, pagesCount } = this.state;

        return typeof posts === 'undefined'
            ? ( <Spinner className="mt-4" animation="border"/>)
            : (
            <Container>
                {posts.map((post, i) => {
                    return (
                        <Row key={post.id} className="my-4">
                            <Col key={post.id} xs={2} md={2} className="h-100 d-flex justify-content-right">
                                {/*holder.js/171x180*/}
                                <div style={imageContainerStyle}>
                                    <Image style={imageStyle} src={PUBLIC_URL + post.image_link} thumbnail/>
                                </div>
                                <Card.Link href={"posts/" + post.id} className="stretched-link"/>
                            </Col>
                            <Col xs={10} md={10} className="d-flex">
                                <Card className="w-100 text-left">
                                    <Card.Body>
                                        <Card.Link href="posts/1">
                                            <Card.Title className="text-dark">{post.title}</Card.Title>
                                        </Card.Link>
                                        <Card.Text>
                                            {post.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )
                })}
                <Row className="pt-4 justify-content-md-center">
                    <PostsPaginator pagesCount={pagesCount}/>
                </Row>
            </Container>
        )
    }
}
export default ListPosts;