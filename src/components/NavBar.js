import React, { Component } from "react";

import img1 from "../style/images/logo.png";

import img3 from "../style/images/all-icon/map.png";
import img4 from "../style/images/all-icon/email.png"
import { Link } from "react-router-dom";

class NavBar extends Component
{
    render()
    {
        return(
            <div>
                <div class="header-top d-none d-lg-block">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="header-contact text-lg-left text-center">
                            <ul>
                                <li><img src={img3} alt="icon"/><span>127/5 Mark street, New york</span></li>
                                <li><img src={img4} alt="icon"/><span>info@yourmail.com</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="header-opening-time text-lg-right text-center">
                            <p>Opening Hours : Monday to Saturay - 8 Am to 5 Pm</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
            <div class="header-logo-support pt-30 pb-30" style={{marginTop:"30px",marginBottom:"30px"}}>
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-4">
                        <div class="logo">
                            <a href="index-2.html">
                                <img src={img1} alt="Logo"/>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-8">
                        <div class="support-button float-right d-none d-md-block">
                            <div class="support float-left">
                                <div class="icon">
                                    {/* <img src={img2} alt="icon"/> */}
                                
                                <div class="cont">
                                    <p>Need Help? call us free</p>
                                    <span>321 325 5678</span>
                                </div>
                            </div>
                            <div class="button float-left">
                                <a href="#" class="main-btn">Login</a>
                            </div>
                            <div class="button float-left">
                                <a href="#" class="main-btn">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>        
        <div class="navigation">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 col-md-10 col-sm-9 col-8">
                        <nav class="navbar navbar-expand-lg">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>

                            <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                <ul class="navbar-nav mr-auto">
                                    <li class="nav-item">
                                        <Link class="acive" to="/Home">Home</Link>
                                        
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/About">About us</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/Courses">Courses</Link>
                                       
                                    </li>
                                  
                                   
                                   
                                    
                                    <li class="nav-item">
                                        <a href="contact.html">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </nav> 
                    </div>
                    
                </div> 
            </div> 
        </div>
        </div>
        </div>
        

        )
    }
} 
export default NavBar;