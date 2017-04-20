import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { validate, formValid } from '../plugins/validation.js';

const Profile = function(){
    	this.password = '';
    	this.userId = '';
        this.role = 0;
 	}

class ResetPassword extends React.Component{

	constructor(props) {
    	super(props);
        this.new_profile = new Profile();
        this.new_profile.userId = id;
    	this.state = {
            pending: true,
    		profile: this.new_profile
    	};
    	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

    componentWillMount(){
        //get user session
        $.get('/api/v1/user_session/').then((response)=>{
            if(response.status === 'error'){
                window.location.href = "/";
            }
            //are you the user or admin? if else, kick them out
            else if ( (response.data._id === this.new_profile.userId) || (response.data.role > 0) ) {
                this.new_profile.userId = response.data._id;
                this.new_profile.role = response.role;
                this.setState({profile: this.new_profile});
            } else {
               window.location.href = "/dashboard";
            }
        });
    }

  	handleChange(event) {
  		let target = event.target;
        //new profile
        if(target.name in this.new_profile) {
  		    this.new_profile[target.name] = target.value;
            this.setState({profile: this.new_profile});
        }
        //toggle submit button
        formValid(event);
  	}

	handleSubmit(event){
        //update profile
        $.ajax({
            url: '/api/v1/reset_password',
            type: 'post',
            data: this.state,
            dataType: 'json',
            success: function(response){
                window.location.href = "/dashboard/edit";
            }
        });
        this.setState({pending: false});
        event.preventDefault();
	}

	render(){
        let title = this.state.profile.role > 0 ? "Reset " + this.state.profile.name + "'s password." : "Reset your Password";
		return(
            <div>
                {this.state.pending &&
                    <div>
                        <header>
                            <h3>{title}</h3>
                        </header>
            			<form onSubmit={this.handleSubmit}>
            				<h4>Enter your new password below</h4>
                            <span className="instructions">Password must be 8 to 10 characters and contain at least one uppercase letter, lowercase letter, number, and special character (etc. @$!%*?&).</span>
            				<ul className="field-list">
            					<li>
                                    <div className="title">
                                        <label htmlFor="password1"><span>*</span>New Password</label>
                                        <span className="help-text">Please enter your new password</span>
                                    </div>
            						<input id="password1" name="password" type="password" value={this.state.profile.password} onChange={this.handleChange} onBlur={validate} data-validation="password,required"/>
            					</li>
            					<li>
                                    <div className="title">
                                        <label htmlFor="password2"><span>*</span>Confirm Password</label>
                                        <span className="help-text">This password does not match</span>
                                    </div>
            						<input id="password2" type="password" onBlur={validate} data-password={this.state.profile.password} onChange={this.handleChange} data-validation="confirmPassword,required"/>
            					</li>
            				</ul>
            				<hr/>
                            <div className="submit-row">
                                <div className="field">
                                </div>
                                <div className="buttons">
                                    <a className="button button-white" href=".">Close</a>
                                    <input className="button button-red" type="submit" value="Reset Password" disabled/>
                                </div>
                            </div>
            			</form>
                    </div>
                }
                {!this.state.pending &&
                    <div>
                        <header>
                            <h3>Your Password was Reset!</h3>
                        </header>
                        <div className="field">
                            <span>Feel free to explore??</span>
                        </div>
                        <hr/>
                        <div className="submit-row">
                            <div className="field"></div>
                            <div className="buttons">
                                <a className="button button-white" href=".">Close</a>
                                <a className="button button-red" href="/dashboard">Go to Dashboard</a>
                            </div>
                        </div>
                    </div>
                }
            </div>
		)
	}
}

if(document.getElementById('reset-password'))
	ReactDOM.render(<ResetPassword />, document.getElementById('reset-password'))
