import React, { Component } from "react";

// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Review extends Component {
  isAnswered = (q) => {
    return q.options.some((x) => x.selected) ? "Answered" : "Not Answered";
  };
  render() {
    return (
      <div>
        <div>
          <h2 className="text-center font-weight-normal">
            Review Quiz: {this.props.quiz.name}
          </h2>
          <div />
          <div className="row text-center">
            {this.props.quiz.questions.map((q, index) => (
              <div key={index} className="col-4 cursor-pointer">
                <div
                  id={index}
                  onClick={this.props.move}
                  className={`p-3 mb-2 ${
                    this.isAnswered(q) === "Answered" ? "bg-info" : "bg-warning"
                  }`}
                >
                  {index + 1}. {this.isAnswered(q)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
