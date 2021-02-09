import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from "../helpers/hooks/use-auth";

function CustomNavbar() {
    const auth = useAuth();

    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">eMerchantPay</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/admin/posts">Admin</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                {auth.user ? (
                    <Button onClick={() => auth.signout()} variant="outline-info">Logout</Button>
                ) : (
                    <Button href="/admin/login" variant="outline-info">Login admin</Button>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}
export default CustomNavbar;