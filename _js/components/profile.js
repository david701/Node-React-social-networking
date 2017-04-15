import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Profile = function(){
		this.id = ''
		this.avatar = '';
    	this.name = '';
    	this.password = '';
    	this.email = '';
    	this.bday = '';
    	this.gender = '';
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


class Parent extends React.Component{

	constructor(props) {
    	super(props);
    	this.user = new Profile();
    	this.state = {
    		user: this.user
    	};
  	}

	componentDidMount(){
		let self = this;
		$.get('/api/v1/user_session/').then((response)=>{
			if(response.data){
				this.user.id = response.data._id;
				this.setState({user: this.user});
				self.loadUserInfo(this.user.id);
			}
		});
	}

	loadUserInfo(id){
		$.get('/api/v1/users/' + id).then((response)=>{
			console.log('login info: ' + JSON.stringify(response.data));
			this.setState({
				user: response.data
			});
		});
	}

	render(){
		return(
			<div>
			<div className="user-info">
				<div className="main">
					<figure className="avatar">
						<img src={this.state.user.avatar} alt="" />
					</figure>
					<div className="details">
						<h5>{this.state.user.name}</h5>
						{this.state.user.achievement &&
							<p>Achievement-Placeholder</p>
						}
						{this.state.user.social_media &&
							<div className="basic-profile">
								{this.state.user.social_media.website &&
									<p>
										<a href={this.state.user.social_media.website} target="_blank">
											{this.state.user.social_media.website}
										</a>
									</p>
								}
								<ul className="social-links">
									{this.state.user.social_media.good_reads &&
										<li>
											<a href={this.state.user.social_media.good_reads} target="_blank">
												<img src="/assets/images/icons/social/goodreads.svg" alt="Goodreads" />
											</a>
										</li>
									}
									{this.state.user.social_media.amazon &&
										<li>
											<a href={this.state.user.social_media.amazon} target="_blank">
												<img src="/assets/images/icons/social/amazon.svg" alt="Amazon" />
											</a>
										</li>
									}
									{this.state.user.social_media.wordpress &&
										<li>
											<a href={this.state.user.social_media.wordpress} target="_blank">
												<img src="/assets/images/icons/social/wordpress.svg" alt="Wordpress" />
											</a>
										</li>
									}
									{this.state.user.social_media.facebook &&
										<li>
											<a href={this.state.user.social_media.facebook} target="_blank">
												<img src="/assets/images/icons/social/facebook.svg" alt="Facebook" />
											</a>
										</li>
									}
									{this.state.user.social_media.twitter &&
										<li>
											<a href={this.state.user.social_media.twitter} target="_blank">
												<img src="/assets/images/icons/social/twitter.svg" alt="Twitter" />
											</a>
										</li>
									}
								</ul>
							</div>
						}
					</div>
				</div>
				{this.state.user.achievement &&
					<div className="progress-meter">
						<a href="." className="help-link">?</a>
						<figure>
							<figcaption>
								<h4>80%</h4>
							</figcaption>
							<div className="meter"></div>
						</figure>
					</div>
				}
			</div>
			<div></div>
			</div>
		)
	}
}

if(document.getElementById('accountInfo'))
	ReactDOM.render(<Parent />, document.getElementById('accountInfo'))
