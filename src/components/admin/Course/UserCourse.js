import React, { Component } from "react";
import axios, { post, put } from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ActionTypes from "../../constants/actiontypes";
const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  onQuizLoad: (quiz) =>
    dispatch({ type: ActionTypes.Quiz.QuizLoad, payload: quiz }),
});
class UserCourse extends Component {
  state = {
    courses: [],
    isLoaded: false,
    imageUrl: this.props.url+"/contentmanager/media/",
  };
  componentDidMount() {
    let url = this.props.url+"/api/courses/";
    axios.get(url).then((res) => {
      this.setState({
        courses: res.data.Content,
        isLoaded: true,
      });
    });
  }
  courseEnroll = (courseid) => {
   
    let url = this.props.url+"/api/courseEnrollment/";
    let data = { course_id: courseid, user_id: this.props.User.id };
    axios.post(url, data).then((res) => {
      
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          {this.state.isLoaded
            ? this.state.courses.map((obj, key) => {
                return (
                  <div className="col s3">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img
                          class="activator"
                          src={this.state.imageUrl + obj.thumbnail}
                        />
                      </div>
                      <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                          {obj.name}
                        </span>
                      </div>
                      <div>
                        <Link
                          to={"/user/showAssessment/" + obj.id}
                          className="btn waves-effect waves-light "
                          onClick={() => this.courseEnroll(obj.id)}
                        >
                          Enroll
                        </Link>
                        <Link
                          to={"/user/detail/" + obj.id}
                          class="btn waves-effect waves-light right"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserCourse);
