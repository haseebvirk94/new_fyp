import React, { Component } from "react";
import ActionTypes from "../../constants/actiontypes";
import Modes from "../../constants/Modes";
import { connect } from "react-redux";
import Quiz from "./Quiz";

const mapStateToProps = (state) => ({ ...state.QuizData });

const mapDispatchToProps = (dispatch) => ({
  onAnswer: (payload) =>
    dispatch({ type: ActionTypes.Quiz.QuizAnswer, payload }),
});

class Questions extends Component {
  state = {};
  Answer = (question, option) => {
    console.log("here");
    let quiz = JSON.parse(JSON.stringify(this.props.quiz));
    let q = quiz.questions.find((x) => x.id === question.id);
    q.options.forEach((x) => {
      x.selected = false;
    });
    q.options.find((x) => x.id === option.id).selected = true;
    console.log(quiz);
    this.props.onAnswer(quiz);
  };
  render() {
    let question = this.props.quiz.questions[this.props.index];
    console.log(this.props.quiz.questions[0]);
    console.log(question);
    return (
      <div id="quiz" class="container" style={{backgroundColor:"white"}}>
        <h2 className="text-center font-weight-normal black-text">
          {this.props.quiz.name}
        </h2>
        <hr />
        <div className="badge badge-warning black-text">
          Question {this.props.index + 1} of {this.props.quiz.questions.length}.
        </div>
        <h3 className="font-weight-normal black-text">
          {this.props.index + 1}. <span>{question.name}</span>
        </h3>
        <div className="row">
          {question.options.map((option) => (
            <div key={option.id} className="col-12 black-text">
              <p>
                <label>
                  <input
                    id={option.id}
                    checked={option.selected}
                    onChange={() => this.Answer(question, option)}
                    type="checkbox"
                  />
                  <span className="black-text p-1"> {option.name}</span>
                </label>
              </p>
            </div>
          ))}
        </div>
        <hr />
        <div className="text-center">
          
          <button
            id="prev"
            className="btn main-btn m-1"
            onClick={this.props.move}

          >
            Prev
          </button>
          <button
            id="next"
            className="btn main-btn m-1"
            onClick={this.props.move}
          >
            Next
          </button>
          <button
            id="last"
            className="btn main-btn"
            onClick={this.props.move}
            style={{visibility: "hidden"}}
          >
            Last
          </button>
          <button
            id="first"
            className="main-btn"
            onClick={this.props.move}
            style={{visibility: "hidden"}}
          >
            First
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
