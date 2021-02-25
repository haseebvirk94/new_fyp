import React, { Component } from "react";
import axios, { post, put } from "axios";
import { Link } from "react-router-dom";
import ActionTypes from "../../constants/actiontypes.js";

import { connect } from "react-redux";
import img1 from "../Images/12.jpg";
import "../Course/spinner.css";
import messagegif from "../Images/gig1.png";
import Modal from "../Quiz/Modal";
const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  setSectionId: (sectionid) =>
    dispatch({ type: "setSectionId", payload: sectionid }),
    onQuizEnd: (next) => dispatch({ type: "Next", payload: next }),
    currentassessment: (id) =>
      dispatch({ type: "AddAssessmentConcept", payload: id }),
    currentenrollment: (id) =>
      dispatch({ type: "setEnrollment", payload: id }),
    onQuizLoad: (quiz) =>
      dispatch({ type: ActionTypes.Quiz.QuizLoad, payload: quiz }),
    setTotalSection:(count) =>
    dispatch({ type: "setTotalSections", payload: count }),
    setCompleteSection:(count) =>
    dispatch({ type: "setCompleteSections", payload: count }),
});
var rootStyle = {
  height: "100%",
};
class CourseSection extends Component
{
  state = {
      active:true,
      complete:false,
      available:true,
        courses:[],
        enrollment: [], 
        completed:[],
        enrolling:true, 
        isLoaded: false,
        ismessage:true,
        Model:false,
      };
      componentDidMount()
      {
        console.log(this.props.User.id);
        console.log(this.props.Courseid);
        let url = this.props.url+"/api/assessmentenrollment/?user_id="+this.props.User.id+"&course_id="+this.props.Courseid;
      axios.get(url).then((res) => {
        console.log(res.data);
        let courses=res.data.all;
        let enrolled=res.data.enrolled;
        let enrollements=[];
        let compeleted=[];
        // console.log("Data is ")
        console.log(res.data.all.length);
        // return;
        this.props.setTotalSection(res.data.all.length);
        for (let i=0 ; i< courses.length;i++)
        {
          for (let j=0;j<enrolled.length;j++)
          {
            
            if (courses[i].id==enrolled[j].assessment_id)
            {
              console.log(enrolled[j]);
              if(enrolled[j].is_active){
                let e=courses[i];
                e.eid=enrolled[j].id;
                e.is_active=enrolled[j].is_active;
                enrollements.push(e);
                courses.splice(i,1);
               
              }
              else
              {
                let e=courses[i];
                e.eid=enrolled[j].id;
                e.is_active=enrolled[j].is_active;
                compeleted.push(e);
                courses.splice(i,1);
               
              }
              
            }
            this.props.setCompleteSection(compeleted.length);
            console.log(this.props.TotalCourseSections);

          }
        }
        for ( let i=0; i<enrollements.length;i++)
        {
          console.log(enrollements[i])
          if(enrollements[i].is_active)
          {
            this.setState({enrolling:false,current:'active'})
          }
        }
        console.log(enrollements)
        console.log(courses);
        console.log(compeleted);
        this.setState({
          courses: courses,
          enrollments:enrollements,
          completed:compeleted,
          isLoaded: true,
        });
      });
      


      }
    enroll=(obj)=>{
      console.log(this.state.enrolling);
      this.props.currentassessment(obj.id);
      this.props.history.push("detailSection1/"+obj.id);
    // let url = this.props.url+"/api/quiz/?assessment_id=" + obj.id
    // axios.get(url).then((res) => {
    //   // Convert res.data.content to array
    //   let quiz = { name: "Sample Quiz", questions: res.data.Content };
    //   console.log(quiz);
    //   this.props.onQuizLoad(quiz);
    //   this.props.onQuizEnd("SectionLoad");
    //   this.props.history.push('/user/quiz')
    // })
    }
    timeline=(obj)=>
    {
      console.log(obj)
      this.props.currentenrollment(obj.eid);
      this.props.currentassessment(obj.id);
      this.props.history.push("Timeline")
  }
  timelineEnroll=(obj)=>
    {
      console.log(obj);
      this.props.currentassessment(obj.id);
      this.props.history.push("/user/detailSection1/"+obj.id);
  }
  handleactive=()=>
  {
    this.setState(
      {
        active:!(this.state.active)
      }
    );
  }
  handlecomplete=()=>
  {
    this.setState(
      {
        complete:!(this.state.complete)
      }
    );
  }
  handleavilable=()=>
  {
    this.setState(
      {
        available:!(this.state.available)
      }
    );
  }
  changemessage=()=>
  {
    this.setState({
      ismessage:!(this.state.ismessage)
    });
  }
  showModel=()=>
  {
    console.log("jasjdjadb");
    this.setState({
      Model:true
    });
  }
  closeHandler=()=>
  {
    this.setState({
      Model:false
    });
  }
 

