import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Profile = function(){
		this.id = id;
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


class Author extends React.Component{

	constructor(props) {
    	super(props);
    	this.user = new Profile();
    	this.state = {
    		id: id,
    		me: this.user,
    		user: this.user,
    		following: false
    	};
    	this.handleFollow = this.handleFollow.bind(this);
    	this.isFollowing = this.isFollowing.bind(this);
  	}

	handleFollow(){
		var data = {
			authorId: this.state.user._id
		};
		$.post('/api/v1/follow_author',data).then((response)=>{
			if(response.status === "error"){
				alert(response.message)
			}else {
				this.setState({
					following: true
				})
			}
		});
	}

	handleUnfollow = (event) => {
        var data = {
                authorId: this.state.user._id
        };
        $.post('/api/v1/unfollow_author',data).then((response)=>{
            if(response.status === "error"){
                alert(response.message)
            }else{
				this.setState({
					following: false
				})
            }
        });
    }

	componentWillMount(){
		let self = this;
		$.get('/api/v1/user_session/').then((response)=>{
			if(!status.error){
				self.setState({me: response.data})
				self.loadUserInfo(response.data._id,this.state.id);
			}else {
				window.location.href = "/";
			}
		});
	}

	isFollowing(userId,followers){
		let myAccount = followers.filter(function(follower,index){
			return follower._id === userId;
		});

		return myAccount.length > 0;
	}

	loadUserInfo(userId,profileId){
		let $this = this;
		$.get('/api/v1/users/' + profileId).then((response)=>{
			//in the meantime setup user data
			this.setState({
				user: response.data,
				following: $this.isFollowing(userId,response.data.followers)
			});
		});
	}

	render(){
		let following = "They're not following any authors",
		authors = this.state.user.following_authors;

		if(authors){
			if(authors.length){
				let limit = authors.length > 5 ? 5 : authors.length;
				following = [];
				for (var i = 0; i < limit; i++) {
				  following.push(<li key={i}><a href={'/author/' + authors[i]._id}><figure className="avatar"><img src={authors[i].avatar} alt=""/></figure><h5>{authors[i].name}</h5></a></li>);
				}
			}
		}

		return(
			<div>
			<div className="title-row">
				<h4>Account Info</h4>
				<a className="control" href={'/author/' + this.state.user._id + '/edit'}>Edit</a>
			</div>
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
						<div className="basic-profile">
							{this.state.user.social_media &&
								<div>
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
								{this.state.me.role < 1 &&
								<div className="button-row">
									{this.state.following &&
										<a className="button button-small button-blue" href="javascript:void(0)" onClick={this.handleUnfollow}>Unfollow me</a>
									}
									{!this.state.following &&
										<a className="button button-small button-blue" href="javascript:void(0)" onClick={this.handleFollow}>Follow me</a>
									}
									<a className="button button-small button-white button-white-blue" href=".">Message Me</a>
								</div>
								}
							</div>
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
			<hr/>
				<div class="title-row">
					<h4>Favorite Authors</h4>
				</div>
				<ul className="user-list">
					{following}
				</ul>
			</div>
		)
	}
}

if(document.getElementById('author'))
	ReactDOM.render(<Author />, document.getElementById('author'))


class Book extends React.Component{

	constructor(props) {
    	super(props);
    	this.state = {
    		name: ''
    	};
  	}

  	_objectEmpty(obj){
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }

    	return JSON.stringify(obj) === JSON.stringify({});
	}

	componentWillMount(){
		let self = this;
		$.get('/api/v1/user_session/').then((response)=>{
			if(!self._objectEmpty(response.data)){
				self.loadUserInfo(this.state.id);
			}else {
				window.location.href = "/";
			}
		});
	}

	loadUserInfo(id){
		$.get('/api/v1/users/' + id).then((response)=>{
			if(response.data){
				this.setState({
					name: response.data.name + "'s"
				});
			}
		});
	}

	render(){
		return(
			<p>{this.state.name}</p>
		)
	}
}

if(document.getElementById('author-name'))
	ReactDOM.render(<Book />, document.getElementById('author-name'))