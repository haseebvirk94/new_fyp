import React, { Component } from "react";
import Modes from "../../../constants/Modes";
import Navbar from "../Navbar";
// import "materialize-css/dist/css/materialize.min.css";
import Areas from "./Areas";
import Concepts from "./Concepts";
import Topics from "./Topics";
import "../admin.css";
class EditableContent extends Component {
  state = { mode: Modes.Content.Area };
  setMode = (e) => {
    let newMode = this.state.mode;
    if (e.target.id === "Area") newMode = Modes.Content.Area;
    if (e.target.id === "Topic") newMode = Modes.Content.Topic;
    if (e.target.id === "Concept") newMode = Modes.Content.Concept;
    this.setState({ mode: newMode });
  };
  renderTable = () => {
    let content;
    if (this.state.mode == Modes.Content.Area) {
      content = <Areas></Areas>;
    } else if (this.state.mode == Modes.Content.Topic) {
      content = <Topics></Topics>;
    } else if (this.state.mode == Modes.Content.Concept) {
      content = <Concepts></Concepts>;
    }
    return content;
  };
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="container">
          <div className="">
            <hr />
            <button id="Area" className="tab-btn" onClick={this.setMode}>
              Area
            </button>
            <button id="Topic" className="tab-btn " onClick={this.setMode}>
              Topic
            </button>
            <button id="Concept" className="tab-btn " onClick={this.setMode}>
              Concept
            </button>
          </div>
          <br />
          {this.renderTable()}
        </div>
      </div>
    );
  }
}

export default EditableContent;
