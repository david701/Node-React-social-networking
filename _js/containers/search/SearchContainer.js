import React from 'react';
import ReactDOM from 'react-dom';

import Checkbox from '../../components/dashboard/Checkbox';
import SearchCheckbox from '../../components/search/SearchCheckbox';
import SearchCategory from '../../components/search/SearchCategory';
import Rating 

const apiUrl = '/api/v1';

const oldCategories = ["Genre", "Author", "Book"];
const oldTags = ["Tag", "Tag", "Tag", "Tag", "Tag", "Tag", "Tag", "Tag", "Tag", "Tag", "Tag", "Tag"];

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchValue: '',
      searchCategoryValue: '',
      categories: [],
      rating: 0,
      tags: []
    };
  }

  addCategory = type => {
    const { categories } = this.state;
    if (!categories.includes(type)) {
      const newCategories = [...categories, type];
      this.setState({ ...this.state, categories: newCategories });
    }
  }

  deleteCategory = label => {
    const { categories } = this.state;
    if (categories.includes(label)) {
      const newCategories = categories.filter(cat => cat !== label);
      this.setState({ ...this.state, categories: newCategories });
    }
  }

  handleChange = e => {
    const { tags } = this.state;
    if (!tags.includes(e.target.value)) {
      const newTags = [...tags, e.target.value];
      this.setState({ ...this.state, [e.target.name]: e.target.value });
    } else if (tags.includes(e.target.value)) {
      const newTags = tags.filter(tag => tag !== e.target.value);
      this.setState({ ...this.state, tags: newTags });
    }
  }

  handleRating = e => {

  }

  handleSearch = e => {
    let change = {};
    change[e.target.name] = e.target.value;
    console.log(change);
    this.setState(change, () => console.log(this.state));
  }

  handleSubmit = e => {
    e.preventDefault();
    const value = this.textInput.value;
    console.log(value);
    this.addCategory(value);
  }

  // componentDidMount() {
  //   this.loadSavedSearches();
  // }
  //
  // loadSavedSearches = () => {
  //
  // }

  render() {
    const { categories, rating, searchCategoryValue } = this.state;
    return (
      <div className="standard-section-with-sidebar">
        <div className="container">
          <div className="flex-row">
            <div className="content-block content-block-standard-search">
              <header>
                <h3>Select a category to search from</h3>
              </header>
              <SearchCategories
                addCategory={this.addCategory}
                deleteCategory={this.deleteCategory}
                handleChange={this.handleSearch}
                handleSubmit={this.handleSubmit}
                inputRef={el => this.textInput = el}
                searchCategoryValue={searchCategoryValue}
                categories={categories}
              />
              <hr />
              <SearchRating
                handleRating={this.handleRating}
                rating={rating}
              />
              <hr />
              <SearchTags
                handleChange={this.handleChange}
                tags={oldTags}
              />
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
      <p style={{ marginBottom: '15px' }}>Search by</p>
      <form style={{ display: 'flex', position: 'relative' }}>
        <input
          name="searchCategoryValue"
          onChange={props.handleChange}
          placeholder="Favorite by Genre, Author, or Book"
          ref={props.inputRef}
          type="text"
          value={props.searchCategoryValue}
        />
        <button
          className="button button-nested"
          onClick={props.handleSubmit}
        >+</button>
      </form>
    </div>
    <CategoryList categories={props.categories} deleteCategory={props.deleteCategory} />
  </div>
);

const CategoryList = props => (
  <ul className="category-list">
    { props.categories && props.categories.map((category, index) => (
      <SearchCategory
        name="categories"
        label={category}
        deleteCategory={props.deleteCategory}
      />
    )) }
  </ul>
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
    <h4>Search by Review</h4>
    <ul className="rating-display">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
);

const SearchRating = props => {

  return (
    <div>
      <h4>Search by Review</h4>
      <ul className="rating-display">
      </ul>
    </div>
  );
}

const SearchTags = props => (
  <div>
    <h4>Search by Tags</h4>
    <ul className="toggle-list">
      {props.tags.map((tag, index) => (
        <SearchCheckbox name="tags" label={tag} val={index} key={index} handleCheckboxChange={props.handleChange} />
      ))}
    </ul>
    <div className="submit-row submit-row-single" style={{ marginTop: '0px' }}>
      <div className="buttons">
        <a href="#" className="button button-white">Save</a>
        <a href="#" className="button button-red">Search</a>
      </div>
    </div>
  </div>
);

