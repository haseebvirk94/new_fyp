import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./style/css/animate.css";
import "./style/css/nice-select.css";
import "./style/css/responsive.css";
import "./style/css/style.css";
import Home from "./components/Home";
import About from "./components/About";
import Courses from "./components/Courses";
import SingleCourse from "./components/single_course";


const hist = createBrowserHistory();
function App() {
  return (
      <Router history={hist}>
      <Switch>
        <Route path="/Home" component={Home} />
        <Route path="/About" component={About} />
        <Route path="/Courses" component={Courses} />
        <Route path="/SingleCourse" component={SingleCourse} />
        
        <Redirect from="/" to="/Home" />
      </Switch>
    </Router>
  );
}

export default App;
