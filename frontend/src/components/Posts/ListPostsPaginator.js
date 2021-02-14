import React from 'react';
import { Pagination } from "react-bootstrap";
import { getQueryParams } from "../../helpers/common";

export default class Paginator extends React.Component {
    render() {
        const pagesCount = this.props.pagesCount;
        let pages = [...Array(pagesCount).keys()];
        if (pages.length > 5) {
            pages = pages.slice(0, 5);
            pages.push('...');
        }
        let currentPage = 1;
        if (window.location.search) {
            const queryParams = getQueryParams();
            for (const paramName in queryParams) {
                const paramValue = queryParams[paramName];
                if (paramName === 'page') {
                    currentPage = parseInt(paramValue);
                }
            }
        }
        let nextPage = currentPage + 1;
        let prevPage = currentPage - 1;

        return(
            <Pagination >
                <Pagination.First href='/' disabled={currentPage === 1}/>
                <Pagination.Prev href={"?page=" + prevPage} disabled={currentPage === 1}/>
                {pages.map(page => {
                    if (page === '...') {
                        return (<Pagination.Ellipsis />);
                    }

                    page++;
                    const isActive = page === currentPage;
                    return (<Pagination.Item key={page} active={isActive} href={"?page=" + page}>{page}</Pagination.Item>);
                })}
                <Pagination.Next href={"?page=" + nextPage} disabled={currentPage === pagesCount}/>
                <Pagination.Last href={"?page=" + pagesCount} disabled={currentPage === pagesCount}/>
            </Pagination>
        )
    }
}
