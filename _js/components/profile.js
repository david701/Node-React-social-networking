import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { validate, formValid } from '../plugins/validation.js';

import defaultCover from '../../public/assets/images/default-cover-art.png';

import Library from './books/Library';

const Profile = function () {
  this.id = '';
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
  };
  this.books = [];
  this.genres = [];
  this.themes = [];
  this.newsletter = true;
};

const apiUrl = `/api/v1`;

class Parent extends React.Component {

  constructor(props) {
    super(props);
    this.user = new Profile();
    this.state = {
      user: this.user,
    };
  }

  removeMyProfile = (id, users) => {
    return users.filter(function (user, index) {
      return user._id !== id;
    });
  }

  getUsers = id => {
    $.get(`${apiUrl}/users/`).then(response => {
      if (response.status === "error") {
        alert(response.message);
      } else {
        this.users = this.removeMyProfile(id, response.data);
        this.setState({ all_users: this.users });
      }
    });
  }


  componentDidMount() {
    $.get(`${apiUrl}/user_session/`).then((response) => {
      if (response.status !== "error") {
        this.user.id = response.data._id;
        //this.user.role = 2;
        this.setState({ user: this.user });
        this.loadUserInfo(this.user.id);
        this.loadBooks(this.user.id);
        this.getUsers(this.user.id);
      } else {
        window.location.href = "/";
      }
    });
  }

  editProfile = event => {
    const target = event.target;
    window.location.href = "/author/" + target.id + "/edit";
  }

  handleUnfollow = event => {
    const data = {
      authorId: event.target.id,
    };
    $.post('/api/v1/unfollow_author', data).then(response => {
      if (response.status === "error") {
        alert(response.message);
      } else {
        this.loadUserInfo(this.user.id);
      }
    });
  }

  loadUserInfo = id => {
    fetch(`${apiUrl}/users/${id}`)
      .then(res => res.json())
      .then(res => this.setState({ user: res.data }));
  }

  // loadBooks = id => {
  // 	fetch(`${apiUrl}/users/${id}/books`)
  // 		.then(res => res.json())
  // 		.then(res => this.setState({
  // 			user: {
  // 				...this.state.user,
  // 				books: res.data,
  // 			}
  // 		}, () => console.log(this.state)));
  // }

  loadBooks = id => {
    fetch(`${apiUrl}/users/${id}/books`)
      .then(res => res.json())
      .then(res => this.setState({
        books: res.data,
      }))
      .then(res => console.log(this.state));
  }

