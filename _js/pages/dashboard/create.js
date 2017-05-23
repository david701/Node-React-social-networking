import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UploadCover from '../../components/dashboard/UploadCover';
import Checkbox from '../../components/dashboard/Checkbox';
import SocialMedia from '../../components/dashboard/SocialMedia';
import {validate, formValid} from '../../plugins/validation';
import $ from 'jquery';

import tags from '../../../data/tags.json';
import genres from '../../../data/genres.json';
import warnings from '../../../data/warnings.json';

const types = ["Serial", "Published"];

class DashboardCreate extends Component {
	state = {
		bookId: bookId,
		user:{},
		coverFile: '',
		title: '',
		description: '',
		type: '',
		genres: [],
		tags: [],
		warnings: [],
		socialMedia: {
			amazon: 'https://',
			kobo: 'https://',
			smashword: 'https://',
			itunes: 'https://',
			barnesandnoble: 'https://',
			twitter: 'https://'
		}
	};

  componentDidMount = () => {
    $.get('/api/v1/user_session/')
      .then(resp => {
				this.setState({user: resp.data})
		});

    if(bookId){
      this.getBookInfo();
    }
  }

  getBookInfo = () => {
		if(bookId){
			$.get(`/api/v1/books/${bookId}`).then((book)=>{
				this.setState({
					user: book.data.author,
					coverFile: book.data.cover,
					title: book.data.title,
					description: book.data.description,
					type: book.data.type,
					genres: [],
					tags: [],
					warnings: []
				})
			})
		}
  }

  _handleChange = e => {
    this.setState({[e.target.id]: e.target.value});
  }

  _handleCover = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = upload => {
      // const coverFile = upload.target.result;
      this.setState({coverFile: upload.target.result});
    };
    reader.readAsDataURL(file);
  }

  _handleGenre = e => {
    this.setState({genre: e.target.value});
  }

  _handleTags = e => {
    const {tags} = this.state;
    const newTag = e.target.value;
    if (!tags.includes(newTag)) {
      const newAry = [...tags, newTag];
      this.setState({...this.state, tags: newAry });
    } else if (tags.includes(newTag)) {
      const newAry = tags.filter(tag => tag !== newTag);
      this.setState({ ...this.state, tags: newAry });
    }
  }

  _handleWarnings = e => {
    const {warnings} = this.state;
    const newWarning = e.target.value;
    if (!warnings.includes(newWarning)) {
      const newAry = [...warnings, newWarning];
      this.setState({ ...this.state, warnings: newAry});
    } else if (warnings.includes(newWarning)) {
      const newAry = warnings.filter(warning => warning !== newWarning);
      this.setState({ ...this.state, warnings: newAry});
    }
  }

  _handleType = e => {
    this.setState({type: e.target.value});
  }

  _handleSubmit = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      genre: this.state.genre,
      tags: this.state.tags,
      warnings: this.state.warnings,
			cover: this.state.coverFile,
			type: this.state.type
    };
    e.preventDefault();
    if(!bookId){
			$.ajax({
				url: '/api/v1/books',
				method: 'POST',
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: 'application/json; charset=UTF-8',
			}).then(res => {
        if (res.status === "error") {
          console.log(res.message);
        } else {
  				window.location.href = "/books/" + res.data._id;
        }
      });
    }else{
      $.ajax({url:`/api/v1/books/${bookId}`,
				method: 'PUT',
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: 'application/json; charset=UTF-8',
       }).then((response)=>{
          window.location.href = "/books/" + bookId;
       })
    }
  }

  _onUrlChange = e => {
    this.setState({
      socialMedia: {
        ...this.state.socialMedia,
        [e.target.id]: e.target.value,
      }
    });
  }

  render() {
    const {coverFile, description, socialMedia, title, type} = this.state;
    const author = this.state.user.name;
    return (
      <div className="content-block content-block-standard account-block">
        <header>
          <h3>Create Your Book</h3>
        </header>
        <hr />
        <form onSubmit={this._handleSubmit}>
          <UploadCover title={title} author={author} handleChange={this._handleChange} coverAdd={this._handleCover} coverFile={coverFile} />
          <Description description={description} handleChange={this._handleChange} />
          <BookType types={types} handleChange={this._handleType}/>
          <hr />
          <h4><span>Step 3.</span> How would you like users to find you?</h4>
          <Genres genres={genres} handleCheckbox={this._handleGenre} />
          <Tags tags={tags} handleCheckbox={this._handleTags} />
          <Warnings warnings={warnings} handleCheckbox={this._handleWarnings} />
          <hr />
          {type === "Published" ? <SocialMedia sources={socialMedia} onUrlChange={this._onUrlChange} /> : ""}
          <div className="submit-row submit-row-single">
            <div className="buttons">
              <a href={this.state.bookId ? '/books/' + bookId : '/dashboard/'} className="button button-white">Cancel</a>
              <a id="bookSubmit" href="#" className="button button-red">{this.state.bookId ? 'Update' : 'Create'}</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export const Description = ({description, handleChange}) => (
  <div>
    <h4><span>Step 2.</span> Tell us about your book</h4>
    <div className="title">
      <label htmlFor="description"><span>*</span>Description</label>
      <span className="help-text">Please enter a description.</span>
    </div>
    <textarea
      id="description"
      rows="5"
      placeholder="Add a 250 character description here."
      data-validation="required"
      onBlur={validate}
      onChange={handleChange}
      value={description}
    />
  </div>
);

export const Genres = ({genres, handleCheckbox}) => (
  <div>
    <p><span>*</span>Select <strong>one</strong> genre for your book to be listed.</p>
    <div className="new-create-books-row">
      {genres.map((genre, index) => (
        <Checkbox name="genres" label={genre} key={index} handleCheckboxChange={handleCheckbox} />
      ))}
    </div>
  </div>
);

export const Tags = ({tags, handleCheckbox}) => (
  <div>
    <div className="title">
      <p><span>*</span>Select up to <strong>two</strong> fiction themes that best describe your book.</p>
      <span className="help-text">Please select at least one tag.</span>
    </div>
    <div className="new-create-books-row">
      {tags.map((tag, index) => (
        <Checkbox name="tags" label={tag} key={index} handleCheckboxChange={handleCheckbox} />
      ))}
    </div>
  </div>
);

export const Warnings = ({warnings, handleCheckbox}) => (
  <div>
    <p>Content warning</p>
    <div className="new-create-books-row">
      {warnings.map((warning, index) => (
        <Checkbox name="warnings" label={warning} key={index} handleCheckboxChange={handleCheckbox} />
      ))}
    </div>
  </div>
);

export const BookType = ({types, handleChange}) => (
  <div>
    <p><span>*</span>What kind of book is it?</p>
    <ul className="radio-list radio-list-inline">
      {types.map((type, index) => (
        <li key={index}>
          <input type="radio" name="avatar" id={"avatar-" + (index + 1)} value={type} onChange={handleChange} />
          <label htmlFor={"avatar-"+ (index + 1)}>
            {type}
          </label>
        </li>
      ))}
    </ul>
  </div>
);


if(document.getElementById('dashboard-create'))
  {ReactDOM.render(<DashboardCreate />, document.getElementById('dashboard-create'));}
