import React, { Component } from 'react';

import UserBooks from './UserBooks';

class Library extends Component {
  render() {
    console.log('go')
    const { books, author, title, showBrawl, me } = this.props;
    let href = "#"

    if(title === "My Library"){
      href = "/books/all?view=user-library"
    }
    else if(title === "My Books"){
      href = "/books/all?view=user-books";
    }

    return (
      <div className="book-blocks book-blocks-small">
        <div className="title-row">
          <h1>{title}</h1>
          <a className="control" href={href}>See All</a>
        </div>
        <UserBooks title={title} showBrawl={showBrawl} me={me} books={books} author={author} library={this.props.library} user={this.props.user} loadUserInfo={this.props.loadUserInfo} loadBooks={this.props.loadBooks}/>
      </div>
    );
  }
}

export default Library;
