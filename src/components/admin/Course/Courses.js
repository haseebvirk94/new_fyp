import React, { Component } from 'react'
import axios, { post, put } from 'axios'
import Preloader from '../../PreLoader'
import NavBar from '../../NavBar'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
const mapStateToProps = (state) => ({
  ...state,
})
const mapDispatchToProps = (dispatch) => ({
  onAddAssessment: (id) => dispatch({ type: 'EditAssessment', payload: id }),
})
class Course extends Component {
  state = {
    courses: [],
    isLoaded: false,
    imageUrl: this.props.url + '/contentmanager/media/',
  }
  componentDidMount() {
    if (!this.props.User.isLoggedIn) {
      this.props.history.push('/login')
    }
    let url = this.props.url + '/api/courses/'
    axios.get(url).then((res) => {
      this.setState({
        courses: res.data.Content,
        isLoaded: true,
      })
    })
  }
  addAssessment = (course_id) => {
    this.props.onAddAssessment(course_id)
  }
  render() {
    return (
      <div>
        {this.state.isLoaded ? (
          <div>
            <NavBar></NavBar>
            <section id="courses-part" class="pt-120 pb-120 gray-bg">
              <div class="container">
                <Link to="/admin/addcourse/0" class="btn btn-outline-primary">
                  Add Courses
                </Link>
                <br />
                <br />
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="courses-grid"
                    role="tabpanel"
                    aria-labelledby="courses-grid-tab"
                  >
                    <div class="row">
                      {this.state.courses.map((obj, key) => {
                        return (
                          <div key={key} class="col-lg-4 col-md-6">
                            <div class="singel-course mt-30">
                              <div class="thum">
                                <div class="image">
                                  <img
                                    src={this.state.imageUrl + obj.thumbnail}
                                    alt="Course"
                                  />
                                </div>
                                <div class="price">
                                  <span>Free</span>
                                </div>
                              </div>
                              <div class="cont">
                                <h4>{obj.name}</h4>
                                <div class="course-teacher">
                                  <div class="thum">
                                    <Link
                                      to={'/admin/addcourse/' + obj.id}
                                      class="btn btn-outline-primary"
                                    >
                                      Edit
                                    </Link>
                                  </div>
                                  <div class="name">
                                    <Link
                                      to="/admin/AddAssessment"
                                      class="btn btn-outline-primary"
                                      onClick={() => this.addAssessment(obj.id)}
                                      style={{ marginLeft: '100px' }}
                                    >
                                      Assessment
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <Preloader></Preloader>
        )}
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Course)
