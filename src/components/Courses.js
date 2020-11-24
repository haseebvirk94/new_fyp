import React, { Component } from "react";

import NavBar from "./NavBar";
import img2 from "../style/images/course/cu-1.jpg";
import img1 from "../style/images/course/teacher/t-1.jpg";
import axios, { post, put } from "axios";
import Preloader from "./PreLoader";
class Courses extends Component
{
    state={
        courses: [],
    isLoaded: false,
    imageUrl: this.props.url+"/contentmanager/media/",
    }
    componentDidMount() {
        let url = this.props.url+"/api/courses/";
        axios.get(url).then((res) => {
          this.setState({
            courses: res.data.Content,
            isLoaded: true,
          });
        });
      }
    render()
    {
        return(

             <div>

                {this.state.isLoaded
              ? (<div>
                  <NavBar></NavBar>
                <section id="courses-part" class="pt-120 pb-120 gray-bg">
        <div class="container">
            
            
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="courses-grid" role="tabpanel" aria-labelledby="courses-grid-tab">
                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                            <div class="singel-course mt-30">
                                <div class="thum">
                                    <div class="image">
                                        <img src={img2}alt="Course"/>
                                    </div>
                                    <div class="price">
                                        <span>Free</span>
                                    </div>
                                </div>
                                <div class="cont">
                                   
                                    <a href="courses-singel.html"><h4>Learn basis javascirpt from start for beginner</h4></a>
                                    <div class="course-teacher">
                                        <div class="thum">
                                            <a href="#"><img src={img1} alt="teacher"/></a>
                                        </div>
                                        <div class="name">
                                            <a href="#"><h6>Mark anthem</h6></a>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="singel-course mt-30">
                                <div class="thum">
                                    <div class="image">
                                        <img src={img2}alt="Course"/>
                                    </div>
                                    <div class="price">
                                        <span>Free</span>
                                    </div>
                                </div>
                                <div class="cont">
                                    
                                    <a href="courses-singel.html"><h4>Learn basis javascirpt from start for beginner</h4></a>
                                    <div class="course-teacher">
                                        <div class="thum">
                                            <a href="#"><img src={img1} alt="teacher"/></a>
                                        </div>
                                        <div class="name">
                                            <a href="#"><h6>Mark anthem</h6></a>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div> 
                        
                        </div>
                        </div>
                        
                        </div>
                        
                     </div>
                     </div>
                        </section>
                        
                        </div>):(<Preloader></Preloader>)}
                       
            </div>
        )
    }
}
export default Courses;