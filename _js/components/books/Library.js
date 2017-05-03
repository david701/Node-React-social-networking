import React, { Component } from 'react';

import UserBooks from './UserBooks';

class Library extends Component {
  render() {
    const { books, author, title } = this.props;
    return (
      <div className="book-blocks book-blocks-small">
        <div className="title-row">
          <h1>{title}</h1>
          <a className="control" href=".">See All</a>
        </div>
        <UserBooks books={books} author={author} />
      </div>
    );
  }
}

export default Library;
