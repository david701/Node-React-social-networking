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
		user:{},
		coverFile: '../../../assets/images/default-cover-art.jpg',
		title: '',
		description: '',
		type: '',
		genres: [],
		themes: [],
		warnings: [],
		socialMedia: {
			amazon: 'https://',
			kobo: 'https://',
			smashword: 'https://',
			itunes: 'https://',
			barnesandnoble: 'https://',
			twitter: 'https://'
		},
		chapterTitle: ''
	};

  componentDidMount = () => {
    $.get('/api/v1/user_session/')
      .then(resp => {
				this.setState({user: resp.data})
			});
  }

  _handleChange = e => {
    this.setState({[e.target.id]: e.target.value}, () => console.log(this.state));
  }

  _handleCover = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = upload => {
      // const coverFile = upload.target.result;
      this.setState({coverFile: upload.target.result}, () => console.log(this.state.coverFile));
    };
    reader.readAsDataURL(file);
  }

  _handleGenre = e => {
    const nextState = { ...this.state, genre: e.target.value };
    this.setState(nextState, () => { console.log(this.state) });
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
      this.setState({ ...this.state, warnings: newAry }, () => console.log(this.state.warnings));
    } else if (warnings.includes(newWarning)) {
      const newAry = warnings.filter(warning => warning !== newWarning);
      this.setState({ ...this.state, warnings: newAry }, () => console.log(this.state.warnings));
    }
  }

  _handleType = e => {
    this.setState({ ...this.state, type: e.target.value}, () => console.log(this.state.type));
  }

  _handleSubmit = e => {
    e.preventDefault();
    const { title, description, genre, tags, warnings } = this.state;
    const data = {
      title,
      status: 1,
      description: this.state.description,
      genre: this.state.genres[0],
      tags: this.state.themes,
      warnings: this.state.warnings,
			cover: this.state.coverFile
    };
    e.preventDefault();
    $.post('/api/v1/books', data).then(res => {
      if (res.status === "error") {
        console.log(res.message);
      } else {
        //console.log(res);
				window.location.href = "/dashboard";
      }
    });
  }

  _onUrlChange = e => {
    this.setState({
      socialMedia: {
        ...this.state.socialMedia,
        [e.target.id]: e.target.value,
      }
    });
    console.log(this.state.socialMedia);
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
          <ChapterTitle type={type} title={title} handleChange={this._handleChange} />
          <div className="submit-row submit-row-single">
            <div className="buttons">
              <a href="/views/dashboard/" className="button button-white">Cancel</a>
              <a id="bookSubmit" href="#" className="button button-red">Create</a>
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

export const ChapterTitle = ({chapterTitle, handleChange, type}) => (
  <div>
    <h4><span>Step {type === "Published" ? "5" : "4"}.</span> Chapter Title</h4>
    <div className="title">
      <label htmlFor="chapterTitle"><span>*</span>What is the title of this chapter?</label>
      <span className="help-text">Please give your first chapter a title.</span>
    </div>
    <input id="chapterTitle" type="text" value={chapterTitle} onChange={handleChange} data-validation="name, required" />
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
