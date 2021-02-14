import React from 'react';
import {Table, OverlayTrigger, Tooltip, Button, Badge, Image, Row, Col, Container, Spinner} from "react-bootstrap";
import {PUBLIC_URL} from "../../../constants";
import PostsPaginator from "../../Posts/ListPostsPaginator";
import {getQueryParams} from "../../../helpers/common";
import {getPosts} from "../../../helpers/api";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: undefined, pagesCount: 1};
    }

    componentDidMount() {
        const queryParams = getQueryParams();
        const page = queryParams.page || 1;
        const perPage = queryParams.perPage || 10;

        getPosts(page, perPage)
            .then(res => {
                this.setState({
                    posts: res?.data?.posts || [],
                    pagesCount: res?.data?.pagesCount
                });
            });
    }

    render() {
        const renderTooltip = (props, imageLink) => (
            <Tooltip id="button-tooltip" {...props}>
                <Image className="min-vh-60 " src={PUBLIC_URL + imageLink} fluid/>
            </Tooltip>
        );

        const { posts, pagesCount } = this.state;
        return typeof posts === 'undefined'
            ? ( <Spinner className="mt-4" animation="border"/>)
            : (
            <Container fluid>
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
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post, i) => {
                           const postDescription = post.description.length > 180
                               ? post.description.substring(0, 180) + '...'
                               : post.description;
                           const imageName = post.image_link.split('/').pop();
                           return (
                               <tr>
                                <td className="align-middle">{post.id}</td>
                                <td className="align-middle">{post.title}</td>
                                <td className="align-middle ">{postDescription}</td>
                                <td className="align-middle">
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{show: 250, hide: 400}}
                                        overlay={renderTooltip(this, post.image_link)}
                                    >
                                        <Badge variant="info">{imageName}</Badge>
                                    </OverlayTrigger>
                                </td>
                                <td className="align-middle">{post.created_at}</td>
                                <td className="align-middle">{post.updated_at}</td>
                                <td className="align-middle">
                                    <Button href={"admin/posts/" + post.id + "/edit"} variant="outline-primary">
                                        Edit
                                    </Button></td>
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