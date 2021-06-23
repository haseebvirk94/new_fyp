import MaterialTable from "material-table";
import React, { Component } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  onConceptadd: (content) =>
    dispatch({ type: "AddAssessmentConcept", payload: content }),
});
class AddAssessment extends Component {
  state = {
    Assessmentcolunms: [
      { title: "id", field: "id", hidden: true, editable: "never" },
      { title: "Assessment Name", field: "name" },
      { title: "Assessment Question", field: "totalQuestions" },
      {
        title: "Add Concepts",
        filtering: false,
        render: (rowData) => (
          <Link
            to="/admin/Assessment"
            class="btn btn-yellow "
            onClick={() => this.addConcept(rowData.id)}
          >
            Add Concepts
          </Link>
        ),
      },
    ],
    conceptData: [],
    isLoaded: false,
  };
  componentDidMount() {
    this.load();
  }
  addConcept = (assessmentid) => {
    this.props.onConceptadd(assessmentid);
  };
  load = () => {
    let url =
      this.props.url + "/api/assessments/?course_id=" + this.props.Courseid;
    axios.get(url).then((res) => {
      this.setState({ conceptData: res.data.Content, isLoaded: true });
    });
  };
  onRowAdd = (newData) =>
    new Promise((resolve, reject) => {
      console.log(newData);
      if (
        "name" in newData &&
        newData["name"] !== "" &&
        "totalQuestions" in newData &&
        newData["totalQuestions"] !== ""
      ) {
        var numbers = /^[0-9]+$/;
        if (newData["totalQuestions"].match(numbers)) {
          newData.course_id = this.props.Courseid;

          let url = this.props.url + "/api/assessments/";
          axios.post(url, newData).then((res) => {
            this.load();
            resolve();
          });
        } else {
          window.alert("Please enter number in total questions");
          reject();
        }
      } else {
        window.alert("Please enter all fields");
        reject();
      }
    });

  onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      if (
        "name" in newData &&
        newData["name"] !== "" &&
        "totalQuestions" in newData &&
        newData["totalQuestions"] !== "" &&
        newData["totalQuestions"] !== ""
      ) {
        var numbers = /^[0-9]+$/;
        if (newData["totalQuestions"].match(numbers)) {
          newData.course_id = this.props.Courseid;

          let url = this.props.url + "/api/assessments/";
          axios.put(url, newData).then((res) => {
            this.load();
            resolve();
          });
        } else {
          window.alert("Please enter number in total questions");
          reject();
        }
      } else {
        window.alert("Please enter all fields");
        reject();
      }
    });

  onRowDelete = (newData) =>
    new Promise((resolve, reject) => {
      let url = this.props.url + "/api/assessments/?id=" + newData.id;
      axios.delete(url).then((res) => {
        this.load();
        resolve();
      });
    });
  render() {
    console.log("sdfdsjhhfj");
    return (
      <div>
        <Navbar></Navbar>
        <div class="container">
          <br />
          {this.state.isLoaded ? (
            <MaterialTable
              title="Assessment"
              columns={this.state.Assessmentcolunms}
              data={this.state.conceptData}
              editable={{
                onRowAdd: this.onRowAdd,
                onRowUpdate: this.onRowUpdate,
                onRowDelete: this.onRowDelete,
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAssessment);
