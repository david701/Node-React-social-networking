import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './components/scripts.js';
import './components/sign-up.js';
import './components/profile.js';
import './components/login.js';
import '../_sass/main.scss';

function mapObject(object, callback) {
  return Object.keys(object).map( (key) => {
    return callback(key, object[key]);
  });
}


class LoginButtons extends React.Component{

	constructor(props) {
    	super(props);
    	this.state = {
    		loggedIn: false
    	};
    	this._signOut = this._signOut.bind(this);
    	this._objectEmpty = this._objectEmpty.bind(this);
  	}

	componentDidMount(){
		$.get('/api/v1/user_session/').then((response)=>{
			let isLoggedIn = !this._objectEmpty(response.data);
			this.setState({loggedIn: isLoggedIn });
		});
	}

	_objectEmpty(obj){
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }

    	return JSON.stringify(obj) === JSON.stringify({});
	}

	_signOut(){
		let self = this;
		$.get('/api/v1/logout').then((response)=>{
			let isLoggedIn = response.status = "ok" ? false : true;
			self.setState({loggedIn: isLoggedIn });
			if(!isLoggedIn){
				window.location.href = "/";
			}
		});
	}

	render(){
		return(
				<div>
					{!this.state.loggedIn &&
						<div className="sign-in-buttons">
			                <li>
			                    <a id="loginButton" href=".">
			                        <div className="icon">
			                            <img src="/assets/images/icons/nav/sign-up.svg" alt="Browse"/>
			                        </div>
			                        <span>Log In</span>
			                    </a>
			                </li>
			                <li>
			                    <a href="/signup/">
			                        <div className="icon">
			                            <img src="/assets/images/icons/nav/sign-up.svg" alt="Browse"/>
			                        </div>
			                        <span>Sign Up</span>
			                    </a>
			                </li>
		                </div>
	            	}
	            	{this.state.loggedIn &&
	            		<div className="sign-in-buttons">
	            		   <li>
			                    <a href="/dashboard/">
			                        <div className="icon">
			                            <img src="/assets/images/icons/nav/dashboard.svg" alt="Browse"/>
			                        </div>
			                        <span>Dashboard</span>
			                    </a>
			                    <ul>
			                        <li>
			                            <a href="/dashboard/create/">Create</a>
			                        </li>
			                        <li>
			                            <a href="#create-brawl" className="modal-trigger modal-trigger-report-issue">Report Issue</a>
			                        </li>
			                    </ul>
			                </li>
			                <li>
			                    <a href="/forum/">
			                        <div className="icon">
			                            <img src="/assets/images/icons/nav/forum.svg" alt="Browse"/>
			                        </div>
			                        <span>Forum</span>
			                    </a>
			                    <ul>
			                        <li>
			                            <a href=".">Messages</a>
			                        </li>
			                    </ul>
                			</li>
			                <li onClick={this._signOut}>
			                    <a href="javascript:void(0)">
			                        <div className="icon">
			                            <img src="/assets/images/icons/nav/sign-up.svg" alt="Browse"/>
			                        </div>
			                        <span>Log Out</span>
			                    </a>
			                </li>
		                </div>
	            	}
              	</div>
		)
	}
}

if(document.getElementById('login-buttons'))
	ReactDOM.render(<LoginButtons />, document.getElementById('login-buttons'))


class UploadCover extends React.Component{
	state = {title:'', coverFile: false}

	coverAdd = (e)=>{
		var reader = new FileReader();
		var file = e.target.files[0];
		reader.onload = (upload) => {
			this.setState({coverFile: upload.target.result})
		};

		reader.readAsDataURL(file);
	}

