import MaterialTable from "material-table";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  ...state,
});
class Topics extends Component {
  state = {
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
        title: "Area Name",
        field: "area",
        filtering: true,
        lookup: {},
      },
    ],
    data: [],
    areas: [],
  };
  componentDidMount = () => {
    this.load();
  };
  onRowAdd = (newData) =>
    new Promise((resolve, reject) => {
      console.log(newData);
      let url = this.props.url+"/api/topics/";
      axios.post(url, newData).then((res) => {
        this.load();
        resolve();
      });
    });

  onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      let url = this.props.url+"/api/topics/";
      axios.put(url, newData).then((res) => {
        this.load();
        resolve();
      });
    });

  onRowDelete = (newData) =>
    new Promise((resolve, reject) => {
      let url = this.props.url+"/api/topics/?id=" + newData.id;
      axios.delete(url).then((res) => {
        this.load();
        resolve();
      });
    });

  load() {
    let url = this.props.url+"/api/topics/";
    axios.get(url).then((res) => {
      this.setState({ data: res.data.Content });
    });
    url = this.props.url+"/api/areas/";
    axios.get(url).then((res) => {
      let data = res.data.Content;
      let areas = {};
      for (let i = 0; i < data.length; i++) {
        areas[data[i].id] = data[i].name;
      }
      let columns = [...this.state.columns];
      columns[2].lookup = areas;
      this.setState({ areas: areas, columns: columns });
    });
  }

  render() {
    console.log(this.state);
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
          filtering: true,
        }}
      ></MaterialTable>
    );
  }
}

export default connect(mapStateToProps,null)(Topics);
