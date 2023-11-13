import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Result from "./Result";
import './LogoutButton.css';
import upArrow from '../images/arrow-bend-right-up.svg';

const LoginButton = () => {
    const { user, loginWithRedirect, isAuthenticated} = useAuth0();
    return (
       !isAuthenticated && (
        <>
        <Navbar  bg="warning" data-bs-theme="dark" >
            <Container>
               <Navbar.Brand className="navbar-head" href="#home">Online Voting System</Navbar.Brand>
               <Navbar.Toggle />
               <Navbar.Collapse className="justify-content-end">
                  
                  <button className="sign-in-button" onClick={() => loginWithRedirect()}>
            Sign In
        </button>
               </Navbar.Collapse>
               
            </Container>
         </Navbar>
         <div className="instructions">
         <div className="instructions1">
            
            <p><img src={upArrow} alt="up-arrow" /></p>
         </div>
         <div className="instructions2">
            <p>Log in to particpate in the election</p>
            
         </div>
         </div>
         <Result />
    </>
        
       )
    );
}

export default LoginButton;
