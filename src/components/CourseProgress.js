import React, { Component } from "react";

import NavBar from "./NavBar";
import Preloader from "./PreLoader";

import axios, { post, put } from "axios";
import { Container,Row, Col, Table } from "react-bootstrap";

import Card from "./Card";
import { connect } from "react-redux";
import { Link ,withRouter} from "react-router-dom";
const mapStateToProps = (state) => ({
    ...state,
  });
  const mapDispatchToProps = (dispatch) => ({
    setAssessmentId: (assessment_id) => dispatch({ type: "setAssessmentId", payload: assessment_id }),
  });
  class CourseProgress extends Component
  {
    state={
      isLoaded:false,
      courses:[],
        enrollment: [], 
        completed:[],
        totalSections:0,
    }
    componentDidMount()
    {
      
  let url1 = this.props.url+"/api/assessmentenrollment/?user_id="+this.props.User.id+"&course_id="+this.props.Courseid;
      axios.get(url1).then((res) => {
        console.log(res.data);
        let courses=res.data.all;
        let enrolled=res.data.enrolled;
        let enrollements=[];
        let compeleted=[];
        // console.log("Data is ")
        console.log(res.data.all.length);
        // return;
        
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
         
            console.log(this.props.TotalCourseSections);

          }
        }
        console.log(enrollements)
        console.log(courses);
        this.setState({
          courses: courses,
          enrollment:enrollements,
          completed:compeleted,
          isLoaded:true , 
          totalSections:this.props.TotalCourseSections,

        });
      }
      );

          
      

    }
    AssessmentProgress=(assessment_id)=>
    {
      console.log(assessment_id);
      this.props.setAssessmentId(assessment_id);
      this.props.history.push("AssessmentProgress");




    }
      render()
      {
          return(<div>
            {this.state.isLoaded?
            <div>
              <NavBar></NavBar>
              <div class="row container" style={{marginLeft:"105px"}} >
            <div class="col-xl-4 col-md-6">
              <div class="card card-stats">
               
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Total Assessments</h5>
            <span class="h2 font-weight-bold mb-0">{this.state.totalSections}</span>
                    </div>
                    <div class="col-auto">
                      <div >
                        <i class="fa fa-first-order" ></i>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card card-stats">
               
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Completed Assessments</h5>
            <span class="h2 font-weight-bold mb-0">{this.state.completed.length}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                        <i class="ni ni-chart-pie-35"></i>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          
            <div class="col-xl-4 col-md-6">
              <div class="card card-stats">
               
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Course Progress</h5>
            <span class="h2 font-weight-bold mb-0">{this.state.completed.length>0?(this.state.completed.length/this.state.totalSections)*100:0}%</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                        <i class="ni ni-money-coins"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <br/>
              <div className="content container">
                  <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                      <th>Assessment Name</th>
                        <th>Assessment Status</th>   
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                       {this.state.enrollment.map((obj,key)=>
                       {
                         
                        return(<tr >
                           <th>{obj.name}</th>
                        <th>Active</th> 
                        <th><button class="main-btn" onClick={()=>this.AssessmentProgress(obj.eid)}> Detail</button></th>
                          </tr>)
                      // <tr>
                      //   <th>hadbjadb</th>
                      //   <th>hadbjadb</th>
                      //   <th>hadbjadb</th>
                      //   <th>hadbjadb</th>
                      // </tr>
                       })}   
                       {this.state.completed.map((obj,key)=>
                       {
                         
                        return(<tr >
                           <th>{obj.name}</th>
                        <th>Completed</th>
                       
                        <th><button class="main-btn" onClick={()=>this.AssessmentProgress(obj.eid)}> Detail</button></th>
                          </tr>)
                      // <tr>
                      //   <th>hadbjadb</th>
                      //   <th>hadbjadb</th>
                      //   <th>hadbjadb</th>
                      //   <th>hadbjadb</th>
                      // </tr>
                       })}   
                       {this.state.courses.map((obj,key)=>
                       {
                         
                        return(<tr >
                           <th>{obj.name}</th>
                        <th>Inactive</th>
                       
                        <th><button class="main-btn" disabled onClick={()=>this.AssessmentProgress(obj.eid)}> Detail</button></th>
                          </tr>)
                      // <tr>
                      //   <th>hadbjadb</th>
                      //   <th>hadbjadb</th>
                      //   <th>hadbjadb</th>
                      //   <th>hadbjadb</th>
                      // </tr>
                       })}    
                       
                    </tbody>
                  </Table>
                }
              />
            </Col>

            
             
         
          </Row>
          </Container>
      
      </div>
      </div>:<Preloader></Preloader>}

          </div>)
      }

  }
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CourseProgress));