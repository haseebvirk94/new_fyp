import React, { Component } from "react";
import ActionTypes from "../../constants/actiontypes";
import Modes from "../../constants/Modes";
import { connect } from "react-redux";
import Questions from "./Questions";
import Review from "./Review";
import Result from "./Result";
import Axios from "axios";
import axios from "axios";
import { Link } from "react-router-dom";
import "./spinner.css";
import Preloader from "../PreLoader";
const mapStateToProps = (state) => {
  return { ...state.QuizData, r: state.Result,...state};
};

const mapDispatchToProps = (dispatch) => ({
  onModeChange: (payload) =>
    dispatch({ type: ActionTypes.Quiz.ModeChange, payload }),
  onIndexChange: (payload) =>
    dispatch({ type: ActionTypes.Quiz.IndexChange, payload }),
  ResultSave: (payload) => dispatch({ type: "ResultSubmit", payload }),
});
var rootStyle = {
  backgroundColor: "white",
  color: "white",
  height: "100%",
};
class Quiz extends Component {
  state = {loading:false};
  move = (e) => {
    let id = e.target.id;
    let index = 0;
    if (id === "first") index = 0;
    else if (id === "prev") index = this.props.index - 1;
    else if (id === "next") {index = this.props.index + 1; console.log(index);}
    else if (id === "last") index = this.props.quiz.questions.length - 1;
    else index = parseInt(id, 10);
    if (index > this.props.quiz.questions.length-1)
    {
      let newMode = Modes.QuizModes.Submit;
      this.props.onModeChange(newMode);
    }
    if (index >= 0 && index < this.props.quiz.questions.length) {
      this.props.onIndexChange(index);
    }
  };
  setMode = (e) => {
    let newMode = this.props.mode;
    if (e.target.id === "Quiz") newMode = Modes.QuizModes.Quiz;
    if (e.target.id === "Review") newMode = Modes.QuizModes.Review;
    if (e.target.id === "Submit") {
      newMode = Modes.QuizModes.Submit
      // newMode = Modes.QuizModes.Submit;
      // this.submitQuiz();
      //alert("Your quiz will be end");
      //this.abc(this.props.quiz.questions);
      //console.log("ss");
      // console.log(this.props.r);
      // this.props.history.push("/SampleResult");
    }
    console.log(newMode);
    this.props.onModeChange(newMode);
  };
  submitQuiz = () => {
    this.setState({loading:true})
    if (this.props.isImprovement === false) {
      let url =
      this.props.url+"/api/" + this.props.quiz.type + "_History/";
      let totalMarks = this.props.quiz.questions.length;
      let obtainedMarks = 0;
      let data = {
        userId: 1,
        totalMarks: totalMarks,
      };
      console.log("obtained marks");
      this.props.quiz.questions.forEach((q, index) => {
        let correct = q.options.every((x) => x.selected === x.isAnswer);
        console.log(correct);
        if (correct == true) {
          obtainedMarks = obtainedMarks + 1;
        }
      });
      data["obtainMarks"] = obtainedMarks;
      if (this.props.quiz.type == "subject") {
        this.abc(this.props.quiz.questions);
        data["subjectId"] = this.props.quiz.id;
      } else if (this.props.quiz.type == "chapter") {
        this.abc(this.props.quiz.questions);
        data["chapterId"] = this.props.quiz.id;
      } else if (this.props.quiz.type == "concept") {
        data["conceptId"] = this.props.quiz.id;
      }
      this.saveQuestions();
      console.log("request");
      console.log(url);
      console.log(data);
      Axios.post(url, data).then((res) => {
        window.alert("done");
      });
    } else {
      this.saveQuestions();
    }
  };
  saveQuestions = () => {
    // save questions for improvement
    let url =
    this.props.url+"/api/" + this.props.quiz.type + "_Questions/";
    let data = {
      id: this.props.quiz.id,
    };
    let questions = [];
    this.props.quiz.questions.forEach((q) => {
      let correct = false;
      correct = q.options.every((x) => x.selected === x.isAnswer);
      if (!correct) {
        questions.push(q);
      }
    });
    data["Questions"] = questions;

    console.log(this.props);
    console.log("improvement data");
    console.log(data);
    Axios.post(url, data).then((res) => {
      window.alert("Questions Saved for Improvement");
    });
  };
  abc = (questions) => {
    // Calculate marks for each concept

    let resultz = [];
    let concept_id = 0;
    console.log("jhadjhjahjh");
    console.log(questions);
    let len = questions.length / 4;
    len = len;
    for (var i = 0; i < len; i++) {
      let obtainMarks = 0;
      console.log(i);
      for (var j = 0; j < 4; j++) {
        let correct = false;
        correct = questions[j + i * 4].options.every(
          (x) => x.selected === x.isAnswer
        );
        console.log(correct);
        if (correct) {
          obtainMarks = obtainMarks + 1;
        }
      }
      concept_id = questions[i * j].concepts_id;
      resultz.push({ concept_id: concept_id, obtainedMarks: obtainMarks });
      console.log(resultz);
      // this.props.ResultSave(result);
    }
    console.log('asda');
    console.log(resultz);
    this.props.ResultSave(resultz);
    this.next(resultz);
  };
  endquiz = () => {
    this.setState({loading:true})
    this.abc(this.props.quiz.questions);
  }
  next = (rl) => {
    let resultz = rl;
    console.log(resultz);
      if (this.props.ResultNext == "SectionLoad") {
        let n = 4;
        let ids = [];
        let results = [];
        for (let i = 0; i < resultz.length; i++) {
          ids.push(resultz[i].concept_id);
          let p = Math.floor((resultz[i].obtainedMarks / 4) * 100);
          resultz[i].performance = p;
          console.log(resultz[i]);
          results.push(p);
        }
        let url = this.props.url+"/api/assessmentenrollment/";
        let data = {
          course_id:this.props.Courseid,
          user_id: this.props.User.id,
          assessment_id: this.props.Assessmentid,
          array: resultz,
        };
        axios.post(url, data).then((res) => {
          this.props.history.push("timeline");
        });
      } else if (this.props.ResultNext == "SectionLoadFromConcept") {
        // Update Performance
        
        let url = this.props.url+"/api/performance/";
        let data = {
          userid: this.props.User.id,
          assessment: this.props.Assessmentid,
          enrollment:this.props.enrollment,
          concept_id: this.props.Result[0].concept_id,
          performance: Math.floor((resultz[0].obtainedMarks / 4) * 100),
        };
        console.log(data);
        axios.put(url, data).then((res) => {
          this.props.history.push("timeline");
        });
      } else if (this.props.ResultNext == "TestOut") {
        let url=this.props.url+"/api/assessmentenrollment/";
        console.log(url);
        let Content={assessment_id:this.props.Assessmentid}
        axios.put(url,Content).then((res) => {
          this.props.history.push("timeline");
        });
        
      } else if (this.props.ResultNext == "singlecourse") {
        this.props.history.push("SingleCourse");
      }
    
  }
  renderMode() {
    if (this.props.mode === Modes.QuizModes.Quiz) {
      return <Questions move={this.move} />;
    } else if (this.props.mode === Modes.QuizModes.Review) {
      return <Review quiz={this.props.quiz} move={this.move} />;
    } else {
      return <Result questions={this.props.quiz.questions} />;
    }
  }
  render() {
    return (
      <div style={rootStyle}>
        {this.state.loading?<Preloader></Preloader>:null}
        <br></br>
        {this.props.isLoaded ? this.renderMode() : <div class="preloader-wrapper big active spinner">
    <div class="spinner-layer spinner-blue-only ">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>}
        {this.props.mode !== Modes.QuizModes.Submit && (
          <div class="container" >
            <hr />
        
              <button
                id="Submit"
                className="btn main-btn"
                onClick={this.setMode}
              >
                End Quiz
            </button> 
            
            <button
              id="Quiz"
              className="btn btn-info red"
              onClick={this.setMode}
              style={{visibility: "hidden"}}
            >
              Quiz
            </button>
            <button
              id="Review"
              className="btn btn-info teal lighten-1"
              onClick={this.setMode}
              style={{visibility: "hidden"}}
            >
              Review
            </button>
            
          </div>
        )}
        {this.props.mode == Modes.QuizModes.Submit ?
              <button
                onClick={this.endquiz}
                className="btn main-btn mr-10 ml-10"
              >
                Next
            </button> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
