import React from 'react';
import ReactDOM from 'react-dom';

import Checkbox from '../../components/dashboard/Checkbox';

const categories = ["Author", "Book"];

class Search extends React.Component {
  render() {
    return (
      <div className="standard-section-with-sidebar">
        <div className="container">
          <div className="flex-row">
            <div className="content-block content-block-standard">
              <header>
                <h3>Select a category to search from</h3>
              </header>
              <SearchCategories categories={categories} />
              <hr />
              <SearchRating />
              <hr />
              <SearchTags />
              <hr />
              <SavedSearches />
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
        </div>
      </div>
    );
  }
}

const SearchCategories = props => (
  <div>
    <h4>Search by Genre, Author, or Book</h4>
    <div>
      <p>Search by</p>
      <input
        id="chapterTitle"
        type="text"
        placeholder="Favorite by Genre, Author, or Book"
      />
      <div className="new-create-books-row">
        <div className="new-field">
          <input
            type="checkbox"
            checked
            name="Genre"
          />
          <label htmlFor="Genre">Genre</label>
        </div>
        {props.categories.map((category, index) => (
            <Checkbox name="categories" label={category} key={index} />
          ))}
        </div>
        <ul className="category-list">
          <li>
            <input type="checkbox" checked />
            <label htmlFor="">Genre<span style={{ float: 'right', color: 'white', marginRight: '7px' }}>X</span></label>
          </li>
          <li>
            <input type="checkbox" checked />
            <label htmlFor="">Genre<span style={{ float: 'right', color: 'white', marginRight: '7px' }}>X</span></label>
          </li>
          <li>
            <input type="checkbox" checked />
            <label htmlFor="">Genre<span style={{ float: 'right', color: 'white', marginRight: '7px' }}>X</span></label>
          </li>
        </ul>
      </div>
    </div>
);

const SavedSearches = props => (
  <div>
    <h4>Saved Searches</h4>
    <div style={{ display: 'flex' }}>
      <h5 className="saved-search-remover">Remove</h5>
      <p>Search by [Genre Name] and [Tag Name], [Tag name], and [Tag name]</p>
    </div>
    <div style={{ display: 'flex' }}>
      <h5 className="saved-search-remover">Remove</h5>
      <p>Search by [Genre Name] and [Tag Name], [Tag name], and [Tag name]</p>
    </div>
  </div>
);

const SearchRating = props => (
  <div>
    <h4>Search by Rating</h4>
    <ul className="rating-display">
      <li className="filled"></li>
      <li className="filled"></li>
      <li className="filled"></li>
      <li></li>
      <li></li>
    </ul>
  </div>
);

const SearchTags = props => (
  <div>
    <h4>Search by Tags</h4>
    <ul className="toggle-list">
      <li>
        <input type="checkbox" checked />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" checked />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" checked />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" checked />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" />
        <label htmlFor="">Tag</label>
      </li>
      <li>
        <input type="checkbox" />
        <label htmlFor="">Tag</label>
      </li>
    </ul>
    <div className="submit-row submit-row-single" style={{ marginTop: '0px' }}>
      <div className="buttons">
        <a href="#" className="button button-white">Save</a>
        <a href="#" className="button button-red">Search</a>
      </div>
    </div>
  </div>
);

if(document.getElementById('search-page'))
{ReactDOM.render(<Search />, document.getElementById('search-page'));}
