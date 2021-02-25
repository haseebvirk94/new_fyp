import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./style/css/animate.css";
import "./style/css/nice-select.css";
import "./style/css/responsive.css";
import "./style/css/style.css";
import Home from "./components/Home";
import Timeline from "./components/Timeline";
import About from "./components/About";
import Courses from "./components/Courses";
import SingleCourse from "./components/single_course";
import Quiz from "./components/Quiz/Quiz";
import Dashboard from "./components/Dashboard";
import Progress from "./components/Progress";
import CourseProgress from "./components/CourseProgress";
import AssessmentProgress from "./components/AssessmentProgress";
import EditableContent from "./components/admin/Contents/EditableContent";
import Course from "./components/admin/Course/Course";
import adminCourses from "./components/admin/Course/Courses";
import AddCourse from "./components/admin/Course/AddCourse";

// import adminCourses from "./components/admin/Courses";
const hist = createBrowserHistory();
function App() {
  return (
      <Router history={hist}>
      <Switch>
        <Route path="/Home" component={Home} />
        <Route path="/About" component={About} />
        <Route path="/Courses" component={Courses} />
        <Route path="/Timeline" component={Timeline} />
        <Route path="/SingleCourse" component={SingleCourse} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Progress" component={Progress} />
        <Route path="/CourseProgress" component={CourseProgress} />
        <Route path="/AssessmentProgress" component={AssessmentProgress} />
        {/* <Route path="/admin/courses" component={adminCourses} /> */}
        <Route path="/admin/contents" component={EditableContent} />
        <Route path="/admin/Course" component={Course} />
        <Route path="/admin/Courses" component={adminCourses} />
        <Route path="/admin/addcourse" component={AddCourse} />
        {/* <Redirect from="/" to="/Home" /> */}
      </Switch>
    </Router>
  );
}

export default App;
