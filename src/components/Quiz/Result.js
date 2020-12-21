import React from "react";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
function Result(props) {
  let questions = props.questions;
  questions.forEach((q) => {
    q.isCorrect = q.options.every((x) => x.selected === x.isAnswer);
  });

  return (
    <div className="p-5">
      <h2 className="text-center font-weight-normal">Quiz Result</h2>
      <br></br>
      {questions.map((q, index) => (
        <div
          key={q.id}
          // className={`mb-2 lighten-2 ${q.isCorrect ? "green" : "red"}`}
          className="mb-2"
        >
          <div className="result-question">
            <h5>
              {index + 1}. {q.name}
            </h5>

            {q.options.map((option) => (
                            <div className="row  m-l-10 p-l-10">
                <div key={option.id} className="">
                    <input  id={option.id} type="checkbox" checked={option.selected || option.isAnswer} disabled  type="checkbox" class="form-check-input"/>
                  <label class={ option.isAnswer ? "text-success" : option.selected ?"text-danger" : "text-dark"} for={option.id}>{option.name}</label>
                </div>
                </div>
              ))}
            
            <div
              className='m-1 p-1 text-bold'
            >
              <p style={q.isCorrect ? {color:'green'}:{color:'red'}}> Your answer is {q.isCorrect ? "Correct" : "Wrong"}. <br/> Reaseon: {q.detail} <br/></p>
              {/* Reaseon: {q.detail} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Result;
