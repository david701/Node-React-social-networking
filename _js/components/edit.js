import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

//variables that will never change
const genres = ["Fantasy","Science Fiction","Horror","Non-Fiction","Mystery","Romance","Poetry"];
const themes = ["Contemporary", "Historical", "Drama", "ChickLit", "Tragedy", "Adventure", "Urban", "Epic", "Romance", "Spiritual", "Humor", "Paranormal", "Young Adult","Middle Grade","Children","Thriller","Mystery","Classic"];
const Profile = function(){
      this.id = id
		  this.avatar = '';
    	this.name = '';
    	this.password = '';
    	this.email = '';
    	this.bday = '';
    	this.gender = 'Select One';
    	this.social_media = {
    		website: '',
    		good_reads: '',
    		amazon: '',
    		wordpress: '',
    		facebook: '',
    		twitter: ''
    	}
    	this.genres = [];
    	this.themes = [];
    	this.newsletter = true;
 	}

class SignUp extends React.Component{

	constructor(props) {
    	super(props);
        this.new_profile = new Profile();
    	this.state = {
        id: this.new_profile.id,
    		profile: this.new_profile
    	};
    	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

    componentWillMount(){
        //get user session
        $.get('/api/v1/user_session/').then((response)=>{
            if(!this._objectEmpty(response.data)){
                let id = this.new_profile.id || response.data._id;
                this.loadInfo(id);
            }else{
                window.location.href = "/";
            }
        });
    }

    _objectEmpty(obj){
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    loadInfo(id){
        let self = this;
        $.get('/api/v1/users/' + id).then((response)=>{
            delete response.data.password;
            self.setState({
                profile: $.extend(this.state.profile,response.data)
            });
        });
    }

  	handleChange(event) {
  		let target = event.target,
  		props = target.name.split('.'),
  		value = (target.value === "true") ? true : (target.value === "false") ? false : target.value;


  		//if the property is nested, dig 1 level deeper
  		if(props.length > 1){
  			// add sub properties here
  			if(props[0] === "social_media"){
  				this.new_profile.social_media[props[1]] = value;
  			}
  		}
  		//if its a checkbox, add/delete values in an array
  		else if(target.type === "checkbox" && Array.isArray(this.new_profile[target.name])){
  			//get index of value
  			let index = this.new_profile[target.name].indexOf(value);
  			//if checked, add value
  			if(target.checked){
  				this.new_profile[target.name].push(value);
  			}
  			//if not checked, remove value
  			else{
  				this.new_profile[target.name].splice(index,1);
  			}
  		}
  		//if it isn't a checkbox or a sub property
  		else {
  			this.new_profile[target.name] = value;
  		}
  		//set the state
    	this.setState({profile: this.new_profile});
  	}

	handleSubmit(event){
        //update profile
        delete this.new_profile.password;
        $.ajax({
            url: '/api/v1/users/' + this.state.profile._id,
            type: 'put',
            data: this.new_profile,
            dataType: 'json',
            success: function(response){
                window.location.href = "/dashboard/edit";
            }
        });
        event.preventDefault();
	}

	isChecked(array,value){
		let val = array.filter(function(item,index){
				return item === value;
		});
		return val.length ? true : false;
	}

	createCheckboxes(items,type){
		let self = this;
		return items.map(function(item,index){
			let id = item.replace(/\s+/g,'-').toLowerCase();
			return (
				<li key={id}>
					<input id={id} type="checkbox" name={type} value={item} onChange={self.handleChange} checked={self.isChecked(self.state.profile[type],item)}/>
					<label htmlFor={id}>{item}</label>
				</li>
			)
		})
	}

	render(){
		return(
      <div>
      {!this.state.id &&
        <header>
          <h3>Edit your Profile</h3>
        </header>
      }
      {this.state.id &&
        <header>
          <h3>Edit {this.state.profile.name}'s Profile</h3>
        </header>
      }
			<form onSubmit={this.handleSubmit}>
				<h4>Tell us about yourself</h4>
				<p>Edit your photo:</p>
				<div className="avatar-selection">
					<figure className="avatar"><img src={this.state.profile.avatar} /></figure>
          <ul className="radio-list">
            <li>
              <input type="radio" name="avatar" id="avatar-1" value="/assets/images/avatars/Dog_1.png" onChange={this.handleChange} checked={this.state.profile.avatar === '/assets/images/avatars/Dog_1.png'}/>
              <label htmlFor="avatar-1">Apprentice Puppy</label>
            </li>
            <li>
              <input type="radio" name="avatar" id="avatar-2" value="/assets/images/avatars/Cat_1.png" onChange={this.handleChange} checked={this.state.profile.avatar === '/assets/images/avatars/Cat_1.png' || this.state.profile.avatar === '/assets/images/avatars/cat-1.png'}/>
              <label htmlFor="avatar-2">Apprentice Kitty</label>
            </li>
          </ul>
				</div>
				<ul className="field-list">
					<li className="field-error">
						<label htmlFor="name">Your name:</label>
						<input id="name" name="name" type="text" value={this.state.profile.name} onChange={this.handleChange} disabled/>
					</li>
					<li>
						<label htmlFor="email">Your email:</label>
						<input id="email" name="email" type="text" value={this.state.profile.email} onChange={this.handleChange}/>
					</li>
					<li>
						<label htmlFor="bday">Your birth date:</label>
						<input id="bday" name="bday" type="text" value={this.state.profile.bday} onChange={this.handleChange} disabled/>
					</li>
					<li>
						<label htmlFor="gender">Your gender:</label>
            <select id="gender" name="gender" type="text" value={this.state.profile.gender} onChange={this.handleChange}>
              <option value="Select One">Select One</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
					</li>
				</ul>
				<hr/>
				<h4>Where else can we find you?</h4>
    				<ul className="field-list">
    					<li>
    						<label htmlFor="website">Your website URL</label>
    						<input id="website" name="social_media.website" value={this.state.profile.social_media.website} onChange={this.handleChange} type="text"/>
    					</li>
    					<li>
    						<label htmlFor="good_reads">Goodreads URL</label>
    						<input id="good_reads" name="social_media.good_reads" value={this.state.profile.social_media.good_reads} onChange={this.handleChange} type="text"/>
    					</li>
    					<li>
    						<label htmlFor="amazon">Amazon URL</label>
    						<input id="amazon" name="social_media.amazon" value={this.state.profile.social_media.amazon} onChange={this.handleChange} type="text"/>
    					</li>
    					<li>
    						<label htmlFor="wordpress">WordPress URL</label>
    						<input id="wordpress" name="social_media.wordpress" value={this.state.profile.social_media.wordpress} onChange={this.handleChange}  type="text"/>
    					</li>
    					<li>
    						<label htmlFor="facebook">Facebook URL</label>
    						<input id="facebook" name="social_media.facebook" value={this.state.profile.social_media.facebook} onChange={this.handleChange}  type="text"/>
    					</li>
    					<li>
    						<label htmlFor="twitter">Twitter URL</label>
    						<input id="twitter" name="social_media.twitter" value={this.state.profile.social_media.twitter} onChange={this.handleChange} type="text"/>
    					</li>
    				</ul>
				<hr/>
				<h4>Account Details</h4>
				<ul className="field-list">
					<a href="/reset-password" className="button reset-password">Reset Password</a>
				</ul>
				<hr/>
				<h4>Tell us what you like to see</h4>
				<p>What Genres do you like?</p>
				<ul className="toggle-list">
					{ this.createCheckboxes(genres, 'genres') }
					<li className="spacing-block"></li>
					<li className="spacing-block"></li>
				</ul>
				<p>What type of Fiction Themes?</p>
				<ul className="toggle-list">
					{ this.createCheckboxes(themes, 'themes') }
					<li className="spacing-block"></li>
					<li className="spacing-block"></li>
				</ul>
				<div className="submit-row">
					<div className="field">
						<input type="checkbox" name="newsletter" id="newsletter" value={!this.state.profile.newsletter} onChange={this.handleChange} checked={this.state.profile.newsletter}/>
						<label htmlFor="newsletter">I want to subscribe to newsletters</label>
					</div>
					<div className="buttons">
						<a className="button button-white" href=".">Close</a>
						<input className="button button-red" type="submit" value="Edit Profile" />
					</div>
				</div>
			</form>
      </div>
		)
	}
}

if(document.getElementById('edit-page'))
	ReactDOM.render(<SignUp />, document.getElementById('edit-page'))
