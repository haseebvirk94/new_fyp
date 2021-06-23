import MaterialTable from "material-table";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  ...state,
});
class Concepts extends Component {
  state = {
    file: null,
    columns: [
      {
        title: "id",
        field: "id",
        hidden: true,
        editable: "never",
        filtering: false,
      },
      { title: "Name", field: "name", filtering: false },
      {
        title: "Topic Name",
        field: "topic",
        filtering: true,
        lookup: {},
      },
      {
        title: "File",
        field: "qgenerator",
        filtering: false,
        render: (rowData) => <p>{rowData.filename}</p>,
        editComponent: (props) => (
          <input
            type="file"
            value={this.state.value}
            onChange={(e) => this.onChange(e.target.files[0])}
          />
        ),
      },
    ],
    data: [],
  };
  onChange = (file) => {
    this.setState({ file: file });
  };
  componentDidMount = () => {
    this.load();
  };
  onRowAdd = (newData) =>
    new Promise((resolve, reject) => {
      console.log(newData);
      if (
        "name" in newData &&
        newData["name"] !== "" &&
        "topic" in newData &&
        newData["topic"] !== "" &&
        this.state.file !== null
      ) {
        newData.file = this.state.file;
        let formData = new FormData();
        formData.append("name", newData.name);
        formData.append("topic", newData.topic);
        formData.append("file", this.state.file);
        let url = this.props.url + "/api/concepts/";
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        axios.post(url, formData, config).then((res) => {
          this.load();
          this.setState({ file: null });
          resolve();
        });
      } else {
        window.alert("Please enter all fields");
        reject();
      }
    });

  onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      console.log(newData);
      if (
        "name" in newData &&
        newData["name"] !== "" &&
        "topic" in newData &&
        newData["topic"] !== ""
      ) {
        newData.file = this.state.file;
        let formData = new FormData();
        formData.append("id", newData.id);
        formData.append("name", newData.name);
        formData.append("topic", newData.topic);
        formData.append("file", this.state.file);
        let url = this.props.url + "/api/concepts/";
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        axios.put(url, formData, config).then((res) => {
          this.setState({ file: null });
          this.load();
          resolve();
        });
      } else {
        window.alert("Please enter all fields");
        reject();
      }
    });

  onRowDelete = (newData) =>
    new Promise((resolve, reject) => {
      let url = this.props.url + "/api/concepts/?id=" + newData.id;
      axios.delete(url).then((res) => {
        this.load();
        resolve();
      });
    });

  load() {
    let url = this.props.url + "/api/concepts/";
    axios.get(url).then((res) => {
      this.setState({ data: res.data.Content });
    });
    url = this.props.url + "/api/topics/";
    axios.get(url).then((res) => {
      let data = res.data.Content;
      let topics = {};
      for (let i = 0; i < data.length; i++) {
        topics[data[i].id] = data[i].name;
      }
      let columns = [...this.state.columns];
      columns[2].lookup = topics;
      this.setState({ columns: columns });
    });
  }

  render() {
    return (
      <MaterialTable
        title="Concepts"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: this.onRowAdd,
          onRowUpdate: this.onRowUpdate,
          onRowDelete: this.onRowDelete,
        }}
        options={{
          actionsColumnIndex: -1,
          filtering: true,
        }}
      ></MaterialTable>
    );
  }
}

export default connect(mapStateToProps, null)(Concepts);
