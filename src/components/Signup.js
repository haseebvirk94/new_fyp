import React, { Component } from "react";
import '../index.css';
import './css/main.css';
import './css/util.css';

class Signup extends Component
{
    render()
    {
        
        return(
            <div>


<div class="modal fade" id="SignupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
            <div class="modal-content">
            
                            <div class="modal-body">
                                <center>
            <div class="limiter ">
		<form class="login100-form validate-form" onSubmit={this.onSignUp}>
        <span class="login100-form-title">
            Create Account
        </span>
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input class="input100" type="text" name="name" placeholder="Name"/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
        </div>
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input class="input100" type="text" name="email" placeholder="Email"/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
        </div>

        <div class="wrap-input100 validate-input" data-validate = "Password is required">
            <input class="input100" type="password" name="pass" placeholder="Password"/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
        </div>
        <div class="wrap-input100 validate-input" data-validate = "Password is required">
            <input class="input100" type="password" name="pass" placeholder="Re-enter Password"/>
            <span class="focus-input100"></span>
            <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
        </div>
        
        <div class="container-login100-form-btn">
            <button class="login100-form-btn">
                Signup
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
            <a class="txt2" href="#">
                Create your Account
                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </a>
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
export default Signup;