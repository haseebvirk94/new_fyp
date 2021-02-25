import React, { Component } from "react";
import axios, { post, put } from "axios";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ActionTypes from "../../constants/actiontypes.js";
const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
    onQuizLoad: (quiz) =>
      dispatch({ type: ActionTypes.Quiz.QuizLoad, payload: quiz }),
      onQuizEnd: (next) => dispatch({ type: "Next", payload: next }),
});
class DetailSection1 extends Component {
  state = {
    conceptColumns: [
      { title: "Id", field: "id", filtering: false, hidden: true },
      {
        title: "Concept Name",
        field: "name",
        filtering: false,
      },
    ],
    conceptData: [],
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(this.props.match.params.id);
    let url = this.props.url+"/api/assessments/?assessment_id=" + id;
    axios.get(url).then((res) => {
      console.log(res.data.Content);
      this.setState({
        conceptData: res.data.Content,
      });
    });
  }
  sectionEnroll = () => {
    let sectionid = this.props.Assessmentid;
    // let url = this.props.url+"/api/quiz/?assessment_id=" + sectionid
    // axios.get(url).then((res) => {
    //   // Convert res.data.content to array
    //   let quiz = { name: "Sample Quiz", questions: res.data.Content };
    //   console.log(quiz);
    //   this.props.onQuizLoad(quiz);
    //   this.props.onQuizEnd("SectionLoad");
    //   this.props.history.push('/user/quiz')
    // }); 
    let n = 4;
    let result = [...this.state.conceptData];
    console.log('res');
    console.log(result);
      for (let i = 0; i < result.length; i++) {
        let p = 0;
        result[i].concept_id = result[i].concept;
        result[i].performance = p;
        console.log(result[i]);
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
    
  };
  render() {
    return (
      <div>
        <Link to='/user/dashboard'>Dashboard</Link> /  <Link to='/user/CourseSection'>Section</Link> / <Link to='/user/CourseSection/"detailSection1'>Detail Section</Link>
        <br></br>
         <button
                      onClick={()=>this.sectionEnroll(this.props.Assessmentid)}
                      class="btn waves-effect waves-light teal lighten-1"
                    >
                      Section Enroll 
                    </button>
        <div className="input-field">
          <MaterialTable
            columns={this.state.conceptColumns}
            data={this.state.conceptData}
            title="Demo Title"
          />
        </div>
       
      </div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(DetailSection1);
