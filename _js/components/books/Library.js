import React, { Component } from 'react';

import UserBooks from './UserBooks';

class Library extends Component {
  render() {
    const { books, author, title, showBrawl } = this.props;
    return (
      <div className="book-blocks book-blocks-small">
        <div className="title-row">
          <h1>{title}</h1>
          <a className="control" href={title === "My Library" ? "/books/all?view=user-library" : "#"}>See All</a>
        </div>
        <UserBooks title={title} showBrawl={showBrawl} books={books} author={author} library={this.props.library} user={this.props.user} loadUserInfo={this.props.loadUserInfo} loadBooks={this.props.loadBooks}/>
      </div>
    );
  }
}

export default Library;