  render() {
    let following = "You're not following any authors",
      authors = this.state.user.following_authors,
      // books = this.state.user.books,
      button = "Unfollow",
      func = this.handleUnfollow;

    if (this.state.user.role > 0) {
      following = "There are no user's to edit";
      authors = this.state.all_users;
      button = "Edit";
      func = this.editProfile;
    }


    if (authors) {
      if (authors.length) {
        let limit = authors.length > 5 ? 5 : authors.length;
        following = [];
        for (var i = 0; i < limit; i++) {
          following.push(<li key={i}><a href={'/author/' + authors[i]._id}><figure className="avatar"><img src={authors[i].avatar} alt="" /></figure><h5>{authors[i].name}</h5></a><div className="control unfollow" id={authors[i]._id} onClick={func}>{button}</div></li>);
        }
      }
    }

    return (
      <div className="standard-section-with-sidebar">
        <div className="container">
          {this.state.user.role < 1 &&
            <div className="flex-row">
              <div className="content-block content-block-standard">
                <header>
                  <h3>My Account</h3>
                </header>
                <div className="title-row">
                  <h4>Account Info</h4>
                  <a className="control" href="/dashboard/edit">Edit</a>
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
                <hr />
                <div className="title-row">
                  <h4>Favorite Authors</h4>
                  <a className="control" href="/dashboard/find-friends">Find Friends</a>
                </div>
                <ul className="user-list">
                  {following}
                </ul>
                <hr />
                {this.state.books && <Library books={this.state.books} author={this.state.user.name} title={"My Library"} />}
                {this.state.books && <Library books={this.state.books} author={this.state.user.name} title={"Books I've Written"} />}
              </div>
              <div>
                <div className="content-block">
                  <div className="placeholder">
                    <h4>Ad Space</h4>
                  </div>
                </div>
                <div className="content-block">
                  <div className="placeholder">
                    <h4>Ad Space</h4>
                  </div>
                </div>
              </div>
            </div>
          }
          {this.state.user.role > 0 &&
            <div className="content-block content-block-standard account-block">
              <header>
                <h3>Admin Account</h3>
              </header>
              <div className="title-row">
                <h4>Quick Links</h4>
              </div>
              <div className="user-list">
                <a className="admin-link" href="https://analytics.google.com">Google Analytics</a>
                <a className="admin-link" href="http://www.mandrill.com/">Create Newsletter</a>
              </div>
              <hr />
              <div className="title-row">
                <h4>Edit Users</h4>
                <a className="control" href="/dashboard/all-users">See All</a>
              </div>
              <ul className="user-list">
                {following}
              </ul>
              <hr />
              <div className="title-row">
                <h4>Books to Approve</h4>
                {/* <a className="control" href=".">See All</a> */}
              </div>
              <div className="book-blocks book-blocks-small">
                You don't have any books to approve
                  </div>
              <hr />
              <div className="title-row">
                <h4>Book Claims</h4>
                {/* <a className="control" href=".">See All</a> */}
              </div>
              <div className="book-blocks book-blocks-small">
                You don't have any book claims
                  </div>
              <hr />
              <div className="title-row">
                <h4>Show or Hide Ads</h4>
                {/* <a className="control" href=".">See All</a> */}
              </div>
              <div className="book-blocks book-blocks-small">
                This feature will be built in phase 3
                  </div>
              <hr />
              <div className="title-row">
                <h4>Current Book Brawls</h4>
                {/* <a className="control" href=".">See All</a> */}
              </div>
              <div className="book-blocks book-blocks-small">
                This feature will be built in phase 3
                  </div>
              <hr />
              <h4>Account Settings</h4>
              <ul className="field-list account-settings">
                <a href={"/author/" + this.state.user._id + "/reset-password"} className="button reset-password">Reset Password</a>
              </ul>
            </div>
          }
          {/* <div id="myBooks"></div> */}
        </div>
      </div>
    );
  }
}

if (document.getElementById('accountInfo')) {
  ReactDOM.render(<Parent />, document.getElementById('accountInfo'));
}



class Report extends React.Component {

  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.state = {
      message: ""
    };
  }

  _objectEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
      { return false; }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  _handleChange(event) {
    this.setState({
      message: event.target.value
    });
    formValid(event);
  }

  _handleSubmit(event) {
    let $this = this;
    $.ajax({
      url: '/api/v1/reports',
      type: 'post',
      data: this.state,
      dataType: 'json',
      success: function (response) {
        if (response.status === "error") {
          alert(response.message);
        } else {
          $this.setState({
            message: ""
          });
          window.location.href = "/report-sent";
        }
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="overlay">
        <div className="content-block-small content-block" id="reset">
          <form onSubmit={this._handleSubmit}>
            <h3>Report Issue</h3>
            <p className="instructions">Please report your issue below and we will get back to you in X amount of time.</p>
            <div className="title">
              <span className="help-text">Please enter your report before pressing enter</span>
            </div>
            <ul className="field-list field-list-small">
              <li>
                <textarea name="body" rows="5" cols="80" onChange={this._handleChange} onBlur={validate} data-validation="required"></textarea>
              </li>
            </ul>
            <div className="submit-row submit-row-small">
              <div className="buttons">
                <a className="button button-white" href="/dashboard/">Close</a>
                <input className="button button-red" type="submit" value="Report Issue" disabled />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

if (document.getElementById('report')) {
  ReactDOM.render(<Report />, document.getElementById('report'));
}
