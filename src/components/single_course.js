import React, { Component } from "react";

import NavBar from "./NavBar";
import axios, { post, put } from "axios";
import Preloader from "./PreLoader";
import { connect } from "react-redux";
import ActionTypes from "../constants/actiontypes";

import img2 from "../style/images/course/cu-1.jpg";
import img3 from "../style/images/course/teacher/t-3.jpg";
import img4 from "../style/images/your-make/y-1.jpg";

const mapStateToProps = (state) => ({
    ...state,
});
const mapDispatchToProps = (dispatch) => ({
    onQuizEnd: (next) => dispatch({ type: "Next", payload: next }),
    currentassessment: (id) =>
      dispatch({ type: "AddAssessmentConcept", payload: id }),
    onQuizLoad: (quiz) =>
      dispatch({ type: ActionTypes.Quiz.QuizLoad, payload: quiz }),
  });
class SingleCourse extends Component
{
    state={
        courses: {},
        assessments:[],
        concepts:[],
        conceptLoaded:false,
        isLoaded: false,
        imageUrl: this.props.url+"/contentmanager/media/",
    }
    componentDidMount() {
        let id=this.props.Courseid;
        let url = this.props.url+"/api/courses/?id="+id;
        axios.get(url).then((res) => {
          this.setState({
            courses: res.data.Content,
          });
          console.log(this.state.courses);
        });
        url = this.props.url+"/api/assessments/?course_id="+id;
        axios.get(url).then((res) => {
            
            let assessments= res.data.Content;
            this.setState({
                assessments:assessments,
                isLoaded: true,
              });
          });

      }
    getConcept=(id)=>{
        this.setState({conceptLoaded:false})
        let url = this.props.url+"/api/assessments/?assessment_id="+id;
        axios.get(url).then((res) => {
            let concepts=res.data.Content;
            this.setState({concepts:concepts,conceptLoaded:true})
            console.log(concepts);
        });
    }
    takeTest = () => {
        this.setState({conceptLoaded:false})
        let url = this.props.url + "/api/conceptincourse/?id=" + this.props.Courseid;
        axios.get(url).then((res) => {
            let concepts = res.data.Content;
            let ids = [];
            for (let i = 0; i < concepts.length && i < 3; i++)
            {
                ids.push(concepts[i].id);
            }
            if (ids.length > 0) {
                console.log(ids);
                let url = this.props.url+"/api/quiz/?ids=" + ids;
                axios.get(url).then((res) => {
                    let quiz = { name: "Sample Quiz", questions: res.data.Content };
                    console.log(quiz);
                    this.props.onQuizLoad(quiz);
                    this.props.onQuizEnd("HomeLoad");
                    this.props.history.push("/quiz");
                });
                }
            }); 
    }
    render()
    {
        return(
            <div>
                {this.state.isLoaded
              ? (
                <div>
                <NavBar></NavBar>
                <section id="corses-singel" class="pt-90 pb-120 gray-bg">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="corses-singel-left mt-30">
                        <div class="title">
              <h3>{this.state.courses.name}</h3>
                        </div> 
                        
                        <div class="corses-singel-image pt-50" style={{marginTop:"30px"}}>
                            <img src={this.state.imageUrl + this.state.courses.thumbnail} alt="Courses"/>
                        </div> 
                        
                        <div class="corses-tab mt-30">
                           
                            
                            <div class="tab-content" id="myTabContent" style={{marginTop:"30px"}}>
                                <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                    <div class="overview-description">
                                        <div class="singel-description pt-40">
                                            <h6>Course Description</h6>
              <p>{this.state.courses.description}</p>
                                        </div>
                                        <div class="singel-description pt-40">
                                        
                                    <div class="curriculam-cont">
                                        <div class="title">
              <h6>Assessments</h6>
                                        </div>
                                        <div class="accordion" id="accordionExample" >

                                        {this.state.assessments.map((obj,key)=>
                                        {
                                            return(<div class="card">
                                                <div class="card-header" id="headingSeven">
                                                    <a href="#" onClick={()=>this.getConcept(obj.id)} data-toggle="collapse" class="collapsed" data-target={"#collapseSeven"+key} aria-expanded="false" aria-controls="collapseSeven">
                                                        <ul>
                                                            <li><i class="fa fa-file-o"></i></li>
                                        <li><span class="lecture">{obj.name}</span></li>
                                                            <li><span class="head"></span></li>
                                                            <li><span class="time d-none d-md-block"><i class="fa fa-clock-o"></i> <span> 00.30.00</span></span></li>
                                                        </ul>
                                                    </a>
                                                </div>
                                                <div id={"collapseSeven"+key} class="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                                                    <div class="card-body">
                                        {this.state.conceptLoaded? this.state.concepts.map((obj,key)=>{return(<li id={key}>{obj.name}</li>)}) :"loading...."}
                                                    </div>
                                                </div>
                                            </div>
                                         ) })}
                        


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
                                <div class="price-button pt-10" >
                                    <button onClick={this.takeTest} class="main-btn">Take Test  </button>
                                </div>
                                <div class="price-button pt-10" style={{marginTop:"30px"}}>
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
            
                            
                                   
                             
                           
                       
                           
        </div>
    </section>
    </div>
    ):(<Preloader></Preloader>)}
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SingleCourse);