import React, { Component } from "react";
import Modes from "../../../constants/Modes";
// import "materialize-css/dist/css/materialize.min.css";
import Areas from "./Areas";
import Concepts from "./Concepts";
import Topics from "./Topics";
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
        <div className="row">
          <hr />
          <button
            id="Area"
            className="waves-effect waves-light btn col s4"
            onClick={this.setMode}
          >
            Area
          </button>
          <button
            id="Topic"
            className="waves-effect waves-light btn col s4"
            onClick={this.setMode}
          >
            Topic
          </button>
          <button
            id="Concept"
            className="waves-effect waves-light btn col s4"
            onClick={this.setMode}
          >
            Concept
          </button>
        </div>
        {this.renderTable()}
      </div>
    );
  }
}

export default EditableContent;
