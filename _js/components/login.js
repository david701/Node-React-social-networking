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
            error: ''
    	};
    	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

    handleChange(event) {
        //get target
        let target = event.target;
        //set value
        this.profile[target.name] = target.value;
        //set state
        this.setState({profile: this.profile, error: ''});
    }

    closeLogin(event){
        $('body').removeClass('modal-showing');
        $('.login-modal').css({visibility: 'hidden', opacity: 0});
    }

    handleClick(event){
        event.stopPropagation();
    }

	handleSubmit(event){
		//restart profile
		$.post('/api/v1/login', this.profile).then((data)=>{
            if(data.status === "error"){
                this.setState({error: data.message});
            }else{
                window.location.href = "/dashboard";
            }
		});
		this.new_profile = new Profile();
		this.setState({profile: this.new_profile});
		event.preventDefault();
	}

	render(){
		return(
            <div className="overlay" onClick={this.closeLogin}>
                <div className="content-block-small content-block" onClick={this.handleClick}>
                    <h3>Book Brawl Log In</h3>
                    <p className="quote">“Some type of quote.”</p>
                    {this.state.error &&
                        <p className="error-message">{this.state.error}</p>
                    }
                    <form onSubmit={this.handleSubmit}>
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
                                <a className="button button-white" href=".">Close</a>
                                <input className="button button-red" type="submit" value="Login" />
                            </div>
                            <div className="controls">
                                <p><a className="modal-trigger-password" href=".">Forgot Password?</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
		)
	}
}

if(document.getElementById('log-in'))
	ReactDOM.render(<Login />, document.getElementById('log-in'))
