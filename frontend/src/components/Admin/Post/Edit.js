import React from 'react';
import {Container, Form, Button, Row, Spinner} from "react-bootstrap";
import {getPost, savePost} from "../../../helpers/api";
import {withRouter} from "react-router";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { post: undefined, fileInputLabel: "Upload Image" };
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        if (!postId) {
            this.setState({ post: false });
            return;
        }

        getPost(postId)
            .then(res => this.setState({
                post: res?.data,
                fileInputLabel: res?.data?.image_link
            }));
    }

    render() {
        const { post } = this.state;
        const { history } = this.props;
        const waitingResponse = false;

        const submitLogin = async (e) => {
            e.preventDefault();
            if (waitingResponse) {
                return;
            }

            const { title, description, image, content } = e.target;

            const data = {
                id: this.state.post?.id || '',
                title: title.value,
                description: description.value,
                image: image.files[0],
                content: content.value,
            }

            await savePost(data);

            history.push('/admin/posts');
        };

        return typeof post === 'undefined'
            ? ( <Spinner className="mt-4" animation="border"/>)
            : (
            <Container>
            <Row className="justify-content-center">
            <Form onSubmit={submitLogin} className="w-75" >
                <Form.Group controlId="title">
                <Form.Row>
                    <Form.Label className="align-left">Title</Form.Label>
                    <Form.Control required type="text" placeholder="Title" defaultValue={post?.title} />
                </Form.Row>
                </Form.Group>
                <Form.Group controlId="description">
                <Form.Row >
                    <Form.Label>Description</Form.Label>
                    <Form.Control required as="textarea" rows={4} defaultValue={post?.description} />
                </Form.Row>
                </Form.Group>
                <Form.Group controlId="image">
                <Form.Row >
                    <Form.Label>Image</Form.Label>
                    <Form.File
                        id="postImage"
                        required={!this.state.fileInputLabel}
                        type="file"
                        name="image"
                        label={this.state.fileInputLabel}
                        accept=".jpg,.gif,.png"
                        onChange={(e) => this.setState({
                            ...this.state,
                            fileInputLabel: e.target.files[0].name}
                        )}
                        custom
                    />
                </Form.Row>
                </Form.Group>
                <Form.Group controlId="content">
                <Form.Row >
                    <Form.Label>Content</Form.Label>
                    <Form.Control required as="textarea" rows={15} defaultValue={post?.content}  />
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
}

export default withRouter(Edit);