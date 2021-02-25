import React, { Component } from "react";
import axios, { post, put } from "axios";
import MaterialTable from "material-table";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  ...state,
});
class AddConcept extends Component {
  state = {
    concepts: [],
    isLoaded: false,
  };
  componentDidMount = () => {
    let { id } = useParams();
    
    let url = this.props.url+"/api/conceptincourse/";
    axios.get(url).then((res) => {
      this.setState({
        concepts: res.data.Content,
        isLoaded: true,
      });
    });
  };
  render() {
    return (
      <div>
        {this.state.isLoaded ? (
          <MaterialTable
            columns={[
              { title: "Course Id", field: "id", edittable: false },
              { title: "Course Name", field: "name", edittable: false },
              {
                title: "Selected",
                field: "selected",
                type: "boolean",
                edittable: true,
              },
            ]}
            data={this.state.concepts}
            title="Courses"
          />
        ) : null}
      </div>
    );
  }
}
export default connect(mapStateToProps,null)(AddConcept);
