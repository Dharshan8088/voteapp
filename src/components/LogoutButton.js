import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import './LogoutButton.css';
import { Link } from "react-router-dom";

const LogoutButton = () => {
    const { user,logout, isAuthenticated} = useAuth0();
    return (
       isAuthenticated && (
        <>
        <Navbar className="navBar"  bg="warning" data-bs-theme="dark" >
            <Container>
               <Navbar.Brand className="navbar-head" href="#home">Online Voting System</Navbar.Brand>
               <Navbar.Toggle />
               <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text className="navbar-text">
                     Signed in as: <a href="#login">{user?.given_name}<img  className="user-img" src={user?.picture} alt="user-img" /></a>
                  </Navbar.Text>
                  <button className="sign-out-button" onClick={() => (logout())}>
            Sign Out
        </button>
               </Navbar.Collapse>
               
            </Container>
         </Navbar>
       
        </>
       )
    );
}

export default LogoutButton;