    render()
    {
        return(
          <div style={rootStyle}>
            {this.state.Model? <div> return(<Modal head="Try to Enroll Section" body="You already have 1 section enrolled so you cannot enroll another section without completing previous section" closed={this.closeHandler}></Modal>)</div>:null}
            <Link to='/user/dashboard'>Dashboard</Link> /  <Link to='/user/CourseSection'>Section</Link>
            <br></br>
            <div class="row">
            <Link  className="btn col s6" to='/user/CourseSection'>Section</Link>  <Link  className="btn col s6" to='/user/progress' >Progress</Link> 
            </div>
            <br></br>
            <div className='row'>
              <label style={{marginLeft:"30px"}} class="col l3 s12 m6">
        <input type="checkbox" class="filled-in"  onChange={this.handleactive} defaultChecked={this.state.active} />
        <span >Active Sections</span>
      </label>
      <label style={{marginLeft:"30px"}}  class="col l3 s12 m6">
        <input type="checkbox" class="filled-in"  onChange={this.handlecomplete} defaultChecked={this.state.complete} />
        <span>Completed Sections</span>
      </label>
      <label style={{marginLeft:"30px"}}  class="col l3 s12 m5">
        <input type="checkbox" class="filled-in"  onChange={this.handleavilable} defaultChecked={this.state.available} />
        <span>Available Sections</span>
      </label>
            </div>
              <div>
                <h4>Sections</h4>
              {this.state.isLoaded?
               ( // content
                <div>
                {this.state.active ?
                  <div className="row" >
                    {this.state.enrollments.map((obj, key) => {
                      return (
                        
                        <div class="box col l4 m6 s12" onClick={() => this.timeline(obj)}>
                          <div>Active Sections</div>
                          <div class="card horizontal card1">
                            
                            <div class="center-align"><img class="img1"
                              src={img1} alt="Avatar" /></div>
                            <div class="card-stacked">
                              <div class="card-content">
                                <p class="flow-text">{obj.name}</p>
                                <br />
                                {obj.is_active ? <p style={{ fontSize: "12px" }}>Section in which you enrolled</p> : <p style={{ fontSize: "12px" }}>Section in which you enrolled</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                      })
                    }
                  </div>
                  :null
                }
                {this.state.complete ?
                  <div className="row" >
                    {this.state.completed.map((obj, key) => {
                      return (
                        <div class="col l4 m6 s12" onClick={() => this.timeline(obj)}>
                          <div>Completed Sections</div>
                          <div class="card horizontal card1">
                         
                            <div class="center-align"><img class="img1"
                              src={img1} alt="Avatar" /></div>
                            <div class="card-stacked">
                              <div class="card-content">
                                <p class="flow-text">{obj.name}</p>
                                <br />
                                {obj.is_active ? <p style={{ fontSize: "12px" }}>Section which are completed</p> : <p style={{ fontSize: "12px" }}>Section enrolled</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                      })
                    }
                  </div>
                  :null
                }
                {this.state.available ?
                  <div className="row" >
                    {this.state.courses.map((obj, key) => {
                      return (
                        <div class="col l4 m6 s12" onClick={() => this.state.enrolling?this.timelineEnroll(obj):this.showModel()}>
                          <div>Available Section</div>
                          <div class="card horizontal card1">
                            
                            <div class="center-align"><img class="img1"
                              src={img1} alt="Avatar" /></div>
                            <div class="card-stacked">
                              <div class="card-content">
                                <p class="flow-text">{obj.name}</p>
                                <br />
                                {obj.is_active ? <p style={{ fontSize: "12px" }}></p> : <p style={{ fontSize: "12px" }}>Section which are available</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                      })
                    }
                  </div>
                  :null
                }
                </div>
               )
                : 
                ( // spinner
                  <div class="preloader-wrapper big active spinner">
                    <div class="spinner-layer spinner-blue-only">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div><div class="gap-patch">
                        <div class="circle"></div>
                      </div><div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>
                  </div>
                )
              }
          </div>
          <div class="callout" >
          {this.state.ismessage ?(
            <div>   
         <img src={messagegif} style={{height:"70px",width:"70px"}}></img>
  <div class="callout-container white" onClick={this.changemessage}>
    <p>Available Active and Completed Sections will be shown after check box selection. You can see the detail of any section by click on it.</p>
  </div>
  </div>):(<div onClick={this.changemessage}>
  <i class="material-icons">insert_comment</i>
  </div>)}
</div>
        </div>
      );
        
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(CourseSection);