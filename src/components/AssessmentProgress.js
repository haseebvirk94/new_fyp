import React, { Component } from "react";

import NavBar from "./NavBar";
import Preloader from "./PreLoader";

import axios, { post, put } from "axios";
import { Container,Row, Col, Table } from "react-bootstrap";

import Card from "./Card";
import { connect } from "react-redux";
import { Link ,withRouter} from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar'
const mapStateToProps = (state) => ({
    ...state,
  });
 
  class AssessmentProgress extends Component
  {
    state={
      isLoaded:false,
      progress:0,
      totalConcepts:0,
      prepareConcepts:0,
      concepts:[]

    }
    componentDidMount()
    {
      
  let url1 = this.props.url+"/api/performance/?enrollment="+this.props.Assessmentid;
      axios.get(url1).then((res) => {
          let performance=0;
          let prepare=0;
          for(let i=0;i<res.data.Content.length;i++)
          {
              performance=performance+res.data.Content[i].performance;
            if(res.data.Content[i].performance>75)
            {
                prepare=prepare+1;
                console.log("sadkdbka");
            }
          }
          performance=performance/res.data.Content.length;
          
          this.setState({
              concepts:res.data.Content,
              progress:performance,
     
      totalConcepts:res.data.Content.length,
      prepareConcepts:prepare,
      isLoaded:true 

          })
          console.log(res.data.Content)
      })

          
      

    }
    AssessmentProgress=(assessment_id)=>
    {
      console.log(assessment_id);
      this.props.setAssessmentId(assessment_id);
      


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
                      <h5 class="card-title text-uppercase text-muted mb-0">Total Concepts</h5>
            <span class="h2 font-weight-bold mb-0">{this.state.totalConcepts}</span>
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
                      <h5 class="card-title text-uppercase text-muted mb-0">Prepared Concepts</h5>
            <span class="h2 font-weight-bold mb-0">{this.state.prepareConcepts}</span>
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
                      <h5 class="card-title text-uppercase text-muted mb-0">Assessment Preperation</h5>
            <span class="h2 font-weight-bold mb-0">{parseInt(this.state.progress)}%</span>
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
                      <th>Concept Name</th>
                        <th>Concept Status</th>
                        
                        <th>Concept Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                       {this.state.concepts.map((obj,key)=>
                       {
  
                        return(<tr >
                           <th>{obj.concept_name}</th>
                        <th>{obj.status}</th> 
                        {obj.performance>75?<th>
                            
                            <ProgressBar variant="success" now={obj.performance} /></th>:obj.performance>=50?<th>
                            
                            <ProgressBar variant="info" now={obj.performance} /></th>:<th>
                            
                            <ProgressBar variant="danger" now={obj.performance} /></th>}
                        
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
  export default connect(mapStateToProps,null)(AssessmentProgress);