import React, { Component } from "react";
import axios, { post, put } from "axios";
// import ContentTable from "./ContentTable";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import NavBar from "../Pages/NavBar";
import "../Course/spinner.css";
import Result from "./Result";
const mapStateToProps = (state) => ({ ...state });
var rootStyle = {
  backgroundColor: "white",
  color: "white",
  height: "600px",
};
var text = {
  color: "black-text",
};
class ResultSample extends Component {
  state = {
    loading: true,
    Data: [],
    detail: false,
    result_cid: 0,
    columns: [
      { title: "Concept id", field: "id" , hidden:true},
      { title: "Concept Name", field: "name" },
      { title: "Marks", field: "obtainedMarks" },
      {
        render: (rowData) => (
          <div className='section table-of-contents'>
          <a href="#result"
            class="btn waves-effect white-text waves-light "
            onClick={() =>
              this.setState({ result_cid: rowData.id,detail:true })
            }
          >
            Detail
          </a>
          </div>
        ),
      },
    ],
  };
  componentDidMount() {
    console.log("Id");
    let result = [];
    result = this.props.Result;
    let ids = "";
    for (let i = 0; i < result.length; i++) {
      ids = ids + result[i].concept_id + ",";
    }
    ids = ids + "0";
    console.log(ids);
    console.log(result);
    let url = this.props.url+"/api/concepts/?ids=" + ids;
    axios.get(url).then((res) => {
      let dataResult = [];
      for (let i = 0; i < result.length; i++) {
        let row = {
          name: res.data.Content[i].name,
          obtainedMarks: result[i].obtainedMarks,
          id: result[i].concept_id,
        };
        dataResult.push(row);
      }

      console.log(dataResult);
      this.setState({
        Data: dataResult,
        loading:false
      });
    });
  }
  saveResult = () => {
    if (this.props.ResultNext == "SectionLoad") {
      let n = 4;
      let result = [...this.props.Result];
      let ids = [];
      let results = [];
      for (let i = 0; i < result.length; i++) {
        ids.push(result[i].concept_id);
        let p = Math.floor((result[i].obtainedMarks / 4) * 100);
        result[i].performance = p;
        console.log(result[i]);
        results.push(p);
      }
      let url = this.props.url+"/api/assessmentenrollment/";
      let data = {
        course_id:this.props.Courseid,
        user_id: this.props.User.id,
        assessment_id: this.props.Assessmentid,
        array: result,
      };
      axios.post(url, data).then((res) => {
        this.props.history.push("/user/CourseSection");
      });
    } else if (this.props.ResultNext == "SectionLoadFromConcept") {
      // Update Performance
      let url = this.props.url+"/api/performance/";
      let data = {
        userid: this.props.User.id,
        assessment: this.props.Assessmentid,
        enrollment:this.props.enrollment,
        concept_id: this.props.Result[0].concept_id,
        performance: Math.floor((this.props.Result[0].obtainedMarks / 4) * 100),
      };
      axios.put(url, data).then((res) => {
        this.props.history.push("/user/timeline");
      });
    } else if (this.props.ResultNext == "TestOut") {
      let url=this.props.url+"/api/assessmentenrollment/";
      console.log(url);
      let Content={assessment_id:this.props.Assessmentid}
      axios.put(url,Content).then((res) => {
        this.props.history.push("/user/CourseSection");
      });
      
    } else if (this.props.ResultNext == "HomeLoad") {
      this.props.history.push("/home");
    }
  };
  improve=()=>
  {
    this.props.history.push("/SignUp")
  }
  getResult = () => {
    if (this.state.detail)
    {
      let cid = this.state.result_cid;
      let questions = [...this.props.QuizData.quiz.questions]
      console.log(cid);
      questions = questions.filter(item => item.concepts_id == cid);
      console.log(questions);
      return (<Result questions={questions}> </Result>);
  
      }
  }
  render() {
    return (
      <div >
        <button className="btn teal lighten-1"  onClick={this.saveResult}>
          Next
        </button>
        <div class="row">
        <h3>Result of Sample Paper</h3>
        {this.state.loading ?<div style={{margin:'auto'}}class="preloader-wrapper center-align big active spinner">
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
            
        : <div className="col s8"><MaterialTable
            columns={this.state.columns}
            data={this.state.Data}
            
            ></MaterialTable>
             <div id='result' className="section scrollspy"> {this.getResult()}</div>
          </div>}
    
    
        </div>
        
      </div>
    );
    
  }
}
export default connect(mapStateToProps)(ResultSample);
