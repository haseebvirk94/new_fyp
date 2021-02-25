import React, { Component } from "react";
import axios, { post, put } from "axios";
import MaterialTable from "material-table";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  ...state,
});
class Assessment extends Component {
  state = {
    conceptColumns: [
      { title: "Id", field: "id", filtering: false, hidden: true },
      {
        title: "Concept Name",
        field: "name",
        filtering: false,
      },
      { title: "Topic Name", field: "topic", filtering: true, lookup: {} },
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
  };
  componentDidMount() {
    this.load();
  }
  load = () => {
    let url =
    this.props.url+"/api/conceptinassessment/?id=" +
      this.props.Assessmentid;
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
      
      this.setState({ conceptColumns: columns });
    });
  };
  changehandler = (data) => {
    let concepts = [...this.state.conceptData];
    concepts[data.tableData.id].selected = !concepts[data.tableData.id]
      .selected;
    this.setState({ conceptData: concepts });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let ids = [];
    let data = this.state.conceptData;
    for (let i = 0; i < data.length; i++) {
      if (data[i].selected == true) {
        ids.push(data[i].id);
      }
    }
    let newdata = { id: this.props.Assessmentid, ids: ids };
    
    let url = this.props.url+"/api/conceptinassessment/";
    post(url, newdata).then((res) => {
      this.props.history.goBack();
    });
  };
  render() {
    return (
      <div>
        <div className="input-field">
          <MaterialTable
            columns={this.state.conceptColumns}
            data={this.state.conceptData}
            title="Demo Title"
            options={{ filtering: true }}
          />
        </div>
        <div className="right">
          <Link
            to="/admin/AddAssessment"
            className="btn waves-effect waves-light"
            onClick={this.submitHandler}
          >
            Submit
            <i className="material-icons right">send</i>
          </Link>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, null)(Assessment);
