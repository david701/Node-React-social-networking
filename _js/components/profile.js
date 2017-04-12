import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Parent extends React.Component{
	state={user:{}}

	componentDidMount(){
		$.get('/api/v1/users/58ebda9a0432625f23852f0e').then((data)=>{
			this.setState({user:data});
		})
	}

	render(){

		return(
			<div>
			<div className="user-info">
							<div className="main">
								<figure className="avatar">
									<img src="/assets/images/avatars/cat-1.png" alt="" />
								</figure>
								<div className="details">
									<h5>{this.state.user.name}</h5>
									<p>Achievement-Placeholder</p>
									<p>
										<a href=".">
											www.mywebsite.com
										</a>
									</p>
									<ul className="social-links">
										<li>
											<a href=".">
												<img src="/assets/images/icons/social/goodreads.svg" alt="Goodreads" />
											</a>
										</li>
										<li>
											<a href=".">
												<img src="/assets/images/icons/social/amazon.svg" alt="Amazon" />
											</a>
										</li>
										<li>
											<a href=".">
												<img src="/assets/images/icons/social/wordpress.svg" alt="Wordpress" />
											</a>
										</li>
										<li>
											<a href=".">
												<img src="/assets/images/icons/social/facebook.svg" alt="Facebook" />
											</a>
										</li>
										<li>
											<a href=".">
												<img src="/assets/images/icons/social/twitter.svg" alt="Twitter" />
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="progress-meter">
								<a href="." className="help-link">?</a>
								<figure>
									<figcaption>
										<h4>80%</h4>
									</figcaption>
									<div className="meter"></div>
								</figure>
							</div>
						</div>
						<div></div>
						</div>
		)
	}
}

if(document.getElementById('accountInfo'))
	ReactDOM.render(<Parent />, document.getElementById('accountInfo'))
