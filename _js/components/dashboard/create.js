import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UploadCover from './UploadCover';
import Checkbox from './Checkbox';
import SocialMedia from './SocialMedia';
import { validate, formValid } from '../../plugins/validation';

const themes = ["Contemporary", "Historical",
                "Drama", "Chick Lit", "Tragedy",
                "Adventure", "Urban", "Epic",
                "Romance", "Spiritual", "Humor",
                "Paranormal", "Young Adult",
                "Middle Grade", "Children", "Thriller",
                "Mystery", "Classic"];
const genres = ["Fantasy", "Science Fiction", "Horror", "Non-Fiction"];
const warnings = ["Warning 1", "Warning 2", "Warning 3", "Warning 4"];

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
        amazon: 'https://',
        kobo: 'https://',
    		smashword: 'https://',
    		itunes: 'https://',
    		barnesandnoble: 'https://',
    		twitter: 'https://'
      },
      chapterTitle: ''
    };
  }

  componentWillMount = () => {
    fetch('/api/v1/books').then((res) => {
      console.log(res);
    });
  }

  _handleChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => console.log(this.state));
  }

  _handleCheckbox = e => {
    const newVal = e.target.value;
    console.log(newVal);
    this.setState(prevState => ({
      genres: prevState.genres.push(newVal)
    }), () => console.log(this.state));
  }

  _handleCover = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = upload => {
      const coverFile = upload.target.result;
    }
    reader.readAsDataURL(file);
    this.setState({ coverFile: true }, () => console.log(this.state.coverFile));
  }
  
  _handleGenres = e => {
    const { genres } = this.state;
    const newGenre = e.target.value;
    if (!genres.includes(newGenre)) {
      const newAry = [...genres, newGenre];
      this.setState({ genres: newAry }, () => console.log(this.state.genres));
    } else if (genres.includes(newGenre)) {
      const newAry = genres.filter(genre => genre !== newGenre);
      this.setState({ genres: newAry }, () => console.log(this.state.genres));
    }
  }

  _handleThemes = e => {
    const { themes } = this.state;
    const newTheme = e.target.value;
    if (!themes.includes(newTheme)) {
      const newAry = [...themes, newTheme];
      this.setState({ themes: newAry }, () => console.log(this.state.themes));
    } else if (themes.includes(newTheme)) {
      const newAry = themes.filter(theme => theme !== newTheme);
      this.setState({ themes: newAry }, () => console.log(this.state.themes));
    }
  }

  _handleWarnings = e => {
    const { warnings } = this.state;
    const newWarning = e.target.value;
    if (!warnings.includes(newWarning)) {
      const newAry = [...warnings, newWarning];
      this.setState({ warnings: newAry }, () => console.log(this.state.warnings));
    } else if (warnings.includes(newWarning)) {
      const newAry = warnings.filter(warning => warning !== newWarning);
      this.setState({ warnings: newAry }, () => console.log(this.state.warnings));
    }
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
          <UploadCover title={title} handleChange={this._handleChange} coverAdd={this._handleCover}/>
          <Description description={description} handleChange={this._handleChange} />
          <BookType types={types} handleChange={this._handleType}/>
          <hr />
          <h4><span>Step 3.</span> How would you like users to find you?</h4>
          <Genres genres={genres} handleCheckbox={this._handleGenres} />
          <Themes themes={themes} handleCheckbox={this._handleThemes} />
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

export const Description = props => {
  const { description, handleChange } = props;
  return (
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
}

export const Genres = props => {
  const { genres, handleCheckbox } = props;
  return (
    <div>
      <p><span>*</span>Select up to <strong>three</strong> genres for your book to be listed.</p>
      <div className="new-create-books-row">
        {genres.map((genre, index) => (
          <Checkbox name="genres" label={genre} key={index} handleCheckboxChange={handleCheckbox} />
        ))}
      </div>
    </div>
  );
}

export const Themes = props => {
  const { themes, handleCheckbox } = props;
  return (
    <div>
      <div className="title">
        <p><span>*</span>Select up to <strong>three</strong> tags that best describe your book.</p>
        <span className="help-text">Please select at least one tag.</span>
      </div>
      <div className="new-create-books-row">
        {themes.map((theme, index) => (
          <Checkbox name="themes" label={theme} key={index} handleCheckboxChange={handleCheckbox} />
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
      <div className="new-create-books-row">
        {warnings.map((warning, index) => (
          <Checkbox name="warnings" label={warning} key={index} handleCheckboxChange={handleCheckbox} />
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
      <div className="title">
        <label htmlFor="chapterTitle"><span>*</span>What is the title of this chapter?</label>
        <span className="help-text">Please give your first chapter a title.</span>
      </div>
      <input id="chapterTitle" type="text" value={chapterTitle} onChange={handleChange} data-validation="name, required" />
    </div>
  );
};

export const BookType = props => {
  const { types, handleChange } = props;
  return (
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
};


if(document.getElementById('dashboard-create'))
	ReactDOM.render(<DashboardCreate />, document.getElementById('dashboard-create'))
