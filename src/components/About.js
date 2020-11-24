import React, { Component } from "react";

import NavBar from "./NavBar";
import img1 from "../style/images/about/about-2.jpg";
class About extends Component
{
    render()
    {
        return(
          <div>
              <NavBar></NavBar>
              
    
    
    
    <section id="about-page" class="pt-70 pb-110">
        <div class="container">
            <div class="row">
                <div class="col-lg-5">
                    <div class="section-title mt-50">
                        <h5>About us</h5>
                        <h2>Welcome to Edubin </h2>
                    </div> 
                    <div class="about-cont">
                        <p>Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet . Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt  mauris. <br/> <br/> auci elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet . Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt  mauris</p>
                    </div>
                </div> 
                <div class="col-lg-7">
                    <div class="about-image mt-50">
                        <img src={img1} alt="About"/>
                    </div>
                </div> 
            </div> 
            <div class="about-items pt-60" style={{marginTop:"100px"}}>
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-6 col-sm-10">
                        <div class="about-singel-items mt-30">
                            <span>01</span>
                            <h4>Why Choose us</h4>
                            <p>Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit sollicitudirem quibibendum auci</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-10">
                        <div class="about-singel-items mt-30">
                            <span>02</span>
                            <h4>Our Mission</h4>
                            <p>Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit sollicitudirem quibibendum auci</p>
                        </div> 
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-10">
                        <div class="about-singel-items mt-30">
                            <span>03</span>
                            <h4>Our vission</h4>
                            <p>Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit sollicitudirem quibibendum auci</p>
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
export default About;