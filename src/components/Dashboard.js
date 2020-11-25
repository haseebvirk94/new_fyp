import React, { Component } from "react";

import NavBar from "./NavBar";
import Preloader from "./PreLoader";
import img1 from "../style/images/course/teacher/t-1.jpg";
import axios, { post, put } from "axios";

import { connect } from "react-redux";
import { Link ,withRouter} from "react-router-dom";
const mapStateToProps = (state) => ({
    ...state,
  });
  const mapDispatchToProps = (dispatch) => ({
    setCourseId: (courseid) =>
      dispatch({ type: "setCourseId", payload: courseid }),
  });
class Dashboard extends Component
{
    state = {
        courses: [],
        enrollments:[],
        isLoaded: false,
        imageUrl: this.props.url+"/contentmanager/media/",
        ismessage:true,
      };
      componentDidMount() {
        this.load();
      }
      load=()=>
  {

    
    let url = this.props.url+"/api/courseEnrollment/?id="+this.props.User.id;
    axios.get(url).then((res) => {
      let courses=res.data.courses;
      let enroll=res.data.enrollments;
      let enrollements=[];
      for (let i=0 ; i< courses.length;i++)
      {
        for (let j=0;j<enroll.length;j++)
        {
          if (courses[i].id==enroll[j].course_id)
          {
            enrollements.push(courses[i])
            courses.splice(i,1);
          }
        }
      }
      console.log(enrollements)
      console.log(courses)
      this.setState({
        courses: courses,
        enrollments:enrollements,
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
                     
                        {this.state.enrollments.map((obj,key)=>
                        {
                          return(
                        <div key={key} class="col-lg-4 col-md-6">
                            <div class="singel-course mt-30">
                                <div class="thum">
                                    <div class="image">
                                        <img src={this.state.imageUrl + obj.thumbnail}alt="Course"/>
                                    </div>
                                    <div class="price">
                                        <span>Active</span>
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard));