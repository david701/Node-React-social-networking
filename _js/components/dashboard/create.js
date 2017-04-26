import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UploadCover from './UploadCover';
import Checkbox from './Checkbox';
import SocialMedia from './SocialMedia';

const themes = ["Contemporary", "Historical",
                "Drama", "ChickLit", "Tragedy",
                "Adventure", "Urban", "Epic",
                "Romance", "Spiritual", "Humor",
                "Paranormal", "Young Adult",
                "Middle Grade", "Children", "Thriller",
                "Mystery", "Classic"];
const genres = ["Fantasy", "Science Fiction", "Horror", "Non-Fiction"];
const warnings = ["Warning 1", "Warning 2", "Warning 3", "Warning 4"];

const sources  = [
  {slug: "website", sanitized: "Website"},
  {slug: "good_reads", sanitized: "Goodreads"},
  {slug: "amazon", sanitized: "Amazon"},
  {slug: "wordpress", sanitized: "WordPress"},
  {slug: "facebook", sanitized: "Facebook"},
  {slug: "twitter", sanitized: "Twitter"}
];

class DashboardCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      type: '',
      genres: [],
      themes: [],
      warnings: [],
      social_media: {
        website: 'https://',
        good_reads: 'https://',
    		amazon: 'https://',
    		wordpress: 'https://',
    		facebook: 'https://',
    		twitter: 'https://'
      }
    };
  }

  componentWillMount = () => {
    fetch('/api/v1/books').then((res) => {
      console.log('hi');
    });
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      onClick={this.handleCheckbox}
    />
  )

  createCheckboxes = genres => (
    genres.map(this.createCheckbox)
  )

  _handleChange = e => {
    this.setState({ description: e.target.value });
  }
  
  _handleCheckbox = e => {
    this.setState({});
  }

  _handleGenre = genre => {
    let newArray = this.state.genres.slice();
    newArray.push(genre);
    this.setState({ genres: newArray }, () => console.log(this.state.genres));
  }

  _handleType = e => {
    const newType = e.target.value;
    this.setState({type: newType}, () => console.log(this.state.type));
  }

  _handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    const { description, type } = this.state;
    return (
      <div className="content-block content-block-standard account-block">
        <header>
          <h3>Create Your Book</h3>
        </header>
        <hr />
        <form onSubmit={this._handleSubmit}>
          <h4><span>Step 1.</span> Upload Cover Art</h4>
          <UploadCover />
          <h4><span>Step 2.</span> Tell us about your book</h4>
          <label htmlFor="description">Description</label>
          <textarea
            rows="5"
            placeholder="Add a 250 character description here."
            onChange={this._handleChange}
            value={description}
          />
          <p>What type of book is it?</p>
          <ul className="radio-list radio-list-inline">
            <li>
              <input type="radio" name="avatar" id="avatar-1" onChange={this._handleType} value="serial" />
              <label htmlFor="avatar-1">Serial</label>
            </li>
            <li>
              <input type="radio" name="avatar" id="avatar-2" onChange={this._handleType} value="published" />
              <label htmlFor="avatar-2">Published</label>
            </li>
          </ul>
          <hr />
          <h4><span>Step 3.</span> How would you like users to find you?</h4>
          <p>Select up to <strong>three</strong> genres for your book to be listed.</p>
          <div className="submit-row">
            {this.createCheckboxes(genres)}
          </div>
          <p>Select up to <strong>three</strong> tags that best describe your book.</p>
          <div className="submit-row">
            {this.createCheckboxes(themes)}
          </div>
          <p>Content warning</p>
          <div className="submit-row">
            {this.createCheckboxes(warnings)}
          </div>
          <hr />
          <h4><span>Step 4.</span> Where is your book published?</h4>
          <SocialMedia sources={sources} />
          <hr />
          <h4><span>Step 5.</span> Chapter Title</h4>
          <label htmlFor="website">What is the title of this chapter?</label>
          <input id="website" type="text" />
        </form>
      </div>
    );
  }
}

if(document.getElementById('dashboard-create'))
	ReactDOM.render(<DashboardCreate />, document.getElementById('dashboard-create'))
