import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

//variables that will never change
const Profile = function(){
    	this.password = '';
    	this.email = '';
 	  }

class Login extends React.Component{

	constructor(props) {
    	super(props);
        this.profile = new Profile();
    	this.state = {
    		profile: this.profile,
            error: '',
            isFlipped: false
    	};
    	this.handleChange = this.handleChange.bind(this);
    	this.handleLogin = this.handleLogin.bind(this);
        this.closeLogin = this.closeLogin.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.flipWindow = this.flipWindow.bind(this);
  	}

    resetProfile(){
        this.new_profile = new Profile();
        this.setState({profile: this.new_profile});
    }

    handleChange(event) {
        //get target
        let target = event.target;
        //set value
        this.profile[target.name] = target.value;
        //set state
        this.setState({profile: this.profile, error: ''});
    }

    flipWindow(event){
        this.setState({isFlipped: !this.state.isFlipped});
        this.resetProfile();
        event.preventDefault();
    }

    closeLogin(event){
        $('body').removeClass('modal-showing');
        this.setState({isFlipped: false});
        $('.login-modal').css({visibility: 'hidden', opacity: 0});
    }

    handleClick(event){
        event.stopPropagation();
    }

    handleResetPassword(event){
        let new_profile = {
            email: this.state.profile.email
        }
        //restart profile
        //$.post('/api/v1/some-link',new_profile).then((data)=>{
        //    if(data.status === "error"){
        //        this.setState({error: data.message});
        //    }else{
        //        //send email
        //    }
        //});
        window.location.href = "/recover-password";
        this.resetProfile();
        event.preventDefault();
    }

	handleLogin(event){
		//restart profile
		$.post('/api/v1/login', this.profile).then((data)=>{
            if(data.status === "error"){
                this.setState({error: data.message});
            }else{
                window.location.href = "/dashboard";
            }
		});
		this.resetProfile();
		event.preventDefault();
	}

	render(){
		return(
                <div className="overlay">
                    <div className={this.state.isFlipped ? 'card effect__click flipped' : 'card effect__click'}>
                        <div className="card__front">
                            <div className="content-block-small content-block" onClick={this.handleClick}>
                                <h3>Book Brawl Log In</h3>
                                <p className="quote">“Some type of quote.”</p>
                                {this.state.error &&
                                    <p className="error-message">{this.state.error}</p>
                                }
                                <form onSubmit={this.handleLogin}>
                                    <ul className="field-list field-list-small">
                                        <li>
                                            <label htmlFor="email">Email Address</label>
                                            <input id="email" name="email" value={this.state.profile.email} onChange={this.handleChange} type="text"/>
                                        </li>
                                        <li>
                                            <label htmlFor="passwprd">Password</label>
                                            <input id="password" name="password" value={this.state.profile.password} onChange={this.handleChange} type="password"/>
                                        </li>
                                    </ul>
                                    <div className="submit-row submit-row-small">
                                        <div className="buttons">
                                            <a className="button button-white" href="javascript:void(0)" onClick={this.closeLogin}>Close</a>
                                            <input className="button button-red" type="submit" value="Login" />
                                        </div>
                                        <div className="controls">
                                            <p>Forgot your Password? <a className="modal-trigger-password" href="javascript:void(0)" onClick={this.flipWindow}>Reset it here.</a></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="card__back">
                            <div className="content-block-small content-block" id="reset">
                                <h3>Password Reset</h3>
                                <p className="instructions">Instructions here.</p>
                                {this.state.error &&
                                    <p className="error-message">{this.state.error}</p>
                                }
                                <form onSubmit={this.handleResetPassword}>
                                    <ul className="field-list field-list-small">
                                        <li>
                                            <label htmlFor="email">Email Address</label>
                                            <input id="email" name="email" value={this.state.profile.email} onChange={this.handleChange} type="text"/>
                                        </li>
                                    </ul>
                                    <div className="submit-row submit-row-small">
                                        <div className="buttons">
                                            <a className="button button-white" href="javascript:void(0)" onClick={this.closeLogin}>Close</a>
                                            <input className="button button-red" type="submit" value="Reset Password" />
                                        </div>
                                        <div className="controls">
                                            <p>Know your password? <a className="modal-trigger-password link" onClick={this.flipWindow} href="javascript:void(0)">Login Here</a>.</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
		)
	}
}

if(document.getElementById('log-in'))
	ReactDOM.render(<Login />, document.getElementById('log-in'))
