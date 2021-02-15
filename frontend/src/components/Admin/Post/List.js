import React from 'react';
import {Table, OverlayTrigger, Tooltip, Button, Badge, Image, Row, Col, Container, Spinner} from "react-bootstrap";
import {PUBLIC_URL} from "../../../constants";
import PostsPaginator from "../../Posts/ListPostsPaginator";
import {getQueryParams} from "../../../helpers/common";
import {getPosts, deletePost} from "../../../helpers/api";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: undefined, pagesCount: 1, deleteId: null};
    }

    componentDidMount() {
        const queryParams = getQueryParams();
        const page = queryParams.page || 1;
        const perPage = queryParams.perPage || 10;

        getPosts(page, perPage)
            .then(res => {
                this.setState({
                    posts: res?.data?.posts || [],
                    pagesCount: res?.data?.pagesCount,
                    deleteId: null
                });
            });
    }

    render() {
        const renderTooltip = (props, imageLink) => (
            <Tooltip id="button-tooltip" {...props}>
                <Image className="min-vh-60 " src={PUBLIC_URL + imageLink} fluid/>
            </Tooltip>
        );

        const handleDeletePost = async (id) => {
            this.setState({
                ...this.state,
                deleteId: id
            });
            await deletePost(id);
            window.location.reload(true);
        }

        const { posts, pagesCount } = this.state;
        return typeof posts === 'undefined'
            ? ( <Spinner className="mt-4" animation="border"/>)
            : (
            <Container className="mx-5" style={{width: "auto"}} fluid>
                <Row>
                    <Button className="my-4" variant="primary" href="posts/create">Create new post</Button>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Date</th>
                            <th>Updated</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post, i) => {
                           const postDescription = post.description.length > 140
                               ? post.description.substring(0, 140) + '...'
                               : post.description;
                           const imageName = post.image_link.split('/').pop();
                           return (
                               <tr key={post.id}>
                                <td className="align-middle">{post.id}</td>
                                <td className="align-middle">{post.title}</td>
                                <td className="align-middle">{postDescription}</td>
                                <td className="align-middle">
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{show: 250, hide: 400}}
                                        overlay={renderTooltip(this, post.image_link)}
                                    >
                                        <Badge variant="info">{imageName}</Badge>
                                    </OverlayTrigger>
                                </td>
                                <td className="align-middle">{post.created_at.split(' ').shift()}</td>
                                <td className="align-middle">{post.updated_at.split(' ').shift()}</td>
                                <td className="align-middle">
                                    <Button href={"posts/" + post.id + "/edit"} variant="outline-primary">
                                        Edit
                                    </Button>
                                </td>
                                   <td className="align-middle">
                                       <Button onClick={() => handleDeletePost(post.id)}
                                               variant="outline-danger"
                                               disabled={this.state.deleteId === post.id}
                                       >
                                           { this.state.deleteId === post.id
                                               ? (<Spinner animation="border" size="sm" />)
                                               : 'Delete'
                                           }
                                       </Button>
                                   </td>
                            </tr>)
                        })}
                        </tbody>
                    </Table>
                </Row>
                <Row className="pt-4 justify-content-md-center">
                    <PostsPaginator pagesCount={pagesCount}/>
                </Row>
            </Container>
        )
    }
}
export default List;