import React, { Component } from "react";

import NavBar from "../style/NavBar";
import img1 from "../style/images/course/teacher/t-1.jpg";
import img2 from "../style/images/course/cu-1.jpg";
import img3 from "../style/images/course/teacher/t-3.jpg";
import img4 from "../style/images/your-make/y-1.jpg";


class SingleCourse extends Component
{
    render()
    {
        return(
            <div>
                <NavBar></NavBar>
                <section id="corses-singel" class="pt-90 pb-120 gray-bg">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="corses-singel-left mt-30">
                        <div class="title">
                            <h3>Learn basis javascirpt from start for beginner</h3>
                        </div> 
                        
                        
                        <div class="corses-singel-image pt-50" style={{marginTop:"30px"}}>
                            <img src={img2} alt="Courses"/>
                        </div> 
                        
                        <div class="corses-tab mt-30">
                           
                            
                            <div class="tab-content" id="myTabContent" style={{marginTop:"30px"}}>
                                <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                    <div class="overview-description">
                                        <div class="singel-description pt-40">
                                            <h6>Course Summery</h6>
                                            <p>Lorem ipsum gravida nibh vel velit auctor aliquetn sollicitudirem quibibendum auci elit cons equat ipsutis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus .</p>
                                        </div>
                                        <div class="singel-description pt-40">
                                        
                                    <div class="curriculam-cont">
                                        <div class="title">
                                            <h6>Learn basis javascirpt Lecture Started</h6>
                                        </div>
                                        <div class="accordion" id="accordionExample">
                                        <div class="card">
                                                <div class="card-header" id="headingSeven">
                                                    <a href="#" data-toggle="collapse" class="collapsed" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                                        <ul>
                                                            <li><i class="fa fa-file-o"></i></li>
                                                            <li><span class="lecture">Lecture 1.7</span></li>
                                                            <li><span class="head">What is javascirpt</span></li>
                                                            <li><span class="time d-none d-md-block"><i class="fa fa-clock-o"></i> <span> 00.30.00</span></span></li>
                                                        </ul>
                                                    </a>
                                                </div>
                                                <div id="collapseSeven" class="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                                                    <div class="card-body">
                                                        <p>Ut quis scelerisque risus, et viverra nisi. Phasellus ultricies luctus augue, eget maximus felis laoreet quis. Maecenasbibendum tempor eros.</p>
                                                    </div>
                                                </div>
                                            </div>
                                    </div> 
                                </div>
                                        </div>
                                    </div> 
                                </div>
                                
                            </div> 
                        </div>
                    </div> 
                    
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-lg-12 col-md-6">
                            <div class="course-features mt-30">
                               <h4>Course Features </h4>
                                <ul>
                                    <li><i class="fa fa-clock-o"></i>Duaration : <span>10 Hours</span></li>
                                    <li><i class="fa fa-clone"></i>Leactures : <span>09</span></li>
                                    <li><i class="fa fa-beer"></i>Quizzes :  <span>05</span></li>
                                    <li><i class="fa fa-user-o"></i>Students :  <span>100</span></li>
                                </ul>
                                <div class="price-button pt-10">
                                    <span>Price : <b>$25</b></span>
                                    <a href="#" class="main-btn">Enroll Now</a>
                                </div>
                            </div> 
                        </div>
                        <div class="col-lg-12 col-md-6">
                            <div class="You-makelike mt-30">
                                <h4>You make like </h4> 
                                <div class="singel-makelike mt-20">
                                    <div class="image">
                                        <img src={img4} alt="Image"/>
                                    </div>
                                    <div class="cont">
                                        <a href="#"><h4>Introduction to machine languages</h4></a>
                                        <ul>
                                            <li><a href="#"><i class="fa fa-user"></i>31</a></li>
                                            <li>$50</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="singel-makelike mt-20">
                                    <div class="image">
                                        <img src={img4} alt="Image"/>
                                    </div>
                                    <div class="cont">
                                        <a href="#"><h4>How to build a basis game with java </h4></a>
                                        <ul>
                                            <li><a href="#"><i class="fa fa-user"></i>31</a></li>
                                            <li>$50</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="singel-makelike mt-20">
                                    <div class="image">
                                        <img src={img4} alt="Image"/>
                                    </div>
                                    <div class="cont">
                                        <a href="#"><h4>Basic accounting from primary</h4></a>
                                        <ul>
                                            <li><a href="#"><i class="fa fa-user"></i>31</a></li>
                                            <li>$50</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="row">
                <div class="col-lg-8">
                    <div class="releted-courses pt-95">
                        <div class="title">
                            <h3>Releted Courses</h3>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="singel-course mt-30">
                                    <div class="thum">
                                        <div class="image">
                                            <img src={img2} alt="Course"/>
                                        </div>
                                        <div class="price">
                                            <span>Free</span>
                                        </div>
                                    </div>
                                    <div class="cont">
                                        <ul>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                        </ul>
                                        <span>(20 Reviws)</span>
                                        <a href="courses-singel.html"><h4>Learn basis javascirpt from start for beginner</h4></a>
                                        <div class="course-teacher">
                                            <div class="thum">
                                                <a href="#"><img src={img3} alt="teacher"/></a>
                                            </div>
                                            <div class="name">
                                                <a href="#"><h6>Mark anthem</h6></a>
                                            </div>
                                            <div class="admin">
                                                <ul>
                                                    <li><a href="#"><i class="fa fa-user"></i><span>31</span></a></li>
                                                    <li><a href="#"><i class="fa fa-heart"></i><span>10</span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div class="col-md-6">
                                <div class="singel-course mt-30">
                                    <div class="thum">
                                        <div class="image">
                                            <img src={img2} alt="Course"/>
                                        </div>
                                        <div class="price">
                                            <span>Free</span>
                                        </div>
                                    </div>
                                    <div class="cont">
                                        <ul>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                        </ul>
                                        <span>(20 Reviws)</span>
                                        <a href="courses-singel.html"><h4>Learn basis javascirpt from start for beginner</h4></a>
                                        <div class="course-teacher">
                                            <div class="thum">
                                                <a href="#"><img src={img3} alt="teacher"/></a>
                                            </div>
                                            <div class="name">
                                                <a href="#"><h6>Mark anthem</h6></a>
                                            </div>
                                            <div class="admin">
                                                <ul>
                                                    <li><a href="#"><i class="fa fa-user"></i><span>31</span></a></li>
                                                    <li><a href="#"><i class="fa fa-heart"></i><span>10</span></a></li>
                                                </ul>
                                            </div>
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
    
            </div>
        )
    }
}
export default SingleCourse;