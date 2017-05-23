import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

import RadioButton from '../../components/dashboard/RadioButton';
import SearchCheckbox from '../../components/search/SearchCheckbox';
import SearchCategory from '../../components/search/SearchCategory';

const apiUrl = '/api/v1';

const oldCategories = ["Book", "Author"];
const oldTags = ["Contemporary", "Historical",
                "Drama", "ChickLit", "Tragedy",
                "Adventure", "Urban", "Epic",
                "Romance", "Spiritual", "Humor",
                "Paranormal", "Young Adult",
                "Middle Grade","Children","Thriller",
                "Mystery","Classic"];
const oldGenres = ["Fantasy","Science Fiction",
                "Horror","Non-Fiction","Mystery",
                "Romance","Poetry","LitRPG"]


export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "", //input field
      searchBy: "Book", // default search by
      rating: 0, //star rating
      tags: [], // all tags
      genres: [], // all genre
      savedSearches: ["Search by [Book] and [Tag Name], [Tag name], and [Genre name]","Search by [Author Name]"] //saved searches
    };
  }

  removeSearch = e => {
    alert("I was created to delete searches")
  }

  handleChange = e => {
    const { tags, genres, searchBy } = this.state;
    if (e.target.name === "genres") {
      if(e.target.checked){
        genres.push(e.target.value)
      }else{
        genres.splice(genres.indexOf(e.target.value), 1);
      }
    }
    else if (e.target.name === "tags") {
      if(e.target.checked){
        tags.push(e.target.value)
      }else{
        tags.splice(tags.indexOf(e.target.value), 1);
      }
    }
    else if(e.target.name === "searchCategoryValue"){
        this.setState({search: e.target.value});
    }
    else if(e.target.name === "categories"){
        this.setState({searchBy: e.target.value, search: ""})
    }
  }

  handleRating = (nextValue) => {
    this.setState({ ...this.state, rating: nextValue }, () => console.log(this.state.rating));
  }

  handleSearch = e => {
    let change = {};
    change[e.target.name] = e.target.value;
    console.log(change);
    this.setState(change, () => console.log(this.state));
  }

  handleSubmit = e => {
    e.preventDefault();
    //what you will send
    alert('Ready to send: ' + JSON.stringify(this.state))
  }

  render() {
    const { rating, searchBy, savedSearches, search } = this.state;
    return (
      <div className="standard-section-with-sidebar">
        <div className="container">
          <div className="flex-row">
            <div className="content-block content-block-standard-search">
              <header>
                <h3>Select a category to search from</h3>
              </header>
              <SearchCategories
                handleChange={this.handleChange}
                searchBy={searchBy}
                search={search}
              />
              <SearchRating
                handleRating={this.handleRating}
                searchBy={searchBy}
                rating={rating}
              />
              <SearchTags
                handleChange={this.handleChange}
                tags={oldTags} genres={oldGenres}
                searchBy={searchBy}
              />
              <div className="submit-row submit-row-single" style={{ marginTop: '0px' }}>
                <div className="buttons">
                  <button type="button" className="button button-white">Save</button>
                  <button type="button" onClick={this.handleSubmit} className="button button-red">Search</button>
                </div>
              </div>
              <SavedSearches onDelete={this.removeSearch} savedSearches={savedSearches} />
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
  <div id="search-categories">
    <h4>Search by Author or Book</h4>
    <div>
      <p style={{ marginBottom: '15px' }}>Search by</p>
      <form style={{ display: 'flex', position: 'relative' }}>
        <input
          name="searchCategoryValue"
          onChange={props.handleChange}
          placeholder={"Type in favorite " + props.searchBy}
          ref={props.inputRef}
          value={props.search}
          type="text"
        />
      </form>
    </div>
    <div className="new-create-books-row">
      {oldCategories.map((category, index) => (
        <RadioButton
          key={index}
          name="categories"
          label={category}
          selected={props.searchBy === category}
          handleChange={props.handleChange}
        />
      ))}
    </div>
    <hr />
  </div>
);

const SavedSearches = props => (
  <div>
    <hr/>
    <h4>Saved Searches</h4>
    {props.savedSearches.map((search, index) => (
    <div style={{ display: 'flex' }} key={index}>
      <h5 className="saved-search-remover" onClick={props.onDelete}>Remove</h5>
      <p>{search}</p>
    </div>
    ))}
  </div>
);

const SearchRating = props => (
  <div>
    {props.searchBy === "Book" &&
      <div>
        <h4>Search by Review</h4>
        <div style={{ fontSize: 32 }}>
          <StarRatingComponent
            name="rating"
            emptyStarColor="#D9DCDD"
            value={props.rating}
            onStarClick={props.handleRating}
          />
        </div>
        <hr style={{ marginTop: 0 }} />
      </div>
    }
  </div>
);

const SearchTags = props => (
  <div>
    {props.searchBy === "Book" &&
      <div>
        <h4>Search by Tags</h4>
        <ul className="toggle-list">
          {props.tags.map((tag, index) => (
            <SearchCheckbox key={index} name="tags" label={tag} val={index} key={index} handleCheckboxChange={props.handleChange} />
          ))}
        </ul>
        <hr/>
        <h4>Search by Genres</h4>
        <ul className="toggle-list">
          {props.genres.map((genre, index) => (
            <SearchCheckbox name="genres" label={genre} val={index} key={index} handleCheckboxChange={props.handleChange} />
          ))}
        </ul>
        <hr style={{ marginTop: 0 }} />
      </div>
    }
  </div>
);

