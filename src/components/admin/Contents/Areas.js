import MaterialTable from "material-table";
import React, { Component } from "react";
import axios from "axios";
import Preloader from "../../PreLoader";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  ...state,
});
class Areas extends Component {
  state = {
    columns: [
      {
        title: "Name",
        field: "name",
        validate: (rowdata) => rowdata.name != "",
      },
      { title: "id", field: "id", hidden: true, editable: "never" },
    ],
    data: [],
    isLoaded: false,
  };

  componentDidMount = () => {
    this.load();
  };
  onRowAdd = (newData) =>
    new Promise((resolve, reject) => {
      console.log(newData);
      if ("name" in newData && newData["name"] !== "") {
        let url = this.props.url + "/api/areas/";
        axios.post(url, newData).then((res) => {
          // this.loadwithresolve(resolve);
          this.load();
          resolve();
        });
      } else {
        window.alert("area name is empty");
        reject();
      }
    });

  onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      if ("name" in newData && newData["name"] !== "") {
        let url = this.props.url + "/api/areas/";
        axios.put(url, newData).then((res) => {
          this.loadwithresolve(resolve);
          // resolve();
        });
      } else {
        window.alert("area name is empty");
        reject();
      }
    });
  onRowDelete = (newData) =>
    new Promise((resolve, reject) => {
      let url = this.props.url + "/api/areas/?id=" + newData.id;
      axios.delete(url).then((res) => {
        this.loadwithresolve(resolve);
        // resolve();
      });
    });
  loadwithresolve(resolve) {
    console.log("loading");
    let url = this.props.url + "/api/areas/";
    axios.get(url).then((res) => {
      this.setState({ data: res.data.Content });
      this.setState({
        isLoaded: true,
      });
      resolve();
    });
  }
  load() {
    console.log("loading");
    let url = this.props.url + "/api/areas/";
    axios.get(url).then((res) => {
      this.setState({ data: res.data.Content });
      this.setState({
        isLoaded: true,
      });
    });
  }

  render() {
    return (
      <MaterialTable
        title="Area"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: this.onRowAdd,
          onRowUpdate: this.onRowUpdate,
          onRowDelete: this.onRowDelete,
        }}
        options={{
          actionsColumnIndex: -1,
        }}
      ></MaterialTable>
    );
  }
}

export default connect(mapStateToProps, null)(Areas);
