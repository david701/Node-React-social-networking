import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Profile = function(){
        this.id = 0;
    	this.password = '';
    	this.email = '';
 	}

class ResetPassword extends React.Component{

	constructor(props) {
    	super(props);
        this.new_profile = new Profile();
    	this.state = {
            pending: true,
    		profile: this.new_profile
    	};
    	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
        this.loadProfile = this.loadProfile.bind(this);
  	}

    componentWillMount(){
        //get user session
        $.get('/api/v1/user_session/').then((response)=>{
            if(response.status === 'error'){
                window.location.href = "/";
            }else{
                this.loadProfile(response.data._id);
            }
        });
    }

    loadProfile(id){
        let self = this;
        $.get('/api/v1/users/' + id).then((response)=>{
            response.data.password = '';
            self.setState({
                profile: $.extend(this.state.profile,response.data)
            });
        });
    }

  	handleChange(event) {
  		let target = event.target;
        //new profile
  		this.new_profile[target.name] = target.value;
  		//set the state
    	this.setState({profile: this.new_profile});
  	}

	handleSubmit(event){
        //update profile
        //$.ajax({
        //    url: '/api/v1/users/' + this.state.profile._id,
        //    type: 'put',
        //    data: this.new_profile,
        //    dataType: 'json',
         //   success: function(response){
        //        window.location.href = "/dashboard/edit";
        //    }
        //});
        this.setState({pending: false});
        event.preventDefault();
	}

	render(){
		return(
            <div>
                {this.state.pending &&
                    <div>
                        <header>
                            <h3>Reset your Password</h3>
                        </header>
            			<form onSubmit={this.handleSubmit}>
            				<h4>Enter your new password below</h4>
            				<ul className="field-list">
            					<li>
            						<label htmlFor="password1">New Password</label>
            						<input id="password1" name="password" type="password" value={this.state.profile.password} onChange={this.handleChange} />
            					</li>
            					<li>
            						<label htmlFor="password2">Confirm New Password</label>
            						<input id="password2" type="password" />
            					</li>
            				</ul>
            				<hr/>
                            <div className="submit-row">
                                <div className="field">
                                </div>
                                <div className="buttons">
                                    <a className="button button-white" href=".">Close</a>
                                    <input className="button button-red" type="submit" value="Reset Password" />
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
