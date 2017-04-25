import React from 'react';
import ReactDOM from 'react-dom';
import UploadCover from './UploadCover';

const themes = ["Contemporary", "Historical",
                "Drama", "ChickLit", "Tragedy",
                "Adventure", "Urban", "Epic",
                "Romance", "Spiritual", "Humor",
                "Paranormal", "Young Adult",
                "Middle Grade","Children", "Thriller",
                "Mystery", "Classic"];

const genres = ["Fantasy", "Science Fiction", "Horror", "Non-Fiction"];

// function changeType(newType) {
//   return (prevState, currentProps) => {
//     return {...prevState, type: newType };
//   };
// }

class DashboardCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      type: '',
      genres: []
    };
  }

  componentWillMount() {
    fetch('/api/v1/books').then((res) => {
      console.log('hi');
    });
  }

  _handleChange = (e) => {
    this.setState({ description: e.target.value });
  }

  _handleGenre = (genre) => {
    // this.setState({ genres: this.state.genres.concat});
    console.log(genre);
  }
  
  _handleType = (e) => {
    const newType = e.target.value;
    this.setState({type: newType}, () => console.log(this.state));
  }

  _handleSubmit = (e) => {
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
          <ul className="toggle-list">
            {themes.map((theme, index) => (
              <li key={index} onClick={(theme) => this._handleGenre(theme)}>
                {theme}
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

if(document.getElementById('dashboard-create'))
	ReactDOM.render(<DashboardCreate />, document.getElementById('dashboard-create'))

/*
        <GenresList genres={genres} />
        <ThemesList themes={themes} />
*/

/*// remove spacing-block/refactor later ?
const GenresList = ({ genres }) => (
  <ul class="toggle-list">
    {genres.map((genre, index) => (
      <li>{genre}</li>
    ))}
    <li class="spacing-block"></li>
    <li class="spacing-block"></li>
  </ul>
);

const ThemesList = ({ themes }) => (
  <ul className="toggle-list">
    {themes.map((theme, index) => (
      <li>{theme}</li>
    ))}
    <li class="spacing-block"></li>
    <li class="spacing-block"></li>
  </ul>
);

// Add custom warnings later(?)
const WarningsList = ({ warnings }) => (
  <ul class="toggle-list">
    <li>Warning 1</li>
  </ul>
);*/

