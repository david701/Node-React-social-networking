import React from 'react';
import ReactDOM from 'react-dom';
import UploadCover from './UploadCover';

const themes = ["Contemporary", "Historical",
                "Drama", "ChickLit", "Tragedy",
                "Adventure", "Urban", "Epic",
                "Romance", "Spiritual", "Humor",
                "Paranormal", "Young Adult",
                "Middle Grade","Children","Thriller",
                "Mystery", "Classic"];

const genres = ["Fantasy", "Science Fiction", "Horror", "Non-Fiction"];

class DashboardCreate extends React.Component {
  componentWillMount() {
    fetch('/api/v1/books').then((res) => {
      console.log('hi');
    })
  }
  handleSubmit = (e) => {

  }
  render() {
    return (
      <div className="content-block content-block-standard account-block">
        <header>
          <h3>Create Your Book</h3>
        </header>
        <hr />
        <UploadCover />
        <form onSubmit={this.handleSubmit}>
        
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

