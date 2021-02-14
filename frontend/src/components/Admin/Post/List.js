import React from 'react';
import {Table, OverlayTrigger, Tooltip, Button, Badge, Image, Row, Container} from "react-bootstrap";
import {PUBLIC_URL} from "../../../constants";
import PostsPaginator from "../../Posts/ListPostsPaginator";

function List() {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <Image className="min-vh-60 " src={PUBLIC_URL + "/images/1.jpg"} fluid />
        </Tooltip>
    );

    return(
        <Container>
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
                    <th />
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="align-middle">1</td>
                    <td className="align-middle">Some title here</td>
                    <td className="align-middle">The description (shortened)</td>
                    <td className="align-middle">
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <Badge variant="info">1.jpg</Badge>
                        </OverlayTrigger>
                    </td>
                    <td className="align-middle">21-10-2020</td>
                    <td className="align-middle">15-12-2020</td>
                    <td className="align-middle"><Button href="posts/1/edit" variant="outline-primary">Edit</Button></td>
                </tr>
                </tbody>
            </Table>
        </Row>
        <Row className="pt-4 justify-content-md-center">
            <PostsPaginator pages={[1]} />
        </Row>
        </Container>
    )
}
export default List;