import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Button} from "react-bootstrap";

function NavBar() {
    return (
        <Navbar bg="primary" variant="dark">
            <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav>
            <Button variant={"light"} href={"/logout"}>Logout</Button>
        </Navbar>
    )

    // return (
    //     <Navbar bg="primary" variant="dark">
    //         <Navbar.Brand href="/home">Tribute</Navbar.Brand>
    //         <Nav className="mr-auto">
    //             <Nav.Link href="/posts">Posts</Nav.Link>
    //             <Nav.Link href="/volunteers">Volunteers</Nav.Link>
    //             <Nav.Link href="/orgs">Orgs</Nav.Link>
    //             <Nav.Link href="/events">Events</Nav.Link>
    //         </Nav>
    //
    //         <Button variant={"light"} href={"/login"}>Login</Button>
    //     </Navbar>
    // )
}

export default NavBar