	_onChange = (e) => {
		var state = {}
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	_onSubmit = (e) => {
		e.preventDefault();
		var postData = {title: this.state.title, cover: this.state.coverFile}
		$.post('/api/v1/mybooks', postData).then((data)=>{
			window.location.href = "/dashboard";
		});
	}

	render(){
		var cover = <div className="cover"> <div className="flex"> <h4>Cover</h4> </div> </div>;
		if(this.state.coverFile){
			cover = <div className="cover"><div className="flex"><img src={this.state.coverFile}/></div></div>
		}

		var bookTitle = 'Title Area';
		if(this.state.title){ bookTitle = this.state.title; }

		return(
			<ul className="field-list field-list-split">
				<li>
					<div className="copy">
						<p>Preview</p>
					</div>
					<div className="book-blocks book-blocks-single book-blocks-preview">
						<ul>
							<li>
								<div className="content-block content-block-book">
									<figure>
										{cover}
										<figcaption>
											<h4>{bookTitle}</h4>
											<p>By [Author Name]</p>
											<ul className="rating-display">
												<li></li>
												<li></li>
												<li></li>
												<li></li>
												<li></li>
											</ul>
										</figcaption>
									</figure>
								</div>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<div className="copy">
						<p>Add Basic Information</p>
						<form id="coverForm" onSubmit={this._onSubmit}>
							<ul className="inner-fields">
								<li>
									<label htmlFor="title">Book Title</label>
									<input id="title" name="title" type="text" onChange={this._onChange} value={this.state.title}/>
								</li>
								<li>
									<label htmlFor="cover">Upload Cover Art</label>
									<input id="cover" type="file" onChange={this.coverAdd}/>
									<small>
										Max size of 15 MB<br />
										Dimensions are X by X<br />
										Needs to be jpg, png, or gif
									</small>
									<button id="coverSubmit" type="submit" style={{display:'none'}}></button>
								</li>
							</ul>
						</form>
					</div>
				</li>
			</ul>
		)
	}
}

if(document.getElementById('uploadCover'))
	ReactDOM.render(<UploadCover />, document.getElementById('uploadCover'))


class MyBooks extends React.Component{
	state = {books: []};
	componentDidMount(){
		$.get('/api/v1/mybooks').then((data)=>{
			console.log(data);
			this.setState({books:data});
		});
	}

	render(){

		var books = mapObject(this.state.books, (key, item)=>{
			var cover = "url('"+item.cover+"')";
			return(
				<li key={key}>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: cover}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
								</div>
							</div>
							<figcaption>
								<h4>{item.title}</h4>
								<p>By [Author Name]</p>
								<ul className="rating-display">
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li></li>
								</ul>
							</figcaption>
						</figure>
					</a>
				</li>
			)
		});

		return(
			<div className="book-blocks book-blocks-small">
			<ul>
				{books}
				<li>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/1.jpg')"}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
								</div>
							</div>
							<figcaption>
								<h4>Title Area</h4>
								<p>By [Author Name]</p>
								<ul className="rating-display">
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li></li>
								</ul>
							</figcaption>
						</figure>
					</a>
				</li>
				<li>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/2.jpg')"}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
								</div>
							</div>
							<figcaption>
								<h4>Title Area</h4>
								<p>By [Author Name]</p>
								<ul className="rating-display">
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li></li>
								</ul>
							</figcaption>
						</figure>
					</a>
				</li>
				<li>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/3.jpg')"}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
								</div>
							</div>
							<figcaption>
								<h4>Title Area</h4>
								<p>By [Author Name]</p>
								<ul className="rating-display">
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li></li>
								</ul>
							</figcaption>
						</figure>
					</a>
				</li>
				<li>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/4.jpg')"}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
								</div>
							</div>
							<figcaption>
								<h4>Title Area</h4>
								<p>By [Author Name]</p>
								<ul className="rating-display">
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li className="filled"></li>
									<li></li>
								</ul>
							</figcaption>
						</figure>
					</a>
				</li>
				<li className="spacing-block"></li>
				<li className="spacing-block"></li>
			</ul>
		</div>
		)
	}
}

if(document.getElementById('myBooks'))
	ReactDOM.render(<MyBooks />, document.getElementById('myBooks'))

class NewComponent extends React.Component{
	state = {}

	componentDidMount(){
		/// API call
		/// SET STATE
		this.setState({users: apiUsers})
	}

	render(){
		return(
			<div></div>
		)
	}
}
