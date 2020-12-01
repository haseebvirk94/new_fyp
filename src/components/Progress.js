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
    setCourseId: (courseid) => dispatch({ type: "setCourseId", payload: courseid }),
  });
  class Progress extends Component
  {
    state={
      isLoaded:false,
      courses:[]
    }
    componentDidMount()
    {
      
      let url = this.props.url+"/api/progress/?user_id="+this.props.User.id;
      axios.get(url).then((res) => {
        console.log(res.data.Content);
        this.setState({
          courses:res.data.Content,
          isLoaded:true
        })
        console.log(this.state.courses)
        
      })
          
      

    }
    CourseProgress=(course_id)=>
    {
      console.log(course_id);
      this.props.setCourseId(course_id);
      console.log(this.props.Courseid);
      this.props.history.push('/CourseProgress')
    }
      render()
      {
          return(<div>
            {this.state.isLoaded?
            <div>
              <NavBar></NavBar>
              
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
                      <th>Course Name</th>
                        <th>Course Status</th>
                       
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                       {this.state.courses.map((obj,key)=>
                       {
                         
                        return(<tr >
                           <th>{obj.CourseName}</th>
                        <th>Active</th>
                    
                        <th><button class="main-btn" onClick={()=>this.CourseProgress(obj.id)}> Detail</button></th>
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
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Progress));