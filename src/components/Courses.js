import React, { Component } from "react";

import NavBar from "./NavBar";
import img2 from "../style/images/course/cu-1.jpg";
import img1 from "../style/images/course/teacher/t-1.jpg";
import axios, { post, put } from "axios";
import Preloader from "./PreLoader";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const mapStateToProps = (state) => ({
    ...state,
  });
  const mapDispatchToProps = (dispatch) => ({
    setCourseId: (courseid) =>
      dispatch({ type: "EditCourse", payload: courseid }),
  });
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
          console.log(this.state.courses);
        });
      }
      courseTest = (courseid) => {
        this.props.setCourseId(courseid);
        this.props.history.push("SingleCourse")
      };
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
                     
                        {this.state.courses.map((obj,key)=>
                        {
                          return(
                        <div key={key} class="col-lg-4 col-md-6">
                            <div class="singel-course mt-30">
                                <div class="thum">
                                    <div class="image">
                                        <img src={this.state.imageUrl + obj.thumbnail}alt="Course"/>
                                    </div>
                                    <div class="price">
                                        <span>Free</span>
                                    </div>
                                </div>
                                <div class="cont">
                                   
                        <Link onClick={()=>this.courseTest(obj.id)}><h4>{obj.name}</h4></Link>
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
                          )
                        })}
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
export default connect(mapStateToProps,mapDispatchToProps)(Courses);