import React, { Component } from 'react';
import axios, { post, put } from "axios";
import { connect } from "react-redux";
import ActionTypes from "../constants/actiontypes.js";
import "./timeline.css";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Preloader from "./PreLoader";
import NavBar from "./NavBar";
const mapStateToProps = (state) => ({
    ...state,
});
const mapDispatchToProps = (dispatch) => ({
    onQuizEnd: (next) => dispatch({ type: "Next", payload: next }),
    onQuizLoad: (quiz) =>
      dispatch({ type: ActionTypes.Quiz.QuizLoad, payload: quiz }),
      currentassessment: (id) =>
        dispatch({ type: "AddAssessmentConcept", payload: id }),
        currentenrollment: (id) =>
        dispatch({ type: "setEnrollment", payload: id }),
  });
class Timeline extends Component {
    state = {
        sections: [
            {
                id: 1,
                name: 'abc',
                active: false,
                completed: false,
                strong:false,
                concept: [{ id: 1, name: 'c1' }, { id: 2, name: 'c3' }]
            }
        ],
        isLoaded: false,
        enrolling: true,

        j:1,
    }
    componentDidMount = () => {
        let ci = this.props.Courseid;
        let url = this.props.url + "/api/assessmentenrollment/?user_id=" + this.props.User.id + "&course_id=" + this.props.Courseid;
        axios.get(url).then((res) => {
            let assessments= res.data.all;
            this.setState({
                sections:assessments,
            });
            this.setState({ j: 0 });
            let enrolled = res.data.enrolled;
            for (let i = 0; i < assessments.length; i++)
            {
                let urlc = this.props.url+"/api/assessments/?assessment_id="+assessments[i].id;
                axios.get(urlc).then((res) => {
                    console.log('ccs');
                    let concepts = res.data.Content;
                    console.log(concepts);
                    let na = [...this.state.sections];
                    na[i].concept = concepts;
                    na[i].completed = false;
                    na[i].active = false;
                    for (let k = 0; k < enrolled.length; k++) {
                        if (enrolled[k].assessment_id == na[i].id) {
                            na[i].enr = enrolled[k].id;
                            if (enrolled[k].is_active) {
                                na[i].completed = false;
                                na[i].active = true;
                                this.setState({ enrolling: false });
                            }
                            else {
                                na[i].completed = true;
                                na[i].active = false;
                                
                            }
                        }
                        
                    }
                    this.setState({ sections: na });
                    console.log('shfjsdhfkjskfdjshfsk');
                    console.log(i);
                    this.setState({ j: this.state.j+1 });
                    console.log(this.state.sections);
                });
            }
            this.checkLoaded();

        });
    }
    startQuiz = (obj,enr) => {
        this.props.currentenrollment(enr);
        console.log('qioz');
        console.log(obj);
        this.setState({ isLoaded: false });
          let url = this.props.url + "/api/quiz/?id=" + obj.concept;
            console.log('here');
            axios.get(url).then((res) => {
            // Convert res.data.content to array
            let quiz = { name: "Sample Quiz", questions: res.data.Content };
            console.log(quiz);
            this.props.onQuizLoad(quiz);
            this.props.onQuizEnd("SectionLoadFromConcept");
            this.props.history.push('quiz')
          });
        
      }
    checkLoaded = () => {
        setTimeout(() => {
            
            if (this.state.j == this.state.sections.length)
            {
                this.setState({ isLoaded: true });
                // this.getStatus();
            }
            else
            {
                this.checkLoaded();
            }
        }, 1000);
    }
    getStatus = (i) => {
        let na = [...this.state.sections];
        console.log(na[i]);
        let url = this.props.url+"/api/performance/?enrollment="+na[i].enr;
        axios.get(url).then((res) => {
            console.log(res.data);
            let concepts = res.data.Content;
            let strong = true;
            for (let j = 0; j < concepts.length; j++) {
                if (concepts[j].status != "strong") {
                    strong = false;
                }
            }
            console.log(strong);
            na[i].loaded = true;
            na[i].strong = strong;
            na[i].concept = concepts;
            this.setState({sections:na})
        })
        
    }
    assessment = (aid) =>
    {
        this.setState({ isLoaded: false });
        let sectionid = aid;
        this.props.currentassessment(aid);
        let url = this.props.url + "/api/quiz/?assessment_id=" + sectionid;
        axios.get(url).then((res) => {
        // Convert res.data.content to array
        let quiz = { name: "Assessment Quiz", questions: res.data.Content };
        console.log(quiz);
        this.props.onQuizLoad(quiz);
        this.props.onQuizEnd("SectionLoad");
        this.props.history.push('quiz');
        }); 
    }
    testout = (id) => {
        this.setState({ isLoaded: false });
        let assessment_id =id;
        this.props.currentassessment(assessment_id);
        let url = this.props.url+"/api/quiz/?assessment_id=" + assessment_id;
        axios.get(url).then((res) => {
          // Convert res.data.content to array
          let quiz = { name: "Test Out Quiz", questions: res.data.Content };
          console.log(quiz);
          this.props.onQuizLoad(quiz);
          this.props.onQuizEnd("TestOut");
          this.props.history.push('quiz');
        });
      };
    render() { 
        return (<div><NavBar></NavBar> <div class="col-md-12">
        <div class="udb">
            <div class="udb-sec udb-time">
                <h4><img src="images/icon/db4.png" alt="" /> Time Line</h4>
                <p></p>
                <div class="tour_head1 udb-time-line days">
                    <ul>{this.state.isLoaded?
                            this.state.sections.map((obj, key) => {
                                return (<div>
                                
                                {(obj.active || obj.completed) && (!obj.loaded) ? this.getStatus(key):null}
                             <li class="l-info-pack-plac"> <i class="fa fa-clock-o" aria-hidden="true"></i>
                             <div class="sdb-cl-tim">
                                 <div class="sdb-cl-day">
                                         <h5>{ obj.name}</h5>
                                     <span>{obj.completed ? 'Completed' : obj.active ? 'active' : 'not enrolled'} </span>
                                 </div>
                                 <div class="sdb-cl-class">
                                            <ul>
                                                <li>
                                                    <div class="sdb-cl-class-tim">
                                                        <span> start</span>
                                                    </div>
                                                    <div class="sdb-cl-class-name">
                                                        <h5>Assessment <span>{obj.completed || obj.active || this.state.enrolling ? <button className='sdb-cl-class-name-btn   ' onClick={() => this.assessment(obj.id)}>Start Quiz</button> : <button disabled className='sdb-cl-class-name-grey'> Start Quiz</button>}</span></h5>
                                                        <span class="sdn-hall-na">Start Section</span>
                                                    </div>
                                                </li>
                                                {obj.concept.map((o, k) => {
                                                    return (<div>
                                                        <li>
                                             <div class="sdb-cl-class-tim">
                                                                <span>{obj.active || obj.completed ? o.status?o.status:'loading' : 'inacive'}</span>
                                             </div>
                                             <div class="sdb-cl-class-name">
                                                    <h5>{o.name} <span>{obj.completed || obj.active ? <button className='sdb-cl-class-name-btn   ' onClick={() => this.startQuiz(o,obj.enr)}>Start Quiz</button> : <button disabled className='sdb-cl-class-name-grey'> Start Quiz</button>}</span></h5>
                                                 <span class="sdn-hall-na">{obj.active || obj.completed ? o.performance!=null?o.performance+"%":'loading' : '0%'}</span>
                                             </div>
                                         </li>
                                                    </div>)
                                                })}

                                                    <li>
                                                    <div class="sdb-cl-class-tim">
                                                        <span>finish</span>
                                                    </div>
                                                    <div class="sdb-cl-class-name">
                                                        <h5>Testout <span>{obj.completed || (obj.active && obj.strong) ? <button className='sdb-cl-class-name-btn ' onClick={() => this.testout(obj.id)}>Start Quiz</button> : <button disabled className='sdb-cl-class-name-grey'> Start Quiz</button>}</span></h5>
                                                        <span class="sdn-hall-na">End Section</span>
                                                    </div>
                                                </li>
                                     </ul>
                                 </div>
                             </div>
                                </li>
                                </div>)
                        }):<Preloader></Preloader>}    
                       
                        
                        
                        
                    </ul>
                
                    </div>
            </div>
        </div>
    </div></div> );
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Timeline);