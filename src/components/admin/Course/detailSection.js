import React, { Component } from "react";
import axios, { post, put } from "axios";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  ...state,
});
class DetailSection extends Component {
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
    let url = this.props.url+"/api/conceptinassessment/?id=" + id;
    axios.get(url).then((res) => {
      console.log(res.data.Content);
      this.setState({
        conceptData: res.data.Content,
      });
    });
  }
  courseEnroll = (courseid) => {
   
    let url = this.props.url+"/api/courseEnrollment/";
    let data = { course_id: courseid, user_id: this.props.User.id };
    console.log(data);
    axios.post(url, data).then((res) => {
    });
    this.props.history.push("/user/dashboard");
  };
  render() {
    return (
      <div>
        <Link to='/user/dashboard'>Dashboard</Link> /  <Link to='/user/Detail'>Course Detail</Link> / Section Detail <br></br>
        <button
                      onClick={()=>this.courseEnroll(this.props.Courseid)}
                      class="btn waves-effect waves-light teal lighten-1"
                    >
                      Enroll Course
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
export default connect(mapStateToProps)(DetailSection);
