import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';

function NavBar(){
    return(
        <Navbar expand="md" className="justify-content-center navbar-top" fixed="top" style={{border:"1px solid", marginTop:"5%"}}>
            <Nav className="me-auto">
                <Nav.Link>
                    Home
                </Nav.Link>
                <Nav.Link>
                    Login
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavBar;