import React from 'react';
import { withRouter } from "react-router";
import {PUBLIC_URL} from "../../constants";
import {Image, Container, Row, Col, Spinner} from "react-bootstrap";
import {getPost} from "../../helpers/api";

class ViewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { post: undefined };
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;

        getPost(postId)
            .then(res => this.setState({
                post: res?.data
            }));
    }

    render() {
        const imageStyling = {
            maxHeight: "600px",
            overflow: "hidden"
        }
        const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
        const { post } = this.state;

        return typeof post === 'undefined'
            ? ( <Spinner className="mt-4" animation="border"/>)
            : (
            <div>
                <h1>{post.title}</h1>
                <h4>
                    {(new Date(post.created_at)).toLocaleDateString('en-US', dateFormat)}
                </h4>
                <Container fluid>
                    <Row className="justify-content-center">
                        <div style={imageStyling} className="justify-content-center w-75 my-5" id="imageHeader">
                            <Image src={PUBLIC_URL + post.image_link} fluid />
                        </div>
                        <Col sm={10} className="text-left" id="content">
                            {post.content}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(ViewPost);