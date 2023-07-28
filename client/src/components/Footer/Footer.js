import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Footer() {
    return (
        <Navbar expand="md" className="justify-content-center navbar-top" fixed="bottom" style={{ border: "1px solid #FFFFFF", zIndex: "-1" }}>
            <Nav className="me-auto">
                <Nav>
                    Developers | FE : Lee DongWook | BE : Hong YongHyeon , Choi SeongBo
                </Nav>
            </Nav>
        </Navbar>
    )
}

export default Footer;