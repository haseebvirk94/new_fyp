import MaterialTable from "material-table";
import React, { Component } from "react";
import axios from "axios";
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
  };

  componentDidMount = () => {
    this.load();
  };
  onRowAdd = (newData) => {
    new Promise((resolve, reject) => {
      let url = this.props.url+"/api/areas/";
      axios.post(url, newData).then((res) => {
        this.load();
        resolve();
      });
    });
  };

  onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      let url = this.props.url+"/api/areas/";
      axios.put(url, newData).then((res) => {
        this.load();
        resolve();
      });
    });

  onRowDelete = (newData) =>
    new Promise((resolve, reject) => {
      let url = this.props.url+"/api/areas/?id=" + newData.id;
      axios.delete(url).then((res) => {
        this.load();
        resolve();
      });
    });
  load() {
    let url = this.props.url+"/api/areas/";
    axios.get(url).then((res) => {
      this.setState({ data: res.data.Content });
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

export default connect(mapStateToProps,null)(Areas);
