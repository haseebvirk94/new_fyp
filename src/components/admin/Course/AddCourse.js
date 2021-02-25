import React, { Component } from "react";
import axios, { post, put } from "axios";
import MaterialTable from "material-table";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  ...state,
});
class AddCourse extends Component {
  state = {
    course_name: "",
    course_detail: "",
    course_thumbnail: "",
    conceptColumns: [
      { title: "Id", field: "id", filtering: false },
      {
        title: "Concept Name",
        field: "name",
        filtering: false,
      },
      { title: "Topic Name", field: "topic", lookup: {} },
      {
        title: "Select",
        filed: "selected",
        type: "boolean",
        filtering: false,
        render: (rowData) => (
          <label>
            <input
              onChange={() => this.changehandler(rowData)}
              type="checkbox"
              class="filled-in"
              checked={rowData.selected}
            />
            <span></span>
          </label>
        ),
      },
    ],
    conceptData: [],
    isLoaded: false,
    isEdit: false,
    course_id: 0,
  };
  changehandler = (data) => {
    let concepts = [...this.state.conceptData];
    concepts[data.tableData.id].selected = !concepts[data.tableData.id]
      .selected;
    this.setState({ conceptData: concepts });
  };
  componentDidMount = () => {
    let id = this.props.match.params.id;
    if (id > 0) {
      this.setState({ isEdit: true, course_id: id });
      this.loadEdit(id);
    } else this.loadAdd();
  };
  loadEdit = (id) => {
    let url = this.props.url+"/api/conceptincourse/?id=" + id;
    axios.get(url).then((res) => {
      this.setState({
        conceptData: res.data.Content,
      });
    });
    url = this.props.url+"/api/topics/";
    axios.get(url).then((res) => {
      let data = res.data.Content;
      let topics = {};
      for (let i = 0; i < data.length; i++) {
        topics[data[i].id] = data[i].name;
      }
      let columns = [...this.state.conceptColumns];
      columns[2].lookup = topics;
      console.log(columns);
      this.setState({ conceptColumns: columns, isLoaded: true });
    });
    url = this.props.url+"/api/courses/?id=" + id;
    axios.get(url).then((res) => {
      console.log(res.data.Content);
      this.setState({
        course_name: res.data.Content.name,
        course_detail: res.data.Content.description,
        course_thumbnail: res.data.Content.thumbnail,
      });
    });
  };
  addConcept = () => {
    this.props.history.push("/Addconcept/");
  };
  loadAdd = () => {
    let url = this.props.url+"/api/conceptincourse/";
    axios.get(url).then((res) => {
      this.setState({
        conceptData: res.data.Content,
      });
    });
    url = this.props.url+"/api/topics/";
    axios.get(url).then((res) => {
      let data = res.data.Content;
      let topics = {};
      for (let i = 0; i < data.length; i++) {
        topics[data[i].id] = data[i].name;
      }
      let columns = [...this.state.conceptColumns];
      columns[2].lookup = topics;
      console.log(columns);
      this.setState({ conceptColumns: columns, isLoaded: true });
    });
  };
  onCellEditApproved = (newValue, oldValue, rowData, columnDef) => {
    return new Promise((resolve, reject) => {
      console.log("newValue: " + newValue);
      setTimeout(resolve, 1000);
    });
  };
  nameChangeHandler = (e) => {
    this.setState({ course_name: e.target.value });
  };
  detailChangeHandler = (e) => {
    this.setState({ course_detail: e.target.value });
  };
  fileChangeHandler = (e) => {
    this.setState({ course_thumbnail: e.target.files[0] });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("id", this.state.course_id);
    formData.append("name", this.state.course_name);
    formData.append("description", this.state.course_detail);
    formData.append("thumbnail", this.state.course_thumbnail);
    let ids = [];
    let data = this.state.conceptData;
    for (let i = 0; i < data.length; i++) {
      if (data[i].selected == true) {
        ids.push(data[i].id);
      }
    }
    formData.append("ids", ids);
    if (this.state.isEdit) this.edit(formData);
    else this.add(formData);
  };
  reset = () => {
    this.setState({
      course_name: "",
      course_thumbnail: "",
      course_detail: "",
    });
    let newdata = [...this.state.conceptData];
    for (let i = 0; i < newdata.length; i++) {
      newdata[i].selected = false;
    }
    this.setState({
      conceptData: newdata,
    });
  };
  edit = (content) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let url = this.props.url+"/api/courses/";
    put(url, content, config).then((res) => {
      this.reset();
      this.props.history.goBack();
    });
  };
  add = (content) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let url = this.props.url+"/api/courses/";
    post(url, content, config).then((res) => {
      this.reset();
      this.props.history.goBack();
    });
  };
  render() {
    return (
      <div>
        <div className="row">
          <form className="col s12" onSubmit={this.submitHandler}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={this.state.course_name}
                  onChange={this.nameChangeHandler}
                  id="course_name"
                  type="text"
                  className="validate"
                />
                <label for="course_name">Course Name</label>
              </div>
              <div className="file-field input-field col s6">
                <div className="btn">
                  <span>File</span>
                  <input onChange={this.fileChangeHandler} type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    value={
                      this.state.course_thumbnail
                        ? this.state.course_thumbnail.name
                        : ""
                    }
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="input-field">
              <textarea
                value={this.state.course_detail}
                onChange={this.detailChangeHandler}
                id="course_detail"
                className="materialize-textarea"
              ></textarea>
              <label for="course_detail">Course Detail</label>
            </div>
            <div className="input-field">
              <MaterialTable
                columns={this.state.conceptColumns}
                data={this.state.conceptData}
                title="Demo Title"
                options={{ filtering: true }}
              />
            </div>
            <div className="right">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps,null)(AddCourse);
