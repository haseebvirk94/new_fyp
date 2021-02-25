import React, { Component } from "react";
import axios, { post, put } from "axios";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import ActionTypes from "../../constants/actiontypes.js";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  onQuizEnd: (next) => dispatch({ type: "Next", payload: next }),
  currentassessment: (id) =>
    dispatch({ type: "AddAssessmentConcept", payload: id }),
  onQuizLoad: (quiz) =>
    dispatch({ type: ActionTypes.Quiz.QuizLoad, payload: quiz }),
});
const mapStateToProps = (state) => ({
  ...state,
});
class ShowAssessment extends Component {
  state = {
    conceptColumns: [
      { title: "Id", field: "id", filtering: false, hidden: true },
      {
        title: "Assessment Name",
        field: "name",
        filtering: false,
      },
      {
        render: (rowData) => (
          <Link
            to="/user/quiz"
            class="btn waves-effect waves-light "
            onClick={() => this.generateQuiz(rowData.id)}
          >
            Section Enrollment
          </Link>
        ),
      },
    ],
    conceptData: [],
  };
  generateQuiz = (assessment_id) => {
    
    this.props.currentassessment(assessment_id);
    let url = this.props.url+"/api/quiz/?assessment_id=" + assessment_id;
    axios.get(url).then((res) => {
      // Convert res.data.content to array
      let quiz = { name: "Sample Quiz", questions: res.data.Content };
      console.log(quiz);
      this.props.onQuizLoad(quiz);
      this.props.onQuizEnd("SectionLoad");
    });
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    let url = this.props.url+"/api/assessments/?course_id=" + id;
    axios.get(url).then((res) => {
      this.setState({
        conceptData: res.data.Content,
      });
    });
  }
  render() {
    return (
      <div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ShowAssessment);
