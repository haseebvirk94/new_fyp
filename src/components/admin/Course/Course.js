import React, { Component } from "react";
import axios, { post, put } from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  onAddAssessment: (id) => dispatch({ type: "EditAssessment", payload: id }),
});
class Course extends Component {
  state = {
    courses: [],
    isLoaded: false,
    imageUrl: this.props.url+"/contentmanager/media/",
  };
  componentDidMount() {
   
    if (!this.props.User.isLoggedIn) {
      this.props.history.push("/login");
    }
    let url = this.props.url+"/api/courses/";
    axios.get(url).then((res) => {
      this.setState({
        courses: res.data.Content,
        isLoaded: true,
      });
    });
  }
  addAssessment = (course_id) => {
    
    this.props.onAddAssessment(course_id);
  };

  render() {
    return (
      <div>
        <Link
          to="/admin/addcourse/0"
          class="btn-floating btn-large waves-effect waves-light red"
        >
          <i class="material-icons">add</i>
        </Link>
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
                          to={"/admin/addcourse/" + obj.id}
                          class="btn waves-effect waves-light "
                        >
                          Edit
                        </Link>
                        <Link
                          to="/admin/AddAssessment"
                          class="btn waves-effect waves-light right"
                          onClick={() => this.addAssessment(obj.id)}
                        >
                          Assessment
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
export default connect(mapStateToProps, mapDispatchToProps)(Course);
