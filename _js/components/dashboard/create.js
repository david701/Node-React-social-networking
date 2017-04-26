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

// const sources  = [
//   {slug: "website", sanitized: "Website"},
//   {slug: "good_reads", sanitized: "Goodreads"},
//   {slug: "amazon", sanitized: "Amazon"},
//   {slug: "wordpress", sanitized: "WordPress"},
//   {slug: "facebook", sanitized: "Facebook"},
//   {slug: "twitter", sanitized: "Twitter"}
// ];

const types = ["Serial", "Published"];

class DashboardCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverFile: false,
      title: '',
      description: '',
      type: '',
      genres: [],
      themes: [],
      warnings: [],
      socialMedia: {
        website: 'https://',
        goodreads: 'https://',
    		amazon: 'https://',
    		wordpress: 'https://',
    		facebook: 'https://',
    		twitter: 'https://'
      },
      chapter_title: ''
    };
  }

  componentWillMount = () => {
    fetch('/api/v1/books').then((res) => {
      console.log('hi');
    });
  }

  _handleChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => console.log(this.state));
  }

  // _handleCover = e => {
  //   const reader = new FileReader();
  //   const file = e.target.files[0];
  //   reader.onload = upload => {
  //     const coverFile = upload.target.result;
  //   }
  //   reader.readAsDataURL(file);
  //   this.setState({ coverFile: true }, () => console.log(this.state.coverFile));
  // }
  
  _handleGenres = e => {
    let newArray = this.state.genres.slice();
    newArray.push(e);
    this.setState({ genres: newArray }, () => console.log(this.state.genres));
  }

  _handleThemes = e => {
    let newArray = this.state.themes.slice();
    newArray.push(e);
    this.setState({ themes: newArray }, () => console.log(this.state.themes));
  }

  _handleWarnings = e => {
    let newArray = this.state.warnings.slice();
    newArray.push(e);
    this.setState({ warnings: newArray }, () => console.log(this.state.warnings));
  }

  _handleType = e => {
    this.setState({ type: e.target.value }, () => console.log(this.state.type));
  }

  _handleSubmit = e => {
    e.preventDefault();
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
    const { coverFile, description, socialMedia, title, type } = this.state;
    return (
      <div className="content-block content-block-standard account-block">
        <header>
          <h3>Create Your Book</h3>
        </header>
        <hr />
        <form onSubmit={this._handleSubmit}>
          <UploadCover />
          <Description description={description} handleChange={this._handleChange}/>
          <BookType types={types} handleChange={this._handleType}/>
          <hr />
          <h4><span>Step 3.</span> How would you like users to find you?</h4>
          <Genres genres={genres} handleCheckbox={this._handleGenres} />
          <Themes themes={themes} handleCheckbox={this._handleThemes} />
          <Warnings warnings={warnings} handleCheckbox={this._handleWarnings} />
          <hr />
          {type === "Published" ? <SocialMedia sources={socialMedia} onUrlChange={this._onUrlChange} /> : ""}
          <ChapterTitle type={type} title={title} handleChange={this._handleChange}/>
        </form>
      </div>
    );
  }
}

export const Description = props => {
  const { description, handleChange } = props;
  return (
    <div>
      <h4><span>Step 2.</span> Tell us about your book</h4>
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        rows="5"
        placeholder="Add a 250 character description here."
        onChange={handleChange}
        value={description}
      />
    </div>
  );
}

export const Genres = props => {
  const { genres, handleCheckbox } = props;
  return (
    <div>
      <p>Select up to <strong>three</strong> genres for your book to be listed.</p>
      <div className="submit-row">
        {genres.map((genre, index) => (
          <Checkbox label={genre} key={index} handleCheckboxChange={handleCheckbox} />
        ))}
      </div>
    </div>
  );
}

export const Themes = props => {
  const { themes, handleCheckbox } = props;
  return (
    <div>
      <p>Select up to <strong>three</strong> tags that best describe your book.</p>
      <div className="submit-row">
        {themes.map((theme, index) => (
          <Checkbox label={theme} key={index} handleCheckboxChange={handleCheckbox} />
        ))}
      </div>
    </div>
  );
}

export const Warnings = props => {
  const { warnings, handleCheckbox } = props;
  return (
    <div>
      <p>Content warning</p>
      <div className="submit-row">
        {warnings.map((warning, index) => (
          <Checkbox label={warning} key={index} handleCheckboxChange={handleCheckbox} />
        ))}
      </div>
    </div>
  );
}

export const ChapterTitle = props => {
  const { chapterTitle, handleChange, type } = props;
  return (
    <div>
      <h4><span>Step {type === "Published" ? "5" : "4"}.</span> Chapter Title</h4>
      <label htmlFor="chapterTitle">What is the title of this chapter?</label>
      <input id="chapterTitle" type="text" value={chapterTitle} onChange={handleChange} />
    </div>
  );
};

export const BookType = props => {
  const { types, handleChange } = props;
  return (
    <div>
      <p>What kind of book is it?</p>
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
};


if(document.getElementById('dashboard-create'))
	ReactDOM.render(<DashboardCreate />, document.getElementById('dashboard-create'))
