import React, { Component } from "react";
import './css/main.css';
import './css/util.css';
import Axios from "axios";
import ActionTypes from "../constants/actiontypes";
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";
const mapStateToProps = (state) => ({
    ...state
  });
  const mapDispatchToProps = (dispatch) => ({
    Login: (user) => dispatch({ type: ActionTypes.Login, payload: user }),
  });
class Login extends Component
{
    state = {
        email: '',
        password:'',
        error:false , type:'password', loading:false
    }
    emailHandler = (e) => {
        this.setState({ email: e.target.value
        ,error:false });
    }
    passwordHandler = (e) => {
        this.setState({ password: e.target.value, error:false });
    }
    onLogin = (e) => {
        e.preventDefault(); 
        let url = this.props.url+"/api/login/";
        let content = {
          username: this.state.email,
          password: this.state.password,
        };
        this.setState({loading:true})
        Axios.post(url, content)
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
                $('#loginModal').modal('hide');
              let token = res.data.token;
              url = this.props.url+"/api/user/profile/";
              Axios.get(url).then((res) => {
                let user;
                for (let i = 0; i < res.data.length; i++) {
                  if (res.data[i].email == this.state.email) {
                    user = res.data[i];
                    user.isLoggedIn = true;
                    break;
                  }
                }
                
                // check admin or user
                this.props.Login(user);
               
                if (user.is_staff) this.props.history.push("admin/courses/");
                else this.props.history.push("/dashboard");

              });
            }
          })
          .catch((err) => {
            this.setState({ loading: false })
            this.setState({error:true})
          });
        }

    render()
    {
        
        return(
            <div>


<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
            <div class="modal-content">
            
                            <div class="modal-body">
                                <center>
            <div class="limiter ">
		<form onSubmit={this.onLogin} class="login100-form validate-form" style={{marginTop:"50px"}}>
        <span class="login100-form-title">
            Member Login
        </span>

        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input class="input100" type="text" name="email" value={this.state.email} onChange={this.emailHandler} placeholder="Email"/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
        </div>

        <div class="wrap-input100 validate-input" data-validate = "Password is required">
            <input class="input100" type="password" name="pass" value={this.state.password} onChange={this.passwordHandler} placeholder="Password"/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
        </div>
        <div class="text-center p-t-12" hidden={!this.state.error}>
            <span class="txt1" style={{color:"red"}}>
                Invalid Email or password
            </span>
           
        </div>
        
        <div class="container-login100-form-btn">
            <button class="login100-form-btn" type="submit">
                Login
            </button>
        </div>
        

        <div class="text-center p-t-12">
            <span class="txt1">
                Forgot
            </span>
            <a class="txt2" href="#">
                Username / Password?
            </a>
        </div>

        <div class="text-center p-t-136">
        <button class="txt2" data-dismiss="modal"  data-toggle="modal" data-target="#SignupModal">
                Create your Account
                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </button>
        </div>
    </form> </div> </center>
            </div>
           
            </div>
        </div>
        </div>    
            </div>
        )
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));