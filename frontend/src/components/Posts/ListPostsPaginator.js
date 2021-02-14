import React from 'react';
import { Pagination } from "react-bootstrap";

export default class Paginator extends React.Component {
    render() {
        return(
            <Pagination >
                <Pagination.First />
                <Pagination.Prev />
                {this.props.pages.map(page => {
                    if (page === '...') {
                        return (<Pagination.Ellipsis />);
                    }

                    let currentPage = 1;
                    if (window.location.search) {
                        const queryParams = window.location.search
                            .replace('?', '')
                            .split('&');
                        queryParams.forEach(params => {
                            const [paramName, paramValue] = params.split('=');
                            if (paramName === 'page') {
                                currentPage = parseInt(paramValue) === page;
                            }
                        });
                    }
                    const isActive = page === currentPage;
                    return (<Pagination.Item active={isActive} href="posts?page={page}">{page}</Pagination.Item>);
                })}
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        )
    }
}
