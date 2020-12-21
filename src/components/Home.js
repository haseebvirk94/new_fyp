import React, { Component } from "react";

import NavBar from "./NavBar";

import img3 from "../style/images/slider/s-2.jpg";
import { Link } from "react-router-dom";

class Home extends Component
{
    
    render()
    {
        return(
            <div >
            <NavBar></NavBar>
            
            <section id="slider-part" class="slider-active">
        <div class="single-slider bg_cover pt-150" style={{backgroundImage: `url(${img3})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "625px"}} data-delay="4">
            <div class="container">
                <div class="row">
                    <div class="col-xl-7 col-lg-9" style={{marginTop:"90px"}}>
                        <div class="slider-cont">
                            <h1 data-animation="bounceInLeft" data-delay="1s" style={{fontSize:"50px"}}>Choose the right theme for education</h1>
                            <p data-animation="fadeInUp" data-delay="1.3s">Donec vitae sapien ut libearo venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt  Sed fringilla mauri amet nibh.</p>
                            <ul>
                                <li><Link to='courses' data-animation="fadeInUp" data-delay="1.9s" class="main-btn main-btn-2" >Access Yourself</Link></li>
                            </ul>
                        </div>
                    </div>
                </div> 
            </div> 
        </div> 
        
        
        
        
    </section>
    </div>
         
      
       
    
       
    
    
    

        )

    }
}
export default Home;