import React, { Component } from "react";
import '../index.css';
import './css/main.css';
import './css/util.css';
import Axios from "axios";
import ActionTypes from "../constants/actiontypes";
import { connect } from "react-redux";
import $ from "jquery";
const mapStateToProps = (state) => ({
    ...state,
  });
  const mapDispatchToProps = (dispatch) => ({
    SignUp: (user) => dispatch({ type: ActionTypes.SignUp, payload: user }),
  });
  
class Signup extends Component
{
    state = { name: "",error:'', email: "", password: "", confirmpassword:'', type:'password' ,loading:false};

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
    if (e.target.value==this.state.confirmpassword)
    {
      this.setState({
        error:''
      })
    }
  };
  handleConfirmPassword = (e) => {
    this.setState({
      confirmpassword: e.target.value,
    });
    if (e.target.value==this.state.password)
    {
      this.setState({
        error:''
      })
    }
    else 
    {
      this.setState({
        error:'Password Do not Match'
      })
      }
  };
  onSignUp = (e) => {
    e.preventDefault();
    let url = this.props.url+"/api/user/profile/";
    let content = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      is_staff: false,
    };
    if (this.state.password == this.state.confirmpassword) {
      this.setState({ loading: true})
      Axios.post(url, content)
        .then((res) => {
          console.log(res);
          $('SignupModal').modal('hide');
          
        })
        .catch((err) => {
          this.setState({
            loading:false,
            error:'Sign up failed'
          })
        });
    }
    else 
    {
      this.setState({
        error: 'Passowrd Donot Match'
      });
    }
  };
  togglePassword = () => {
    if (this.state.type == 'password')
    {
      this.setState({
        type:'text'
      })
    }
    else  this.setState({
      type:'password'
    })
  }
    render()
    {
        
        return(
            <div>


<div class="modal fade" id="SignupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
            <div class="modal-content">
            
                            <div class="modal-body">
                                <center>
            <div class="limiter " style={{marginTop:"50px"}}>
		<form class="login100-form validate-form" onSubmit={this.onSignUp}>
        <span class="login100-form-title">
            Create Account
        </span>
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input class="input100" type="text" name="name" placeholder="Name" style={{marginTop:"20px"}} value={this.state.name}
                            onChange={this.handleName}/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
        </div>
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input class="input100" type="text" name="email" placeholder="Email" value={this.state.email}
                            onChange={this.handleEmail}/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
        </div>

        <div class="wrap-input100 validate-input" data-validate = "Password is required">
            <input class="input100" type="password" name="pass" placeholder="Password" value={this.state.password}
                            onChange={this.handlePassword}/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
        </div>
        <div class="wrap-input100 validate-input" data-validate = "Password is required">
            <input class="input100" type="password" name="pass" placeholder="Re-enter Password" value={this.state.confirmpassword}
                            onChange={this.handleConfirmPassword}/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
        </div>
        <div class="text-center p-t-12" hidden={this.state.error==''}>
            <span class="txt1" style={{color:"red"}}>
                {this.state.error}
            </span>
           
        </div>

        
        <div class="container-login100-form-btn">
            <button class="login100-form-btn" type="submit">
                Signup
            </button>
        </div>


        <div class="text-center p-t-136">
            <button class="txt2" data-dismiss="modal"  data-toggle="modal" data-target="#loginModal">
                Have your Account
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
export default connect(mapStateToProps,mapDispatchToProps)(Signup);