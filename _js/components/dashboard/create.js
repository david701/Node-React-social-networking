import React from 'react';
import UploadCover from '../../main';

const themes = ["Contemporary", "Historical",
                "Drama", "ChickLit", "Tragedy",
                "Adventure", "Urban", "Epic",
                "Romance", "Spiritual", "Humor",
                "Paranormal", "Young Adult",
                "Middle Grade","Children","Thriller",
                "Mystery","Classic"];

const genres = ["Fantasy", "Science Fiction", "Horror", "Non-Fiction"];

class DashboardCreate extends React.Component {
  render() {
    return (
      <div className="content-block content-block standard account-block">
        <header>
          <h3>Create Your Book</h3>
        </header>
        <UploadCover />
        <hr />
        <GenresList genres={genres} />
        <ThemesList themes={themes} />
      </div>
    );
  }
}

// remove spacing-block/refactor later ?
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
);

export default DashboardCreate;
