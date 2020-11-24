import Modes from "../constants/Modes";
import ActionTypes from "../constants/actiontypes";
const initialState = {
  Courseid: 0,
  Assessmentid: 0,
  enrollment:0,
  CompleteCourseSections:0,
  TotalCourseSections:0,
  url:"http://127.0.0.1:8000",
  ResultNext: "",
  QuizData: {
    quiz: {
      name: "",
      questions: [],
    },
    mode: Modes.QuizModes.Quiz,
    index: 0,
    isLoaded: false,
  },
  User: {
    name: "",
    email: "",
    isLoggedIn: false,
    is_staff: false,
    authToken: "",
  id:0  },
  Result: [],
};
const reducer = (state = { ...initialState }, action) => {
  let newQuiz = { ...state.QuizData };
  switch (action.type) {
    case "EditAssessment":
      return {
        ...state,
        Courseid: action.payload,
      };
      case "setTotalSections":
      return {
        ...state,
        TotalCourseSections: action.payload,
      };
      case "setCompleteSections":
      return {
        ...state,
        CompleteCourseSections: action.payload,
      };
    case 'setEnrollment':
      return {
        ...state,
        enrollment: action.payload,
      };
    case ActionTypes.Login:
      return {
        ...state,
        User: action.payload,
      };
    case "Next":
      return {
        ...state,
        ResultNext: action.payload,
      };

    case "AddAssessmentConcept":
      return {
        ...state,
        Assessmentid: action.payload,
      };
      case "setCourseId":
        return{
          ...state,
          Courseid:action.payload,
        }
        case "setSectionId":
        return{
          ...state,
          Assessmentid:action.payload,
        }

    case ActionTypes.Quiz.QuizLoad:
      newQuiz.quiz = action.payload;
      newQuiz.isLoaded = true;
      newQuiz.index = 0;
      return {
        ...state,
        QuizData: newQuiz,
      };

    case ActionTypes.Quiz.ModeChange:
      newQuiz.mode = action.payload;
      return {
        ...state,
        QuizData: newQuiz,
      };

    case ActionTypes.Quiz.IndexChange:
      newQuiz.index = action.payload;
      newQuiz.mode = Modes.QuizModes.Quiz;
      return {
        ...state,
        QuizData: newQuiz,
      };

    case ActionTypes.Quiz.QuizAnswer:
      newQuiz.quiz = action.payload;
      return {
        ...state,
        QuizData: newQuiz,
      };
    case "ResultSubmit":
      //newQuiz.Result=action.payload;
      return {
        ...state,
        Result: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
